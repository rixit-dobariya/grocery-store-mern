import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import userService from "../services/user.service.js";

// Register a new user with email verification link
export const register = asyncHandler(async (req, res) => {
  const result = await userService.registerUser(req.body);
  res.status(201).json(new ApiResponse(201, null, result.message));
});

// Login user
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await userService.loginUser(email, password);
  res.json(new ApiResponse(200, result, "Login successful"));
});

// Send OTP
export const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const result = await userService.sendOtp(email);
  res.status(200).json(new ApiResponse(200, null, result.message));
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  const result = await userService.verifyOtp(email, otp);
  res.status(200).json(new ApiResponse(200, null, result.message));
});

// Reset Password
export const resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;
  const result = await userService.resetPassword(email, newPassword);
  res.json(new ApiResponse(200, null, result.message));
});

// Verify Email
export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.query;
  const result = await userService.verifyEmail(token);
  res.json(new ApiResponse(200, null, result.message));
});

//update password
export const updatePassword = asyncHandler(async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;
  const result = await userService.updatePassword(email, currentPassword, newPassword);
  res.json(new ApiResponse(200, null, result.message));
});

// Create User (Admin use case)
export const createUser = asyncHandler(async (req, res) => {
  const newUser = await userService.createUser(req.body, req.file);
  res.status(201).json(new ApiResponse(201, newUser, "User created successfully"));
});

// Get All Users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(new ApiResponse(200, users, "Users fetched successfully"));
});

// Get Single User
export const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.json(new ApiResponse(200, user, "User fetched successfully"));
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body, req.file);
  res.json(new ApiResponse(200, user, "User updated successfully"));
});

// Delete User
export const deleteUser = asyncHandler(async (req, res) => {
  const result = await userService.deleteUser(req.params.id);
  res.json(new ApiResponse(200, null, result.message));
});

// POST /api/auth/google-login
export const googleLogin = asyncHandler(async (req, res) => {
  const { email, authType } = req.body;
  const result = await userService.googleLogin(email, authType);

  if (result.isNewUser) {
    return res.status(201).json(new ApiResponse(201, result, result.message));
  } else {
    return res.status(200).json(new ApiResponse(200, result, result.message));
  }
});

export const checkEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const result = await userService.checkEmail(email);

  if (result.exists) {
    return res.status(200).json({ exists: true });
  } else {
    return res.status(200).json({ exists: false });
  }
});
