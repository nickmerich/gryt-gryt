-- Journal entries table
CREATE TABLE IF NOT EXISTS journal_entries (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  entry_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  mood_rating INTEGER CHECK (mood_rating >= 1 AND mood_rating <= 5),
  is_private BOOLEAN DEFAULT false
);

-- Journal tags table
CREATE TABLE IF NOT EXISTS journal_tags (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  color VARCHAR(7) DEFAULT '#22c55e',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, name)
);

-- Journal entry tags junction table
CREATE TABLE IF NOT EXISTS journal_entry_tags (
  id SERIAL PRIMARY KEY,
  entry_id INTEGER REFERENCES journal_entries(id) ON DELETE CASCADE,
  tag_id INTEGER REFERENCES journal_tags(id) ON DELETE CASCADE,
  UNIQUE(entry_id, tag_id)
);

-- Indexes for performance
CREATE INDEX idx_journal_entries_user_id ON journal_entries(user_id);
CREATE INDEX idx_journal_entries_date ON journal_entries(entry_date);
CREATE INDEX idx_journal_tags_user_id ON journal_tags(user_id);
CREATE INDEX idx_journal_entry_tags_entry_id ON journal_entry_tags(entry_id);
