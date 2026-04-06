const Section = require("./models/sections");
const sequelize = require("./db/database");

async function testToggle() {
    try {
        await sequelize.authenticate();
        const section = await Section.findOne();
        if (!section) {
            console.log("No sections to toggle.");
            process.exit(0);
        }
        
        console.log("Current isVisible:", section.isVisible);
        const oldVal = section.isVisible;
        
        await section.update({ isVisible: !oldVal });
        
        const updated = await Section.findByPk(section._id);
        console.log("New isVisible:", updated.isVisible);
        
        if (oldVal !== updated.isVisible) {
            console.log("TOGGLE_SUCCESS");
        } else {
            console.log("TOGGLE_FAILED");
        }
        
        process.exit(0);
    } catch (err) {
        console.error("ERROR during toggle test:", err);
        process.exit(1);
    }
}

testToggle();
