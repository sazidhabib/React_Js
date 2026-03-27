const sequelize = require('../db/database');
const { DataTypes } = require('sequelize');

async function fixUserTable() {
    try {
        console.log("--- Starting Database Fix ---");
        
        // 1. Authenticate connection
        await sequelize.authenticate();
        console.log("✅ Database connection established.");

        const queryInterface = sequelize.getQueryInterface();
        const tableSchema = await queryInterface.describeTable('users');

        // 2. Add 'role' column if it doesn't exist
        if (!tableSchema.role) {
            console.log("🔄 Adding 'role' column to 'users' table...");
            await queryInterface.addColumn('users', 'role', {
                type: DataTypes.ENUM('superadmin', 'admin', 'editor'),
                defaultValue: 'editor',
                after: 'isAdmin'
            });
            console.log("✅ 'role' column added successfully.");
        } else {
            console.log("ℹ️ 'role' column already exists.");
        }

        // 3. Add 'permissions' column if it doesn't exist
        if (!tableSchema.permissions) {
            console.log("🔄 Adding 'permissions' column to 'users' table...");
            await queryInterface.addColumn('users', 'permissions', {
                type: DataTypes.JSON,
                allowNull: true,
                after: 'role'
            });
            console.log("✅ 'permissions' column added successfully.");
        } else {
            console.log("ℹ️ 'permissions' column already exists.");
        }

        // 4. Add 'isActive' column if it doesn't exist
        if (!tableSchema.isActive) {
            console.log("🔄 Adding 'isActive' column to 'users' table...");
            await queryInterface.addColumn('users', 'isActive', {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                after: 'permissions'
            });
            console.log("✅ 'isActive' column added successfully.");
        } else {
            console.log("ℹ️ 'isActive' column already exists.");
        }

        // 5. Update existing users to be superadmins
        console.log("🔄 Updating existing users to superadmin role...");
        await sequelize.query("UPDATE users SET role = 'superadmin', isAdmin = 1 WHERE email = 'sazid@gmail.com'");
        console.log("✅ User 'sazid@gmail.com' promoted to superadmin.");

    } catch (error) {
        console.error("❌ Database fix FAILED:");
        console.error(error);
    } finally {
        await sequelize.close();
        console.log("--- Database Fix Complete ---");
    }
}

fixUserTable();
