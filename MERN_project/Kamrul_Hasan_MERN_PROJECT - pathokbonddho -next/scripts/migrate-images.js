const ImageService = require('../services/imageService');
const Article = require('../models/article-model');
const Blog = require('../models/blog-model');
const Photo = require('../models/photo');
const ImageRegistry = require('../models/imageRegistry');
const path = require('path');

async function migrateExistingImages() {
    console.log('🔄 Starting image migration...');

    try {
        // 1. Scan uploads directory
        await ImageService.scanAndRegisterExistingImages();

        // 2. Register article images
        console.log('📰 Registering article images...');
        const articles = await Article.findAll();
        let articleCount = 0;
        for (const article of articles) {
            if (article.image) {
                const filename = path.basename(article.image);
                await ImageService.registerImage(
                    filename,
                    article.image,
                    'article',
                    article.id
                );
                articleCount++;
            }
        }
        console.log(`✅ Registered ${articleCount} article images`);

        // 3. Register blog images
        console.log('📝 Registering blog images...');
        const blogs = await Blog.findAll();
        let blogCount = 0;
        for (const blog of blogs) {
            if (blog.image) {
                const filename = path.basename(blog.image);
                await ImageService.registerImage(
                    filename,
                    blog.image,
                    'blog',
                    blog.id
                );
                blogCount++;
            }
        }
        console.log(`✅ Registered ${blogCount} blog images`);

        // 4. Register existing photo gallery images
        console.log('🖼️ Registering photo gallery images...');
        const photos = await Photo.findAll();
        let photoCount = 0;
        for (const photo of photos) {
            if (photo.imageUrl) {
                const filename = path.basename(photo.imageUrl);
                const existing = await ImageRegistry.findOne({
                    where: {
                        sourceType: 'photo',
                        sourceId: photo.id
                    }
                });

                if (!existing) {
                    await ImageService.registerImage(
                        filename,
                        photo.imageUrl,
                        'photo',
                        photo.id
                    );
                    photoCount++;
                }
            }
        }
        console.log(`✅ Registered ${photoCount} photo gallery images`);

        // 5. Show summary
        const totalImages = await ImageRegistry.count();
        console.log('🎉 Migration completed successfully!');
        console.log(`📊 Total images in registry: ${totalImages}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

// Run the migration
migrateExistingImages();