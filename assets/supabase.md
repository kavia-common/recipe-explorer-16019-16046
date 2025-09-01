# Supabase Configuration for Recipe Explorer

## Required Tables

### users
- id (uuid, primary key)
- email (text, unique)
- full_name (text)
- avatar_url (text)
- created_at (timestamp)

### recipes
- id (uuid, primary key)
- title (text)
- description (text)
- image_url (text)
- creator_id (uuid, foreign key to users.id)
- category (text)
- cook_time (text)
- difficulty (text)
- servings (integer)
- calories (integer)
- rating (decimal)
- created_at (timestamp)
- updated_at (timestamp)

### recipe_details
- id (uuid, primary key)
- recipe_id (uuid, foreign key to recipes.id)
- ingredients (jsonb)
- instructions (jsonb)
- created_at (timestamp)
- updated_at (timestamp)

### bookmarks
- id (uuid, primary key)
- user_id (uuid, foreign key to users.id)
- recipe_id (uuid, foreign key to recipes.id)
- created_at (timestamp)

## Required Row Level Security (RLS) Policies

### Users Table
```sql
-- Enable read access for authenticated users
CREATE POLICY "Users can view their own profile"
ON users FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Enable update for authenticated users
CREATE POLICY "Users can update their own profile"
ON users FOR UPDATE
TO authenticated
USING (auth.uid() = id);
```

### Recipes Table
```sql
-- Enable read access for all users
CREATE POLICY "Anyone can view recipes"
ON recipes FOR SELECT
TO anon, authenticated
USING (true);

-- Enable create for authenticated users
CREATE POLICY "Authenticated users can create recipes"
ON recipes FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = creator_id);

-- Enable update for recipe creators
CREATE POLICY "Users can update their own recipes"
ON recipes FOR UPDATE
TO authenticated
USING (auth.uid() = creator_id);
```

### Recipe Details Table
```sql
-- Enable read access for all users
CREATE POLICY "Anyone can view recipe details"
ON recipe_details FOR SELECT
TO anon, authenticated
USING (true);

-- Enable create/update for recipe creators
CREATE POLICY "Recipe creators can manage recipe details"
ON recipe_details FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM recipes 
    WHERE recipes.id = recipe_details.recipe_id 
    AND recipes.creator_id = auth.uid()
  )
);
```

### Bookmarks Table
```sql
-- Enable read access for authenticated users
CREATE POLICY "Users can view their own bookmarks"
ON bookmarks FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Enable create/delete for authenticated users
CREATE POLICY "Users can manage their own bookmarks"
ON bookmarks FOR ALL
TO authenticated
USING (auth.uid() = user_id);
```

## Required Environment Variables

The following environment variables must be set in the frontend application's .env file:

```
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_SITE_URL=your_site_url
```

## Authentication Configuration

1. Enable Email Authentication in Supabase Authentication settings
2. Configure email templates for:
   - Confirmation email
   - Magic link email
   - Reset password email
3. Set up email provider (SMTP or custom)
4. Configure site URL in Authentication settings to match REACT_APP_SITE_URL

## Storage Configuration

1. Create a public bucket named 'recipe-images' for storing recipe images
2. Configure the following storage policy:
```sql
CREATE POLICY "Anyone can view recipe images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'recipe-images');

CREATE POLICY "Authenticated users can upload recipe images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'recipe-images');

CREATE POLICY "Users can update their own recipe images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'recipe-images' AND owner = auth.uid());
```

## API Configuration

1. Enable Row Level Security (RLS) on all tables
2. Configure CORS in Project Settings to allow requests from your frontend domain
3. Set up database functions for:
   - Search recipes (using text search)
   - Filter recipes by category, rating, and time
   - Get user's bookmarked recipes
   - Get user's created recipes
