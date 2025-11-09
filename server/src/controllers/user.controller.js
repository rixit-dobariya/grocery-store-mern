const asyncHandler = require("../utils/asyncHandler");
const {
    registerUserService,
    loginUserService,
    sendOtpService,
    verifyOtpService,
    resetPasswordService,
    verifyEmailService,
    updatePasswordService,
    createUserService,
    getAllUsersService,
    getUserByIdService,
    updateUserService,
    deleteUserService,
    googleLoginService,
    checkEmailService,
} = require("../services/user.service");

// Register user
const register = asyncHandler(async (req, res) => {
    const result = await registerUserService(req.body);
    res.status(201).json({
        message: result.message,
    });
});

// Login user
const login = asyncHandler(async (req, res) => {
    const result = await loginUserService(req.body);
    res.status(200).json(result);
});

// Send OTP
const sendOtp = asyncHandler(async (req, res) => {
    const result = await sendOtpService(req.body.email);
    res.status(200).json({
        message: result.message,
    });
});

// Verify OTP
const verifyOtp = asyncHandler(async (req, res) => {
    const result = await verifyOtpService(req.body.email, req.body.otp);
    res.status(200).json({
        message: result.message,
    });
});

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
    const result = await resetPasswordService(req.body.email, req.body.newPassword);
    res.status(200).json({
        message: result.message,
    });
});

// Verify Email
const verifyEmail = asyncHandler(async (req, res) => {
    const result = await verifyEmailService(req.query.token);
    res.status(200).json({
        message: result.message,
    });
});

// Update Password
const updatePassword = asyncHandler(async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;
    const result = await updatePasswordService(email, currentPassword, newPassword);
    res.status(200).json({
        message: result.message,
    });
});

// Create user (admin)
const createUser = asyncHandler(async (req, res) => {
    const user = await createUserService(req.body, req.file);
    res.status(201).json(user);
});

// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await getAllUsersService();
    res.status(200).json(users);
});

// Get user by ID
const getUserById = asyncHandler(async (req, res) => {
    const user = await getUserByIdService(req.params.id);
    res.status(200).json(user);
});

// Update user
const updateUser = asyncHandler(async (req, res) => {
    const user = await updateUserService(req.params.id, req.body, req.file);
    res.status(200).json(user);
});

// Delete user
const deleteUser = asyncHandler(async (req, res) => {
    const result = await deleteUserService(req.params.id);
    res.status(200).json({
        message: result.message,
    });
});

// Google login/register
const googleLogin = asyncHandler(async (req, res) => {
    const result = await googleLoginService(req.body.email, req.body.authType);
    res.status(result.isNewUser ? 201 : 200).json(result);
});

// Check email existence
const checkEmail = asyncHandler(async (req, res) => {
    const result = await checkEmailService(req.body.email);
    res.status(200).json(result);
});

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    googleLogin,
    checkEmail,
    register,
    login,
    sendOtp,
    verifyOtp,
    resetPassword,
    verifyEmail,
    updatePassword,
};
