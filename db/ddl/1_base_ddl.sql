CREATE DATABASE IF NOT EXISTS cellar;
USE cellar;

CREATE TABLE IF NOT EXISTS object (
    name VARCHAR(255),
    path VARCHAR(255),
    file BOOLEAN NOT NULL,
    PRIMARY KEY (path, name)
);

CREATE TABLE IF NOT EXISTS content (
    name VARCHAR(255),
    path VARCHAR(255),
    version INT UNSIGNED,
    content TEXT,
    PRIMARY KEY (path, name)
);

-- 'Volumes', '/'
-- 'Macintosh HD', '/Volumes'
-- 'Volumes', '/Volumes/Macintosh HD'
-- 'etc', '/Volumes/Macintosh HD'
-- 'home', '/Volumes/Macintosh HD'
-- 'opt', '/Volumes/Macintosh HD'
-- 'private', '/Volumes/Macintosh HD'
