const sequelize = require('../db/database');

const tablesToDrop = [
    "article",
    "blog_posts",
    "blogpost",
    "dhaka_prayer_time",
    "ph_categories",
    "ph_frames",
    "ph_settings",
    "ph_users",
    "post_categories",
    "post_tags",
    "posts",
    "ramadan_times",
    "video"
];

async function dropTables() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connection established. Starting table cleanup...');

        for (const table of tablesToDrop) {
            try {
                await sequelize.query(`DROP TABLE IF EXISTS \`${table}\``);
                console.log(`🗑️ Dropped table: ${table}`);
            } catch (err) {
                console.error(`❌ Failed to drop table ${table}:`, err.message);
            }
        }

        console.log('\n--- Final Verification ---');
        const [results] = await sequelize.query("SHOW TABLES");
        const remainingTables = results.map(t => Object.values(t)[0]);
        console.log('Remaining Tables:', JSON.stringify(remainingTables, null, 2));

        await sequelize.close();
        console.log('\n✅ Cleanup complete.');
    } catch (error) {
        console.error('❌ Critical Error:', error.message);
    }
}

dropTables();
