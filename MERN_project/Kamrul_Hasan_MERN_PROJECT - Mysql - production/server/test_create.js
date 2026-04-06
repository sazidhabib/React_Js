const Section = require("./models/sections");
const sequelize = require("./db/database");

async function testCreate() {
    try {
        await sequelize.authenticate();
        console.log("Creating test section...");
        const newSection = await Section.create({
            _id: "manual_" + Date.now(),
            type: "about",
            title: "Manual Test",
            description: "This is a manual test section",
            isVisible: true
        });
        console.log("Created successfully:", newSection._id);

        const all = await Section.findAll();
        console.log("Total entries now:", all.length);
        
        process.exit(0);
    } catch (err) {
        console.error("FAILED manual create:", err);
        process.exit(1);
    }
}

testCreate();
