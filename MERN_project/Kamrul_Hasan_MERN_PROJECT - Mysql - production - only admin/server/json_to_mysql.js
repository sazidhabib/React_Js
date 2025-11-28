const mysql = require('mysql2');
const fs = require('fs');

const connection = mysql.createConnection({
    host: '192.168.163.99',
    user: 'sazid',
    password: 'sazid@123',
    database: 'saziddb',
    port: 3306
});

// Read and parse JSON file
const data = fs.readFileSync('blogs.json', 'utf8')
    .split('\n')
    .filter(line => line.trim())
    .map(line => {
        try {
            return JSON.parse(line);
        } catch (e) {
            console.log('Skipping invalid JSON line:', line);
            return null;
        }
    })
    .filter(item => item !== null);

// Start the replacement process
connection.beginTransaction(err => {
    if (err) {
        console.error('Transaction error:', err);
        connection.end();
        return;
    }

    console.log('Starting data replacement...');

    // STEP 1: Clear all existing title and description data
    connection.execute(
        'UPDATE blogpost SET title = "", description = ""',
        (error, results) => {
            if (error) {
                console.error('Error clearing existing data:', error);
                connection.rollback(() => {
                    connection.end();
                });
                return;
            }

            console.log(`Cleared title/description from ${results.affectedRows} existing records`);

            // STEP 2: Insert new data from JSON
            let insertedCount = 0;
            let errorCount = 0;

            // Process each JSON item
            data.forEach((item, index) => {
                const title = item.title || '';
                const description = item.description || '';

                if (title || description) {
                    connection.execute(
                        'INSERT INTO blogs (title, description) VALUES (?, ?)',
                        [title, description],
                        (error) => {
                            if (error) {
                                console.error(`Error inserting record ${index}:`, error);
                                errorCount++;
                            } else {
                                insertedCount++;
                            }

                            // Check if all operations are complete
                            if (index === data.length - 1) {
                                // Finalize transaction
                                connection.commit(err => {
                                    if (err) {
                                        console.error('Commit error:', err);
                                        connection.rollback(() => {
                                            connection.end();
                                        });
                                    } else {
                                        console.log(`✅ Data replacement completed!`);
                                        console.log(`📊 Successfully inserted: ${insertedCount} records`);
                                        console.log(`❌ Errors: ${errorCount} records`);
                                        connection.end();
                                    }
                                });
                            }
                        }
                    );
                }
            });

            // If no data to process
            if (data.length === 0) {
                connection.commit(err => {
                    if (err) {
                        console.error('Commit error:', err);
                        connection.rollback(() => {
                            connection.end();
                        });
                    } else {
                        console.log('No data found in JSON file to insert');
                        connection.end();
                    }
                });
            }
        }
    );
});