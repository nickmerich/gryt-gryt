-- Create beta_users table
CREATE TABLE IF NOT EXISTS beta_users (
  id SERIAL PRIMARY KEY,
  invite_code VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(id),
  invited_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  registered_at TIMESTAMP,
  last_active_at TIMESTAMP
);

-- Create user_feedback table
CREATE TABLE IF NOT EXISTS user_feedback (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  feedback_type VARCHAR(20) NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_beta_users_invite_code ON beta_users(invite_code);
CREATE INDEX IF NOT EXISTS idx_beta_users_user_id ON beta_users(user_id);
CREATE INDEX IF NOT EXISTS idx_user_feedback_user_id ON user_feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_user_feedback_created_at ON user_feedback(created_at);

-- Insert sample beta users (for development only)
INSERT INTO beta_users (invite_code, email, name, invited_at)
VALUES 
  ('BETA001', 'friend1@example.com', 'Alex Johnson', CURRENT_TIMESTAMP),
  ('BETA002', 'friend2@example.com', 'Jamie Smith', CURRENT_TIMESTAMP),
  ('BETA003', 'friend3@example.com', 'Taylor Brown', CURRENT_TIMESTAMP)
ON CONFLICT (invite_code) DO NOTHING;
