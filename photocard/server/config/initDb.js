const fs = require('fs');
const path = require('path');
const pool = require('./db');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM ph_users WHERE role = "admin"');
        if (rows.length === 0) {
            console.log('No admin found. Creating default admin...');

            const hashedPassword = await bcrypt.hash('admin123', 10);

            await pool.query(
                'INSERT INTO ph_users (username, email, password, role) VALUES (?, ?, ?, ?)',
                ['Admin', 'admin@photocard.com', hashedPassword, 'admin']
            );

            console.log('Default admin created successfully.');
            console.log('Email: admin@photocard.com');
            console.log('Password: admin123');
        } else {
            console.log('Admin already exists.');
        }
    } catch (error) {
        console.error('Error seeding admin:', error);
    }
};

const initDb = async () => {
    try {
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        // Split queries by semicolon and filter empty lines
        const queries = schema
            .split(';')
            .filter(query => query.trim().length > 0);

        console.log('Initializing database...');


        // Pre-Migration: Fix ph_settings column name BEFORE running schema
        try {
            const [settingsCols] = await pool.query("SHOW COLUMNS FROM ph_settings LIKE 'site_title'");
            if (settingsCols.length > 0) {
                console.log('Migrating: Renaming site_title to site_name in ph_settings...');
                await pool.query("ALTER TABLE ph_settings CHANGE site_title site_name VARCHAR(255) DEFAULT 'Photo Card BD'");
            }

            // Rename contact_email to support_email
            const [emailCols] = await pool.query("SHOW COLUMNS FROM ph_settings LIKE 'contact_email'");
            if (emailCols.length > 0) {
                console.log('Migrating: Renaming contact_email to support_email in ph_settings...');
                await pool.query("ALTER TABLE ph_settings CHANGE contact_email support_email VARCHAR(255)");
            }
        } catch (e) {
            // Table doesn't exist yet, which is fine
        }

        for (const query of queries) {
            await pool.query(query);
        }

        console.log('Database initialized successfully.');

        // Simple Migration to add columns if they don't exist (since CREATE TABLE IF NOT EXISTS won't do it)
        try {
            // Check specific ph_settings columns
            const checkAndAddColumn = async (table, column, definition) => {
                const [cols] = await pool.query(`SHOW COLUMNS FROM ${table} LIKE '${column}'`);
                if (cols.length === 0) {
                    console.log(`Migrating: Adding ${column} column to ${table}...`);
                    await pool.query(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
                }
            };

            await checkAndAddColumn('ph_settings', 'site_description', 'TEXT');
            await checkAndAddColumn('ph_settings', 'facebook_url', 'TEXT');
            await checkAndAddColumn('ph_settings', 'youtube_url', 'TEXT');
            await checkAndAddColumn('ph_settings', 'website_url', 'TEXT');
            await checkAndAddColumn('ph_settings', 'address_text', 'TEXT');
            await checkAndAddColumn('ph_settings', 'support_email', 'VARCHAR(255)');
            await checkAndAddColumn('ph_settings', 'logo_url', 'TEXT');
            await checkAndAddColumn('ph_settings', 'favicon_url', 'TEXT');
            await checkAndAddColumn('ph_settings', 'helpline_number', "VARCHAR(50) DEFAULT '01880578893'");
            await checkAndAddColumn('ph_settings', 'footer_text', "VARCHAR(255) DEFAULT '© 2026 Photo Card BD. All rights reserved.'");
            await pool.query(`
                CREATE TABLE IF NOT EXISTS ph_categories (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL UNIQUE,
                    slug VARCHAR(255) NOT NULL UNIQUE,
                    description TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // Check if 'status' column exists in ph_frames and has correct ENUM
            const [columns] = await pool.query("SHOW COLUMNS FROM ph_frames LIKE 'status'");
            if (columns.length === 0) {
                console.log('Migrating: Adding status column to ph_frames...');
                await pool.query("ALTER TABLE ph_frames ADD COLUMN status ENUM('active', 'pending', 'inactive', 'rejected', 'trash') DEFAULT 'pending'");
            } else {
                // Check if ENUM needs updating (simplified check, just run ALTER to be safe if you want to expand it)
                // Note: Modifying ENUM can be tricky. This command blindly updates it to include new values.
                // Assuming 'active' and 'inactive' were old values. New default is 'pending'.
                try {
                    await pool.query("ALTER TABLE ph_frames MODIFY COLUMN status ENUM('active', 'pending', 'inactive', 'rejected', 'trash') DEFAULT 'pending'");
                    console.log('Migrating: Updated status column ENUM values to include pending, rejected, trash');
                } catch (e) {
                    console.log('Status column update skipped or failed (might already match): ' + e.message);
                }
            }

            // Check if 'category_id' column exists in ph_frames
            const [catCols] = await pool.query("SHOW COLUMNS FROM ph_frames LIKE 'category_id'");
            if (catCols.length === 0) {
                console.log('Migrating: Adding category_id column to ph_frames...');
                await pool.query("ALTER TABLE ph_frames ADD COLUMN category_id INT");
                // Optional: Add FK constraint if consistent
                // await pool.query("ALTER TABLE ph_frames ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES ph_categories(id) ON DELETE SET NULL");
            }

            // Check if 'user_id' column exists in ph_frames
            const [userCols] = await pool.query("SHOW COLUMNS FROM ph_frames LIKE 'user_id'");
            if (userCols.length === 0) {
                console.log('Migrating: Adding user_id column to ph_frames...');
                await pool.query("ALTER TABLE ph_frames ADD COLUMN user_id INT");
            }

            // Check if 'view_count' column exists in ph_frames
            const [viewCols] = await pool.query("SHOW COLUMNS FROM ph_frames LIKE 'view_count'");
            if (viewCols.length === 0) {
                console.log('Migrating: Adding view_count column to ph_frames...');
                await pool.query("ALTER TABLE ph_frames ADD COLUMN view_count INT DEFAULT 0");
            }

            // Check if 'use_count' column exists in ph_frames
            const [useCols] = await pool.query("SHOW COLUMNS FROM ph_frames LIKE 'use_count'");
            if (useCols.length === 0) {
                console.log('Migrating: Adding use_count column to ph_frames...');
                await pool.query("ALTER TABLE ph_frames ADD COLUMN use_count INT DEFAULT 0");
            }

            // Check if 'phone_number' column exists in ph_users
            const [phoneCols] = await pool.query("SHOW COLUMNS FROM ph_users LIKE 'phone_number'");
            if (phoneCols.length === 0) {
                console.log('Migrating: Adding phone_number column to ph_users...');
                await pool.query("ALTER TABLE ph_users ADD COLUMN phone_number VARCHAR(20)");
            }

        } catch (migError) {
            console.error('Migration error:', migError);
        }

        // Seed Admin
        await seedAdmin();

    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

module.exports = initDb;
