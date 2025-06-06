-- Create goal streaks table
CREATE TABLE IF NOT EXISTS goal_streaks (
    id SERIAL PRIMARY KEY,
    goal_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_achieved_date TIMESTAMP,
    streak_start_date TIMESTAMP,
    total_achievements INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(goal_id, user_id)
);

-- Create goal achievements table for tracking daily achievements
CREATE TABLE IF NOT EXISTS goal_achievements (
    id SERIAL PRIMARY KEY,
    goal_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    achievement_date DATE NOT NULL,
    value_achieved DECIMAL(10,2),
    target_value DECIMAL(10,2),
    percentage DECIMAL(5,2),
    gp_earned INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(goal_id, user_id, achievement_date)
);

-- Create streak milestones table
CREATE TABLE IF NOT EXISTS streak_milestones (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    goal_id VARCHAR(255) NOT NULL,
    milestone_days INTEGER NOT NULL,
    milestone_title VARCHAR(255) NOT NULL,
    achieved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    gp_reward INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_goal_streaks_user_goal ON goal_streaks(user_id, goal_id);
CREATE INDEX IF NOT EXISTS idx_goal_achievements_user_goal_date ON goal_achievements(user_id, goal_id, achievement_date);
CREATE INDEX IF NOT EXISTS idx_streak_milestones_user_goal ON streak_milestones(user_id, goal_id);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_goal_streaks_updated_at 
    BEFORE UPDATE ON goal_streaks 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
