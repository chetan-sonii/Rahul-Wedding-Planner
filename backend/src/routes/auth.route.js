const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/Auth.controller");
const authMiddleware = require("../middlewares/auth");

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.get("/profile", authMiddleware, AuthController.Profile);

// ADD THIS ROUTE
router.post("/forgot-password", AuthController.forgotPassword);
router.put("/reset-password/:token", AuthController.resetPassword);

module.exports = router;