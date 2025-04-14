// controllers/user.controller.js

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const {uploadImage, deleteImage} = require("../utils/cloudinary")
const JWT_SECRET = process.env.JWT_SECRET;
let otpStore = {};

// Register a new user
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, password, authType, firebaseUid } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const newUser = new User({
      firstName,
      lastName,
      email,
      mobile,
      password: hashedPassword,
      authType,
      firebaseUid,
      status: "Active",
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.authType === "Email") {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Send OTP
const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = otp;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}`,
    });

    res.json({ message: "OTP sent" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (otpStore[email] && otpStore[email] === parseInt(otp)) {
      delete otpStore[email];
      res.json({ message: "OTP verified" });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { password: hashed });
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create User (Admin use case)
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, password, authType, firebaseUid } = req.body;

    // If a profile picture was uploaded, upload it to Cloudinary
    let profilePictureUrl = null;
    if (req.file) {
      // Use the uploadImage utility to upload to Cloudinary
      profilePictureUrl = await uploadImage(req.file.path, "profile_pictures"); // "profile_pictures" is the folder name
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const newUser = new User({
      firstName,
      lastName,
      email,
      mobile,
      password: hashedPassword,
      authType,
      firebaseUid,
      status: "Active",
      profilePicture: profilePictureUrl, // Store the Cloudinary URL
    });

    await newUser.save();
    res.status(201).json(newUser); // Return the created user with profile picture URL
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    // Find all users who are not marked as 'Deleted'
    const users = await User.find({ status: { $ne: "Deleted" } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single User
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, mobile, status, password } = req.body;
    let { profilePicture } = req.body;

    // If a new profile picture is uploaded, upload it to Cloudinary
    if (req.file) {
      // If the user already has a profile picture, delete it from Cloudinary
      if (profilePicture) {
        const publicId = profilePicture.split("/").pop().split(".")[0]; // Extract the publicId from the URL
        await deleteImage(publicId); // Delete the old image from Cloudinary
      }

      // Upload the new profile picture
      profilePicture = await uploadImage(req.file.path, "profile_pictures"); // "profile_pictures" is the folder name
    }

    // If a password is provided, hash it before updating the user
    if (password) {
      const salt = await bcrypt.genSalt(10); // Generate salt for hashing
      const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

      // Update the password along with other fields
      const updateFields = { firstName, lastName, mobile, profilePicture, status, password: hashedPassword };
      const user = await User.findByIdAndUpdate(req.params.id, updateFields, { new: true });

      return res.json(user); // Return the updated user with new password and profile picture URL if uploaded
    }

    // If no password is provided, update the user without changing the password
    const updateFieldsWithoutPassword = { firstName, lastName, mobile, profilePicture, status };
    const user = await User.findByIdAndUpdate(req.params.id, updateFieldsWithoutPassword, { new: true });

    res.json(user); // Return the updated user without password change
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    // Find the user by ID and update the status to "Deleted"
    const user = await User.findByIdAndUpdate(
      req.params.id, 
      { status: "Deleted" },  // Mark the user as deleted
      { new: true }           // To return the updated user
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User marked as deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  register,
  login,
  sendOTP,
  verifyOTP,
  resetPassword,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
