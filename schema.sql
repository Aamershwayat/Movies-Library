DROP TABLE IF EXISTS favariteMovie ;
CREATE TABLE IF NOT EXISTS favariteMovie (
id SERIAL PRIMARY KEY,
title VARCHAR(255),
release_date VARCHAR(255),
poster_path  VARCHAR(255),
overview VARCHAR(255),
comments VARCHAR(255)
)