-- Enable PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT auth.uid(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create recipes table
CREATE TABLE IF NOT EXISTS recipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    creator_id UUID REFERENCES users(id),
    category TEXT,
    cook_time TEXT,
    difficulty TEXT,
    servings INTEGER,
    calories INTEGER,
    rating DECIMAL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create recipe_details table
CREATE TABLE IF NOT EXISTS recipe_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    ingredients JSONB,
    instructions JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create bookmarks table
CREATE TABLE IF NOT EXISTS bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(user_id, recipe_id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Users Table Policies
CREATE POLICY "Users can view their own profile" 
ON users FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON users FOR UPDATE 
TO authenticated 
USING (auth.uid() = id);

-- Recipes Table Policies
CREATE POLICY "Anyone can view recipes" 
ON recipes FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Authenticated users can create recipes" 
ON recipes FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update their own recipes" 
ON recipes FOR UPDATE 
TO authenticated 
USING (auth.uid() = creator_id);

-- Recipe Details Table Policies
CREATE POLICY "Anyone can view recipe details" 
ON recipe_details FOR SELECT 
TO anon, authenticated 
USING (true);

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

-- Bookmarks Table Policies
CREATE POLICY "Users can view their own bookmarks" 
ON bookmarks FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own bookmarks" 
ON bookmarks FOR ALL 
TO authenticated 
USING (auth.uid() = user_id);

-- Storage bucket for recipe images
INSERT INTO storage.buckets (id, name) 
VALUES ('recipe-images', 'recipe-images') 
ON CONFLICT DO NOTHING;

-- Storage policies
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
