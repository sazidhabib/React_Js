const fs = require('fs');
const path = require('path');

const deployDir = 'deploy_to_cpanel';
const foldersToCopy = [
    '.next', 'public', 'uploads', 'models', 'db', 
    'middlewares', 'router', 'controllers', 'utils', 
    'validators', 'services', 'lib', 'config', 'migrations'
];
const filesToCopy = [
    'server.js', 'package.json', 'package-lock.json', '.htaccess'
];

if (!fs.existsSync(deployDir)) {
    fs.mkdirSync(deployDir);
}

function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }
        fs.readdirSync(src).forEach(function(childItemName) {
            // Skip .next/cache
            if (src.endsWith('.next') && childItemName === 'cache') {
                return;
            }
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

console.log('🚀 Starting to collect files for deployment...');

foldersToCopy.forEach(folder => {
    const src = path.join(process.cwd(), folder);
    const dest = path.join(process.cwd(), deployDir, folder);
    if (fs.existsSync(src)) {
        console.log(`📂 Copying folder: ${folder}`);
        try {
            copyRecursiveSync(src, dest);
        } catch (err) {
            console.error(`❌ Error copying folder ${folder}:`, err.message);
        }
    }
});

filesToCopy.forEach(file => {
    const src = path.join(process.cwd(), file);
    const dest = path.join(process.cwd(), deployDir, file);
    if (fs.existsSync(src)) {
        console.log(`📄 Copying file: ${file}`);
        try {
            fs.copyFileSync(src, dest);
        } catch (err) {
            console.error(`❌ Error copying file ${file}:`, err.message);
        }
    }
});

console.log('✅ All files collected successfully.');
