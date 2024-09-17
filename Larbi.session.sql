
DROP TABLE IF EXISTS latest_news, announcements, next_week_service, church_activities, event_table, leaders_profiles, news, gallery CASCADE;

CREATE TABLE latest_news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE announcements (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255), 
    title VARCHAR(255),
    description TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE next_week_service (
    id SERIAL PRIMARY KEY,
    occasion_title VARCHAR(255),
    theme_title VARCHAR(255),
    preacher_title VARCHAR(255),
    bible_reading_1 VARCHAR(255),
    bible_reading_2 VARCHAR(255),
    bible_reading_3 VARCHAR(255),
    suggested_hymn_title VARCHAR(255),
    hymn_numbers VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE church_activities (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    day_of_week VARCHAR(50),
    time TIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE event_table (
    id SERIAL PRIMARY KEY,
    date DATE,
    activity VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE leaders_profiles (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50), 
    title VARCHAR(255),
    description TEXT,
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

CREATE TABLE gallery (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
