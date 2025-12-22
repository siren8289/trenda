CREATE TABLE IF NOT EXISTS skill_tags (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(80) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS user_scores (
    id           BIGSERIAL PRIMARY KEY,
    user_id      BIGINT REFERENCES users(id) ON DELETE CASCADE,
    skill_tag_id BIGINT REFERENCES skill_tags(id) ON DELETE CASCADE,
    score        INTEGER NOT NULL DEFAULT 0
);

