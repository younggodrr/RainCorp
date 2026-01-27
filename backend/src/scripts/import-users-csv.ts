import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import csvParser from 'csv-parser';

const prisma = new PrismaClient();

interface UserRow {
  id: string;
  email: string;
  raw_user_meta_data: string;
  created_at: string;
}

async function importUsersFromCsv() {
  const users: UserRow[] = [];
  const csvPath = path.join(__dirname, '../../../users_rows.csv');

  if (!fs.existsSync(csvPath)) {
    console.error(`File not found: ${csvPath}`);
    return;
  }

  console.log(`Reading CSV file from: ${csvPath}`);

  fs.createReadStream(csvPath)
    .pipe(csvParser())
    .on('data', (data) => users.push(data))
    .on('end', async () => {
      console.log(`Found ${users.length} users to import.`);

      for (const row of users) {
        const email = row.email;
        let username = '';

        // Try to extract username from Supabase metadata, fallback to email part
        if (row.raw_user_meta_data) {
          try {
            const meta = JSON.parse(row.raw_user_meta_data);
            username = meta.username || email.split('@')[0] || 'user';
          } catch (e) {
            username = email.split('@')[0] || 'user';
          }
        } else {
          username = email.split('@')[0] || 'user';
        }

        console.log(`Processing: ${email} (${username})`);

        try {
          // Upsert user into PostgreSQL
          // The roles table handles roles separately in this schema (user_roles table)
          // We'll create the user first, then you might need to assign roles in a separate step or relation
          await prisma.users.upsert({
            where: { email },
            update: {}, // Do nothing if exists
            create: {
              email,
              username: username || email.split('@')[0] || 'user', // Ensure username is a string
              created_at: row.created_at ? new Date(row.created_at) : undefined,
              availability: 'available',
            },
          });
          console.log(`✓ Imported ${email}`);
        } catch (error) {
          console.error(`✗ Failed to import ${email}:`, error);
        }
      }

      console.log('Import completed successfully.');
      await prisma.$disconnect();
    });
}

importUsersFromCsv();
