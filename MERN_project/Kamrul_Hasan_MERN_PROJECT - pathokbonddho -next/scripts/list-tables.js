const sequelize = require('../db/database');
const fs = require('fs');
const path = require('path');

async function listTables() {
    try {
        await sequelize.authenticate();
        
        // Get all tables from database
        const [results] = await sequelize.query("SHOW TABLES");
        const dbTables = results.map(t => Object.values(t)[0].toLowerCase());

        const definedTables = new Set();
        
        const checkDir = (dirPath) => {
            const fullPath = path.resolve(dirPath);
            if (!fs.existsSync(fullPath)) return;
            const files = fs.readdirSync(fullPath).filter(file => file.endsWith('.js'));
            for (const file of files) {
                const content = fs.readFileSync(path.join(fullPath, file), 'utf8');
                // Regex to find tableName: '...' or tableName: "..."
                const match = content.match(/tableName:\s*['"]([^'"]+)['"]/);
                if (match) {
                    definedTables.add(match[1].toLowerCase());
                }
            }
        };

        checkDir('./models');
        checkDir('./lib/models');

        // System/Required manual tables
        const systemTables = ['sequelizemeta', 'migrations'];
        // Joining tables often defined in associations but let's be safe
        const joiningTables = ['news_categories', 'news_tags'];
        
        const allRequiredTables = new Set([...definedTables, ...systemTables, ...joiningTables]);
        
        const unnecessaryTables = dbTables.filter(t => !allRequiredTables.has(t));
        
        console.log('---ALL_DEFINED_TABLES---');
        console.log(Array.from(definedTables).sort());
        
        console.log('\n---TABLES_TO_DELETE---');
        console.log(JSON.stringify(unnecessaryTables, null, 2));

        await sequelize.close();
    } catch (error) {
        console.error('Error:', error);
    }
}

listTables();
