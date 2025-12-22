CREATE TABLE IF NOT EXISTS users (
    id          BIGSERIAL PRIMARY KEY,
    email       VARCHAR(150) NOT NULL UNIQUE,
    display_name VARCHAR(80) NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS games (
    id          BIGSERIAL PRIMARY KEY,
    title       VARCHAR(120) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS questions (
    id          BIGSERIAL PRIMARY KEY,
    game_id     BIGINT REFERENCES games(id) ON DELETE CASCADE,
    content     TEXT NOT NULL,
    answer      TEXT,
    difficulty  VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS play_records (
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT REFERENCES users(id) ON DELETE CASCADE,
    game_id     BIGINT REFERENCES games(id) ON DELETE CASCADE,
    score       INTEGER NOT NULL,
    played_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS resources (
    id          BIGSERIAL PRIMARY KEY,
    title       VARCHAR(150) NOT NULL,
    url         TEXT NOT NULL,
    type        VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS roadmaps (
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT REFERENCES users(id) ON DELETE CASCADE,
    title       VARCHAR(150) NOT NULL,
    content     TEXT
);

CREATE TABLE IF NOT EXISTS portfolios (
    id             BIGSERIAL PRIMARY KEY,
    user_id        BIGINT REFERENCES users(id) ON DELETE CASCADE,
    project_title  VARCHAR(150) NOT NULL,
    summary        TEXT,
    link           TEXT
);

CREATE TABLE IF NOT EXISTS scraps (
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT REFERENCES users(id) ON DELETE CASCADE,
    resource_id BIGINT REFERENCES resources(id) ON DELETE CASCADE,
    note        TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

