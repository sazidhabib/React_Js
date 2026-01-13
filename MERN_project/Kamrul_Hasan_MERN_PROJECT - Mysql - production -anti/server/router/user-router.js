const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");

// Admin middleware (you'll need to create this)
const authMiddleware = require('../middlewares/auth-middleware');


// Apply auth middleware to all routes
router.use(authMiddleware);


// User management routes
router.get("/", userController.getAllUsers);
router.get("/stats", userController.getUserStats);
router.patch("/:id/reset-password", userController.resetUserPassword);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;