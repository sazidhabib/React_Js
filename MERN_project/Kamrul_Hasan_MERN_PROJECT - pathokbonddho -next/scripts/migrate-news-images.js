const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
});

const News = sequelize.define("News", {
    leadImage: DataTypes.STRING,
    thumbImage: DataTypes.STRING,
    metaImage: DataTypes.STRING,
    content: DataTypes.TEXT('long')
}, { tableName: 'news', timestamps: true });

async function migrateImages() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        const oldDir = path.join(__dirname, 'uploads', 'news');
        const newDir = path.join(__dirname, 'uploads', 'post_image');

        if (!fs.existsSync(newDir)) {
            fs.mkdirSync(newDir, { recursive: true });
        }

        const newsItems = await News.findAll();
        let updatedCount = 0;

        for (const news of newsItems) {
            let needsUpdate = false;

            // Update image fields
            ['leadImage', 'thumbImage', 'metaImage'].forEach(field => {
                if (news[field] && news[field].startsWith('uploads/news/')) {
                    const oldPath = news[field];
                    const newPath = oldPath.replace('uploads/news/', 'uploads/post_image/');
                    
                    // Move file if it exists
                    const oldFilePath = path.join(__dirname, oldPath);
                    const newFilePath = path.join(__dirname, newPath);
                    
                    if (fs.existsSync(oldFilePath)) {
                        fs.renameSync(oldFilePath, newFilePath);
                        console.log(`Moved: ${oldPath} -> ${newPath}`);
                    }

                    news[field] = newPath;
                    needsUpdate = true;
                }
            });

            // Update content (for embedded images)
            if (news.content && news.content.includes('/uploads/news/')) {
                news.content = news.content.replace(/\/uploads\/news\//g, '/uploads/post_image/');
                needsUpdate = true;
                console.log(`Updated content images for news ID ${news.id}`);
            }

            if (needsUpdate) {
                await news.save();
                updatedCount++;
            }
        }

        console.log(`Migration complete. ${updatedCount} news items updated.`);
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrateImages();
