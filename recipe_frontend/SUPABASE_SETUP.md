# Supabase Setup Instructions for Recipe Explorer

## Prerequisites
1. A Supabase account
2. Access to Supabase project dashboard

## Configuration Steps

### 1. Environment Variables
Create a `.env` file in the project root and add:
```
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_SITE_URL=http://localhost:3000
```

### 2. Database Setup
1. Navigate to the SQL editor in your Supabase dashboard
2. Open `src/config/database-setup.sql`
3. Execute the SQL commands to create:
   - Users table
   - Recipes table
   - Recipe details table
   - Bookmarks table
   - Security policies
   - Storage bucket configuration

### 3. Authentication Configuration
1. In Supabase Dashboard:
   - Go to Authentication > Settings
   - Enable Email provider
   - Configure Site URL: `http://localhost:3000` (development) or your production URL
   - Add redirect URLs:
     * `http://localhost:3000/auth/callback`
     * `https://your-production-domain.com/auth/callback`

2. Email Templates (Authentication > Email Templates):
   - Customize confirmation email template
   - Customize magic link email template
   - Customize password reset email template
   
### 4. Storage Configuration
1. Storage bucket 'recipe-images' will be created automatically via SQL setup
2. Verify in Storage section that policies are correctly applied:
   - Public read access
   - Authenticated users can upload
   - Users can update their own images

### 5. Security and RLS Policies
The SQL setup automatically configures Row Level Security (RLS) policies:
- Users can only access their own profiles
- Anyone can view recipes
- Only authenticated users can create recipes
- Users can only edit their own recipes
- Users can only manage their own bookmarks

### 6. Testing Configuration
1. Create a test user via the authentication UI
2. Verify email confirmation flow
3. Test login/logout functionality
4. Verify storage uploads work correctly
5. Test recipe creation and bookmarking

### Troubleshooting
1. If auth callbacks fail:
   - Verify Site URL configuration
   - Check redirect URLs in auth settings
   - Ensure environment variables are correct
2. If storage uploads fail:
   - Verify storage bucket exists
   - Check RLS policies
   - Ensure user is authenticated

### Production Deployment
1. Update environment variables with production values
2. Add production domain to authorized redirect URLs
3. Update email templates with production URLs
4. Test all flows in production environment

## Support
For issues with:
- Authentication: Check Supabase auth logs
- Database: Review SQL error logs
- Storage: Verify bucket permissions
- General: Check browser console errors
