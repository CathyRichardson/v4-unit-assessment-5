CREATE TABLE helo_users (
id SERIAL PRIMARY KEY,
username VARCHAR(150) NOT NULL,
password VARCHAR(150) NOT NULL,
profile_pic TEXT
);

CREATE TABLE helo_posts (
id SERIAL PRIMARY KEY,
title VARCHAR(45) NOT NULL,
context TEXT,
img TEXT,
author_id INTEGER REFERENCES helo_users(id),
date_created TIMESTAMP
);