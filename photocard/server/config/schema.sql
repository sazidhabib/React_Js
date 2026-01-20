CREATE TABLE IF NOT EXISTS ph_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ph_frames (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
    category VARCHAR(100),
    description TEXT,
    is_popular BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ph_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    site_title VARCHAR(255) DEFAULT 'Photo Card BD',
    support_email VARCHAR(255) DEFAULT 'contact@photocardbd.com',
    helpline_number VARCHAR(50) DEFAULT '01880578893',
    footer_text VARCHAR(255) DEFAULT '© 2026 Photo Card BD. All rights reserved.',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Initial Settings
INSERT INTO ph_settings (id, site_title) VALUES (1, 'Photo Card BD') ON DUPLICATE KEY UPDATE site_title = site_title;
