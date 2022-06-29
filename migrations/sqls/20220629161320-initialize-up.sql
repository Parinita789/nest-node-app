/* Replace with your SQL commands */CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR,
  last_name VARCHAR,
  user_name VARCHAR NOT NULL,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  profile_picture_url VARCHAR,
  is_deleted BOOLEAN DEFAULT FALSE,
  password VARCHAR(100) NOT NULL
);

CREATE INDEX user_name_index
ON users (user_name);

CREATE TABLE languages (
  id SERIAL PRIMARY KEY,
  code VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

CREATE INDEX language_code_index
ON languages (code);

CREATE TABLE lessons (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  lesson_text TEXT,
  language_id INT NOT NULL,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  CONSTRAINT fk_language 
    FOREIGN KEY(language_id) 
      REFERENCES languages(id) 
      ON DELETE SET NULL
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  lesson_ids  integer[],
  active_lesson INT,
  owner_user_id INT NOT NULL,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  CONSTRAINT fk_user 
    FOREIGN KEY(owner_user_id) 
      REFERENCES users(id) 
      ON DELETE SET NULL 
);