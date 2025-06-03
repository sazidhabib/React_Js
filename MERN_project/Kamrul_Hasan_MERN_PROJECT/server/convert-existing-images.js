// convert-existing-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './uploads';
const files = fs.readdirSync(inputDir);

files.forEach(async (file) => {
    const ext = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const filePath = path.join(inputDir, file);
        const outputFilePath = filePath.replace(ext, '.webp');
        await sharp(filePath)
            .webp({ quality: 80 })
            .toFile(outputFilePath);
        console.log(`Converted ${file} → ${path.basename(outputFilePath)}`);
    }
});
