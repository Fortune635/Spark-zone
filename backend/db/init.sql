-- PostgreSQL Schema for Spark Zone

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    description TEXT,
    gold INTEGER DEFAULT 0
);

-- Worlds Table (One World can have many Stories)
CREATE TABLE worlds (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT
);

-- Characters Table (A Character exists independently but can star in Stories)
CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    personality TEXT,
    backstory TEXT,
    abilities TEXT,
    avatar_url TEXT
);

-- Stories Table (Many-to-One with Worlds)
CREATE TABLE stories (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    plot TEXT,
    genre VARCHAR(100),
    tags TEXT[], -- Array of strings for tags
    world_id INTEGER REFERENCES worlds(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'draft',
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    lore TEXT,
    cover_image_url TEXT
);

-- Chapters Table (Many-to-One with Stories)
CREATE TABLE chapters (
    id SERIAL PRIMARY KEY,
    story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    "order" INTEGER NOT NULL
);

-- Posts Table (For the Social Feed)
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    author_character_id INTEGER REFERENCES characters(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Additional tables like bounties, channels, dms, etc., would follow the same pattern...
# Spark-zone
A immersive role-play app
