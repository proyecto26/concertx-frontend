# Supabase SQL Editor

```sql
-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum for user roles (user/admin)
DROP TYPE IF EXISTS user_role;
CREATE TYPE user_role AS ENUM ('user', 'admin');

-- Users table with integrated Solana wallet
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT UNIQUE NOT NULL CHECK (char_length(username) >= 3),
    email TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    solana_wallet_address TEXT UNIQUE NOT NULL,  -- Required Solana wallet per user
    role user_role NOT NULL DEFAULT 'user',
    is_verified BOOLEAN DEFAULT false,  -- For verified profiles (like Twitter blue check)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT username_format CHECK (username ~ '^[a-zA-Z0-9_]+$'),
    CONSTRAINT valid_wallet_address CHECK (char_length(solana_wallet_address) > 0)
);

-- Followers table
CREATE TABLE followers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    following_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(follower_id, following_id),
    CONSTRAINT no_self_follow CHECK (follower_id != following_id)
);

-- User settings table
CREATE TABLE user_settings (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    email_notifications BOOLEAN DEFAULT true,
    marketing_emails BOOLEAN DEFAULT true,
    theme TEXT DEFAULT 'system',  -- system, light, dark
    language TEXT DEFAULT 'en',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_wallet ON users(solana_wallet_address);
CREATE INDEX idx_followers_follower_id ON followers(follower_id);
CREATE INDEX idx_followers_following_id ON followers(following_id);

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'UPDATE' THEN
        NEW.updated_at = CURRENT_TIMESTAMP;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at
    BEFORE UPDATE ON user_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create view for user stats
CREATE OR REPLACE VIEW user_stats AS
SELECT 
    u.id,
    u.username,
    u.display_name,
    u.avatar_url,
    u.is_verified,
    COUNT(DISTINCT f1.follower_id) as followers_count,
    COUNT(DISTINCT f2.following_id) as following_count
FROM users u
LEFT JOIN followers f1 ON u.id = f1.following_id
LEFT JOIN followers f2 ON u.id = f2.follower_id
GROUP BY u.id, u.username, u.display_name, u.avatar_url, u.is_verified;

-- Disable RLS temporarily for development
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE followers DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings DISABLE ROW LEVEL SECURITY;

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Create user settings with defaults
    INSERT INTO user_settings (user_id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to setup new user
CREATE TRIGGER on_user_created
    AFTER INSERT ON users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();
```