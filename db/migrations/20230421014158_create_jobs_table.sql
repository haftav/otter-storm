-- migrate:up
CREATE TYPE job_type AS ENUM ('in_person', 'hybrid', 'remote');

CREATE TABLE IF NOT EXISTS job (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    company VARCHAR(200) NOT NULL,
    location VARCHAR(200) NOT NULL,
    type job_type NOT NULL,
    description VARCHAR(1000) NOT NULL
)

-- migrate:down
DROP TABLE job;
DROP TYPE job_type;
