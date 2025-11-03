# Render Deployment Guide for Magna Coders Backend

This guide will help you deploy the Magna Coders backend to Render.com.

## Prerequisites

1. A Render account (sign up at [render.com](https://render.com))
2. Your code pushed to a GitHub repository
3. Environment variables ready (see `.env.example`)

## Deployment Options

### Option 1: Using render.yaml (Recommended)

1. **Push your code to GitHub** with the `render.yaml` file in the root directory
2. **Connect to Render:**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file

3. **Configure Environment Variables:**
   - In the Render dashboard, go to your service
   - Navigate to "Environment" tab
   - Add all required environment variables from `.env.example`

### Option 2: Manual Web Service Creation

1. **Create a new Web Service:**
   - Go to Render Dashboard
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` folder as the root directory

2. **Configure Build & Deploy Settings:**
   ```
   Name: magna-coders-backend
   Environment: Node
   Region: Oregon (or your preferred region)
   Branch: main (or your main branch)
   Root Directory: backend
   Build Command: npm install && npm run build && npx prisma generate
   Start Command: npx prisma migrate deploy && npm start
   ```

3. **Set Environment Variables:**
   Add these environment variables in the Render dashboard:

   ```
   NODE_ENV=production
   PORT=10000
   DATABASE_URL=<your-postgresql-connection-string>
   JWT_SECRET=<your-jwt-secret>
   FRONTEND_URL=<your-frontend-url>
   
   # Optional services (configure as needed)
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   STRIPE_SECRET_KEY=<your-stripe-secret-key>
   STRIPE_WEBHOOK_SECRET=<your-stripe-webhook-secret>
   PAYPAL_CLIENT_ID=<your-paypal-client-id>
   PAYPAL_CLIENT_SECRET=<your-paypal-client-secret>
   TWILIO_ACCOUNT_SID=<your-twilio-account-sid>
   TWILIO_AUTH_TOKEN=<your-twilio-auth-token>
   TWILIO_PHONE_NUMBER=<your-twilio-phone-number>
   EMAIL_HOST=<your-email-host>
   EMAIL_PORT=<your-email-port>
   EMAIL_USER=<your-email-user>
   EMAIL_PASS=<your-email-password>
   ```

## Database Setup

### Option 1: Render PostgreSQL (Recommended for Free Tier)

1. **Create a PostgreSQL Database:**
   - In Render Dashboard, click "New" → "PostgreSQL"
   - Choose a name: `magna-coders-db`
   - Select the free plan
   - Note the connection details

2. **Get Database URL:**
   - Go to your database in Render Dashboard
   - Copy the "External Database URL"
   - Use this as your `DATABASE_URL` environment variable

### Option 2: External Database

You can also use external database providers like:
- Supabase (PostgreSQL)
- PlanetScale (MySQL)
- Railway (PostgreSQL)
- Neon (PostgreSQL)

## Important Notes

### Free Tier Limitations
- Services spin down after 15 minutes of inactivity
- 750 hours per month (enough for one service)
- Database limited to 1GB storage
- No custom domains on free tier

### Production Considerations
1. **Database Migrations:** Prisma migrations run automatically on deployment
2. **Health Checks:** The `/health` endpoint is configured for monitoring
3. **CORS:** Make sure to update `FRONTEND_URL` to your actual frontend domain
4. **Security:** All sensitive data should be in environment variables

## Deployment Process

1. **Initial Deploy:**
   ```bash
   # Make sure your code is committed and pushed
   git add .
   git commit -m "Add Render deployment configuration"
   git push origin main
   ```

2. **Render will automatically:**
   - Install dependencies
   - Build the TypeScript code
   - Generate Prisma client
   - Run database migrations
   - Start the server

3. **Monitor Deployment:**
   - Check the "Logs" tab in Render Dashboard
   - Verify the service is running at the provided URL
   - Test the API endpoints

## Testing Your Deployment

Once deployed, test these endpoints:

```bash
# Health check
curl https://your-app-name.onrender.com/health

# API documentation
https://your-app-name.onrender.com/api-docs

# Test API endpoints
curl https://your-app-name.onrender.com/api/auth/health
```

## Troubleshooting

### Common Issues:

1. **Build Failures:**
   - Check that all dependencies are in `package.json`
   - Verify TypeScript compilation works locally
   - Check build logs in Render Dashboard

2. **Database Connection Issues:**
   - Verify `DATABASE_URL` is correct
   - Check database is running and accessible
   - Ensure Prisma schema matches database

3. **Environment Variables:**
   - Double-check all required variables are set
   - Verify no typos in variable names
   - Check sensitive values are properly escaped

4. **Service Won't Start:**
   - Check the start command is correct
   - Verify the built files exist in `dist/` directory
   - Check application logs for errors

## Updating Your Deployment

To update your deployment:

1. Push changes to your GitHub repository
2. Render will automatically redeploy
3. Monitor the deployment in the Render Dashboard

## Custom Domain (Paid Plans)

If you upgrade to a paid plan, you can add a custom domain:

1. Go to your service in Render Dashboard
2. Navigate to "Settings" → "Custom Domains"
3. Add your domain and configure DNS records

## Support

- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)

---

Your Magna Coders backend should now be successfully deployed on Render! 🚀