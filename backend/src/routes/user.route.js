const express = require("express");
const router = express.Router();
const UserController = require("../controllers/User.controller");
const authMiddleware = require("../middlewares/auth"); // You need to create this middleware!

// All routes here require login
router.post("/favorites", authMiddleware, UserController.toggleFavorite);
router.get("/dashboard", authMiddleware, UserController.getDashboardData);

router.patch("/profile", authMiddleware, UserController.updateProfile);
router.post("/checklist", authMiddleware, UserController.manageChecklist);

module.exports = router;