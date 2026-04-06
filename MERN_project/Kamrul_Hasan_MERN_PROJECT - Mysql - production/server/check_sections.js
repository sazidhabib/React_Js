const Section = require("./models/sections");
const sequelize = require("./db/database");

async function check() {
    try {
        await sequelize.authenticate();
        const sections = await Section.findAll();
        console.log("SECTIONS_COUNT:", sections.length);
        console.log("SECTIONS_DATA:", JSON.stringify(sections, null, 2));
        process.exit(0);
    } catch (err) {
        console.error("ERROR:", err);
        process.exit(1);
    }
}

check();
