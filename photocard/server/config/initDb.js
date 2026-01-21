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

        for (const query of queries) {
            await pool.query(query);
        }

        console.log('Database initialized successfully.');

        // Seed Admin
        await seedAdmin();

    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

module.exports = initDb;
