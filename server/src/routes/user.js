// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const upload = require("../middlewares/multer.middleware"); 

// Registration & Login
router.post("/register", userController.register);
router.post("/login", userController.login);

// OTP & Password Reset
router.post("/send-otp", userController.sendOTP);
router.post("/verify-otp", userController.verifyOTP);
router.post("/reset-password", userController.resetPassword);

// User CRUD
router.post("/", upload.single("profilePicture"), userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
