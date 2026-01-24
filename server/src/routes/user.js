// routes/userRoutes.js
import express from "express";
const router = express.Router();
import {
    register,
    login,
    googleLogin,
    checkEmail,
    sendOtp,
    verifyOtp,
    resetPassword,
    updatePassword,
    verifyEmail,
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";

// Registration & Login
router.post("/register", register);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.post("/check-email", checkEmail);

// OTP & Password Reset
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.put("/update-password", updatePassword);
router.get("/verify-email", verifyEmail);

// User CRUD
router.post("/", upload.single("profilePicture"), createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", upload.single("profilePicture"), updateUser);
router.delete("/:id", deleteUser);

export default router;
