# Database Setup Guide - Magna Coders

## ✅ Database Successfully Configured!

Your local PostgreSQL database `magna_coders_db` has been successfully created and configured with the complete Magna Coders schema using **Prisma ORM**.

## Database Details

- **Database Name**: `magna_coders_db`
- **PostgreSQL Version**: 18
- **Schema Management**: Prisma ORM (`backend/prisma/schema.prisma`)
- **Original SQL Schema**: `db/magna.sql` (for reference)
- **Total Tables**: 21
- **Type Safety**: Full TypeScript integration with Prisma Client

## Tables Created

The following tables are now available in your database with **type-safe Prisma models**:

### Core User Management
- `users` - User profiles with availability status and social links
- `user_roles` - Role-based access control
- `user_categories` - User categorization system
- `user_skills` - Skills with proficiency levels (beginner → expert)

### Social Features
- `friend_requests` - Friend request management with status tracking
- `friends` - Bidirectional friend relationships
- `conversations` - Chat conversations (direct/group types)
- `conversation_members` - Conversation participants
- `messages` - Rich text messages with timestamps

### Content & Media
- `posts` - Multi-type posts (text, project, reel, photo, design, opportunity)
- `post_media` - Media attachments with type validation
- `post_tags` - Tag associations for content discovery
- `tags` - Hierarchical tag system
- `comments` - Nested comment system
- `likes` - User engagement tracking
- `reels` - Short-form video content

### Collaboration
- `projects` - Collaborative projects with status tracking
- `project_members` - Team member management
- `opportunities` - Job/collaboration opportunities with status

### System
- `notifications` - Type-safe notification system
- `events` - Platform events and activities

##  Prisma Features

### Type-Safe Enums
- `Availability`: available, busy, unavailable
- `ConversationType`: direct, group
- `PostType`: text, project, reel, photo, design, opportunity
- `Visibility`: public, private
- `ProficiencyLevel`: beginner, intermediate, advanced, expert
- `OpportunityStatus`: open, closed
- `ProjectStatus`: planning, active, completed, cancelled
- `NotificationType`: like, comment, friend_request, message, project_invite

## Connection Details

Update your `backend/.env` file with:

```env
DATABASE_URL="postgresql://postgres:12345678@localhost:5432/magna_coders_db"
```

## Next Steps

1. **Backend Setup with Prisma**:
   ```bash
   cd backend
   npm install
   
   # Generate Prisma Client (type-safe database access)
   npx prisma generate
   
   # Verify database connection
   npx prisma db pull
   
   # Start development server
   npm run dev
   ```

2. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Database Management with Prisma**:
   ```bash
   # View database schema
   npx prisma studio
   
   # Sync schema changes to database
   npx prisma db push
   
   # Reset database (development only)
   npx prisma db push --force-reset
   
   # Generate migration files
   npx prisma migrate dev --name init
   ```

## Extensions Enabled

- `pgcrypto` - For encryption functions
- `uuid-ossp` - For UUID generation (`uuid_generate_v4()`)

## Database Management

### Direct PostgreSQL Access
To connect to your database directly:
```bash
psql -U postgres -d magna_coders_db
```

### Prisma Studio (Recommended)
Launch the visual database browser:
```bash
cd backend
npx prisma studio
```
Access at: http://localhost:5555

### Schema Synchronization
Keep your Prisma schema and database in sync:
```bash
# After schema changes, push to database
npx prisma db push

# Pull database changes to schema
npx prisma db pull
```

Your database is now ready for development with **full type safety**! 🚀

##  Development Workflow

1. **Make schema changes** in `backend/prisma/schema.prisma`
2. **Push changes** to database: `npx prisma db push`
3. **Regenerate client** (if needed): `npx prisma generate`
4. **Use type-safe queries** in your application code

##  Prisma Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [Prisma Studio](https://www.prisma.io/studio)