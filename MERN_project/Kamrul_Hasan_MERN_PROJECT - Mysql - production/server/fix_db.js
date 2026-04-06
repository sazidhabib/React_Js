const Section = require("./models/sections");
const sequelize = require("./db/database");

async function fix() {
    try {
        console.log("Authenticating...");
        await sequelize.authenticate();
        console.log("Force Syncing Section table...");
        await Section.sync({ force: true });
        console.log("Sync complete.");
        
        const test = await Section.create({
            _id: "test_" + Date.now(),
            type: "about",
            title: "Test Section",
            description: "Test description",
            isVisible: true
        });
        console.log("Test creation successful:", test._id);
        
        const sections = await Section.findAll();
        console.log("Sections in DB:", sections.length);
        
        process.exit(0);
    } catch (err) {
        console.error("ERROR during fix:", err);
        process.exit(1);
    }
}

fix();
