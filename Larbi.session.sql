
DROP TABLE IF EXISTS latest_news, upcoming_events, birthdays, weddings, next_week_service, church_activities, event_table, ministers, catechists, news, news_images, u_news_images, gallery, users CASCADE;

CREATE TABLE latest_news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE birthdays (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE weddings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE next_week_service (
    id SERIAL PRIMARY KEY,
    occasion_title VARCHAR(255),
    theme_title VARCHAR(255),
    preacher_title VARCHAR(255), 
    preacher_title2 VARCHAR(255),
    bible_reading_1 VARCHAR(255),
    bible_reading_2 VARCHAR(255),
    bible_reading_3 VARCHAR(255),
    suggested_hymns VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE church_activities (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    time VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE event_table (
    id SERIAL PRIMARY KEY,
    date VARCHAR(255),
    activity VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ministers (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE catechists (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE news_images (
    id SERIAL PRIMARY KEY,
    news_id INTEGER REFERENCES news(id) ON DELETE CASCADE,
    image_url VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE upcoming_events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE u_news_images (
    id SERIAL PRIMARY KEY,
    u_news_id INTEGER REFERENCES upcoming_events(id) ON DELETE CASCADE,
    image_url VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gallery (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    ID SERIAL PRIMARY KEY,
    staff_id TEXT NOT NULL,
    password TEXT NOT NULL,
    email VARCHAR(255)
);

INSERT INTO users (staff_id, password) VALUES ('Presby@200', '1234');

--  INSERT INTO users (staff_id, password) VALUES ('Presby@200', 1234);