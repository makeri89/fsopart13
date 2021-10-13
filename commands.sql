CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES
  ('Test Master', 'https://example.com', 'Blog of Examples'),
  ('Matti Luukkainen', 'https://helsinki.fi', 'FullStackOpen');