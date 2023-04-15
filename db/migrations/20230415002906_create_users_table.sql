-- migrate:up
CREATE TABLE IF NOT EXISTS app_user (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL
);

-- migrate:down
DROP TABLE app_user;
