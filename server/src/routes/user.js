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

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - mobile
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               mobile:
 *                 type: string
 *               password:
 *                 type: string
 *               authType:
 *                 type: string
 *                 default: Email
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: All fields are required
 *       409:
 *         description: User already exists
 */
router.post("/register", register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *       403:
 *         description: User account is inactive
 *       404:
 *         description: User not found or deleted
 */
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
