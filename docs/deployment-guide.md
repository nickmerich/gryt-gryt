# Deployment Guide - Private Beta MVP

## Environment Variables Setup

### Required Environment Variables

\`\`\`bash
# Database Configuration
NEON_NEON_DATABASE_URL=postgresql://username:password@host/database
# OR
DATABASE_URL=postgresql://username:password@host/database

# Authentication
JWT_SECRET=your-super-secure-jwt-secret-key-here

# Application
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
\`\`\`

### Vercel Deployment Setup

1. **Connect to Neon Database**
   \`\`\`bash
   # Create Neon project
   npx neon-cli create-project gryt-private-beta
   
   # Get connection string
   npx neon-cli connection-string gryt-private-beta
   \`\`\`

2. **Configure Vercel Environment Variables**
   \`\`\`bash
   # Set environment variables in Vercel dashboard
   vercel env add NEON_DATABASE_URL
   vercel env add JWT_SECRET
   vercel env add NEXT_PUBLIC_APP_URL
   \`\`\`

3. **Deploy Application**
   \`\`\`bash
   # Deploy to production
   vercel --prod
   \`\`\`

## Database Setup

### 1. Run Initial Schema
\`\`\`sql
-- Execute scripts/database-schema.sql in Neon console
-- This creates all necessary tables and indexes
\`\`\`

### 2. Verify Database Connection
\`\`\`bash
# Test health endpoint
curl https://your-domain.com/api/health
\`\`\`

## Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] Database schema deployed
- [ ] Health check endpoint working
- [ ] Authentication flow tested
- [ ] Core habit functionality verified
- [ ] Mobile responsiveness confirmed
- [ ] Error handling implemented
- [ ] Performance optimized

## Monitoring Setup

### Error Tracking
- Vercel Analytics enabled
- Console error logging
- Database error handling

### Performance Monitoring
- Core Web Vitals tracking
- API response time monitoring
- Database query performance

## Security Measures

- [ ] HTTPS enforced
- [ ] Secure cookie settings
- [ ] Input validation
- [ ] SQL injection prevention
- [ ] Rate limiting (future)
- [ ] CORS configuration
