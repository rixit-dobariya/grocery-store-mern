const User = require("../models/User");
const Otp = require("../models/Otp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const AppError = require("../utils/AppError");

const { uploadImage, deleteImage } = require("../utils/cloudinary");
const JWT_SECRET = process.env.JWT_SECRET;

// Mail transporter
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

// 🔹 REGISTER USER
exports.registerUserService = async (body) => {
    const { firstName, lastName, email, mobile, password, authType } = body;

    if (!firstName || !lastName || !email || !mobile || !password)
        throw new AppError("All fields are required", 400);

    const existing = await User.findOne({ email });
    if (existing) throw new AppError("User already exists", 400);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        firstName,
        lastName,
        email,
        mobile,
        password: hashedPassword,
        authType: authType || "Email",
        status: "Inactive",
    });

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1d" });
    const link = `https://grocery-store-mern.onrender.com/verify-email/${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify Your Email",
        text: `Hi ${firstName},\nPlease verify your email:\n${link}`,
    });

    return { message: "Verification email sent successfully." };
};

// 🔹 LOGIN USER
exports.loginUserService = async (body) => {
    const { email, password } = body;
    const user = await User.findOne({ email });
    if (!user) throw new AppError("User not found", 404);

    if (user.authType === "Google") throw new AppError("Please login with Google Sign-In", 400);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AppError("Invalid credentials", 401);

    if (user.status === "Inactive") throw new AppError("User account is inactive", 403);
    if (user.status === "Deleted") throw new AppError("User account deleted, contact admin", 403);

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
        expiresIn: "7d",
    });

    return { token, user };
};

// 🔹 SEND OTP
exports.sendOtpService = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new AppError("Email not registered", 404);

    await Otp.deleteMany({ email });

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.create({ email, otp: otpCode });

    await transporter.sendMail({
        to: email,
        subject: "Your OTP Code",
        html: `<h3>Your OTP: ${otpCode}</h3><p>Expires in 5 minutes.</p>`,
    });

    return { message: "OTP sent successfully" };
};

// 🔹 VERIFY OTP
exports.verifyOtpService = async (email, otp) => {
    const valid = await Otp.findOne({ email, otp });
    if (!valid) throw new AppError("Invalid or expired OTP", 400);

    await Otp.deleteMany({ email });
    return { message: "OTP verified successfully" };
};

// 🔹 RESET PASSWORD
exports.resetPasswordService = async (email, newPassword) => {
    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { password: hashed });
    return { message: "Password updated successfully" };
};

// 🔹 VERIFY EMAIL
exports.verifyEmailService = async (token) => {
    if (!token) throw new AppError("Verification token required", 400);

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });
    if (!user) throw new AppError("User not found", 404);

    if (user.status === "Active") throw new AppError("Email already verified", 400);

    user.status = "Active";
    await user.save();

    return { message: "Email verified successfully" };
};

// 🔹 UPDATE PASSWORD
exports.updatePasswordService = async (email, currentPassword, newPassword) => {
    const user = await User.findOne({ email });
    if (!user) throw new AppError("User not found", 404);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new AppError("Current password incorrect", 400);

    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { password: hashed });

    return { message: "Password updated successfully" };
};

// 🔹 Create user (admin use case)
exports.createUserService = async (body, file) => {
    const { firstName, lastName, email, mobile, password, authType, firebaseUid } = body;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new AppError("User already exists", 400);

    const hashedPassword = await bcrypt.hash(password, 10);
    let profilePictureUrl = null;

    if (file) {
        profilePictureUrl = await uploadImage(file.path, "profile_pictures");
    }

    const newUser = await User.create({
        firstName,
        lastName,
        email,
        mobile,
        password: hashedPassword,
        authType: authType || "Email",
        firebaseUid,
        status: "Active",
        profilePicture: profilePictureUrl,
    });

    return newUser;
};

// 🔹 Get all users (excluding deleted)
exports.getAllUsersService = async () => {
    const users = await User.find({ status: { $ne: "Deleted" }, role: "User" });
    return users;
};

// 🔹 Get single user
exports.getUserByIdService = async (id) => {
    const user = await User.findById(id);
    if (!user) throw new AppError("User not found", 404);
    return user;
};

// 🔹 Update user (admin)
exports.updateUserService = async (id, body, file) => {
    const { firstName, lastName, mobile, status, password } = body;
    let profilePicture = body.profilePicture;

    if (file) {
        if (profilePicture) {
            const publicId = profilePicture.split("/").pop().split(".")[0];
            await deleteImage(publicId);
        }
        profilePicture = await uploadImage(file.path, "profile_pictures");
    }

    const updateFields = { firstName, lastName, mobile, profilePicture, status };

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateFields.password = hashedPassword;
    }

    const user = await User.findByIdAndUpdate(id, updateFields, { new: true });
    if (!user) throw new AppError("User not found", 404);

    return user;
};

// 🔹 Soft delete user
exports.deleteUserService = async (id) => {
    const user = await User.findByIdAndUpdate(id, { status: "Deleted" }, { new: true });
    if (!user) throw new AppError("User not found", 404);
    return { message: "User marked as deleted successfully" };
};

// 🔹 Google login or register
exports.googleLoginService = async (email, authType) => {
    if (!email || !authType) throw new AppError("Email and authType required", 400);

    let user = await User.findOne({ email });

    if (!user) {
        user = await User.create({
            email,
            authType,
            status: "Active",
        });

        return {
            message: "User registered successfully",
            userId: user._id,
            email: user.email,
            isNewUser: true,
        };
    }

    return {
        message: "Login successful",
        userId: user._id,
        email: user.email,
        isNewUser: false,
    };
};

// 🔹 Check if email exists
exports.checkEmailService = async (email) => {
    if (!email) throw new AppError("Email is required", 400);

    const user = await User.findOne({ email, authType: "Email" });
    return { exists: !!user };
};
