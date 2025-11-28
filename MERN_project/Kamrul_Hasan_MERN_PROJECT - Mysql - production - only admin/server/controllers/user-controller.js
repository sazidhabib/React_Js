const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

// Get all users (Admin only)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] } // Exclude passwords
        });

        res.status(200).json({
            success: true,
            data: users,
            count: users.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching users",
            error: error.message
        });
    }
};

// Reset user password (Admin only)
const resetUserPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;

        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }

        // Find user
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Update password - Sequelize hooks will handle hashing
        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });
    } catch (error) {
        console.error("Password reset error:", error);
        res.status(500).json({
            success: false,
            message: "Error resetting password",
            error: error.message
        });
    }
};

// Get user by ID (Admin only)
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching user",
            error: error.message
        });
    }
};

// Update user (Admin only)
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // Don't allow password updates through this route
        if (updateData.password) {
            delete updateData.password;
        }

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Update user
        await user.update(updateData);

        // Get updated user without password
        const updatedUser = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating user",
            error: error.message
        });
    }
};

// Delete user (Admin only)
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        await user.destroy();

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting user",
            error: error.message
        });
    }
};

// Get user statistics (Admin only)
const getUserStats = async (req, res) => {
    try {
        const totalUsers = await User.count();
        const adminUsers = await User.count({ where: { isAdmin: true } });
        const regularUsers = await User.count({ where: { isAdmin: false } });

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                adminUsers,
                regularUsers
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching user statistics",
            error: error.message
        });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserStats,
    resetUserPassword
};