// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const upload = require("../middlewares/multer.middleware"); 
const asyncHandler = require("../utils/asyncHandler");

// Registration & Login
router.post("/register", asyncHandler(userController.register));
router.post("/login", asyncHandler(userController.login));
router.post("/google-login", asyncHandler(userController.googleLogin));
router.post("/check-email", asyncHandler(userController.checkEmail));

// OTP & Password Reset
router.post("/send-otp", asyncHandler(userController.sendOtp));
router.post("/verify-otp", asyncHandler(userController.verifyOtp));
router.post("/reset-password", asyncHandler(userController.resetPassword));
router.put("/update-password", asyncHandler(userController.updatePassword));
router.get("/verify-email", asyncHandler(userController.verifyEmail));

// User CRUD
router.post("/", upload.single("profilePicture"), asyncHandler(userController.createUser));
router.get("/", asyncHandler(userController.getAllUsers));
router.get("/:id", asyncHandler(userController.getUserById));
router.put("/:id", upload.single("profilePicture"), asyncHandler(userController.updateUser));
router.delete("/:id", asyncHandler(userController.deleteUser));

module.exports = router;
