CREATE INDEX IF NOT EXISTS idx_play_records_user_id ON play_records(user_id);
CREATE INDEX IF NOT EXISTS idx_play_records_game_id ON play_records(game_id);
CREATE INDEX IF NOT EXISTS idx_roadmaps_user_id ON roadmaps(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolios_user_id ON portfolios(user_id);
CREATE INDEX IF NOT EXISTS idx_scraps_user_id ON scraps(user_id);
CREATE INDEX IF NOT EXISTS idx_user_scores_user_id ON user_scores(user_id);

