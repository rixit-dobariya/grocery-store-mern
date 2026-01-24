import User from "../models/User.js";
import Otp from "../models/Otp.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";
import config from "../config/index.js";
import { ApiError } from "../utils/ApiError.js";

const JWT_SECRET = config.jwtSecret;

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: config.emailUser,
        pass: config.emailPass,
    },
});

class UserService {
    async registerUser(userData) {
        const { firstName, lastName, email, mobile, password, authType } = userData;

        if (!firstName || !lastName || !email || !mobile || !password) {
            throw new ApiError(400, "All fields are required");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new ApiError(409, "User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            mobile,
            password: hashedPassword,
            authType: authType || "Email",
            status: "Inactive",
        });

        await newUser.save();

        const verificationToken = jwt.sign({ email: newUser.email }, JWT_SECRET, { expiresIn: "1d" });
        const verificationLink = `https://grocery-store-mern.onrender.com/verify-email/${verificationToken}`;

        await transporter.sendMail({
            from: config.emailUser,
            to: newUser.email,
            subject: "Verify Your Email",
            text: `Hi ${firstName},\n\nThank you for registering. Please verify your email by clicking the following link:\n${verificationLink}\n\nThis link will expire in 24 hours.`
        });

        return { message: "User registered successfully. Verification email sent." };
    }

    async loginUser(email, password) {
        const user = await User.findOne({ email });
        if (!user) throw new ApiError(404, "User not found");

        if (user.authType === "Google") {
            throw new ApiError(400, "This account is connected with Google. Please log in using Google Sign-In.");
        }

        if (user.authType === "Email") {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new ApiError(401, "Invalid credentials");
            if (user.status === "Inactive") {
                throw new ApiError(403, "User account is inactive");
            }
            if (user.status === "Deleted") {
                throw new ApiError(404, "User account is deleted, if want to recover contact admin");
            }
        }

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
            expiresIn: "7d",
        });

        return { token, user };
    }

    async sendOtp(email) {
        const user = await User.findOne({ email });
        if (!user) throw new ApiError(404, "Email not registered");

        await Otp.deleteMany({ email });

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        await Otp.create({ email, otp: otpCode });

        await transporter.sendMail({
            to: email,
            subject: "Your OTP Code",
            html: `<h3>Your OTP is: ${otpCode}</h3><p>This code will expire in 5 minutes.</p>`,
        });

        return { message: "OTP sent successfully" };
    }

    async verifyOtp(email, otp) {
        const validOtp = await Otp.findOne({ email, otp });
        if (!validOtp) throw new ApiError(400, "Invalid or expired OTP");

        await Otp.deleteMany({ email });
        return { message: "OTP verified" };
    }

    async resetPassword(email, newPassword) {
        const hashed = await bcrypt.hash(newPassword, 10);
        await User.findOneAndUpdate({ email }, { password: hashed });
        return { message: "Password updated successfully" };
    }

    async verifyEmail(token) {
        if (!token) throw new ApiError(400, "Verification token is required");

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });

        if (!user) throw new ApiError(404, "User not found");
        if (user.status === "Active") throw new ApiError(400, "Email already verified");

        user.status = "Active";
        await user.save();

        return { message: "Email verified successfully" };
    }

    async updatePassword(email, currentPassword, newPassword) {
        const user = await User.findOne({ email });
        if (!user) throw new ApiError(404, "User not found");

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) throw new ApiError(400, "Current password is incorrect");

        const hashed = await bcrypt.hash(newPassword, 10);
        await User.findOneAndUpdate({ email }, { password: hashed });
        return { message: "Password updated successfully" };
    }

    async createUser(userData, file) {
        const { firstName, lastName, email, mobile, password, authType, firebaseUid } = userData;

        let profilePictureUrl = null;
        if (file) {
            profilePictureUrl = await uploadImage(file.path, "profile_pictures");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) throw new ApiError(400, "User already exists");

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            mobile,
            password: hashedPassword,
            authType,
            firebaseUid,
            status: "Active",
            profilePicture: profilePictureUrl,
        });

        await newUser.save();
        return newUser;
    }

    async getAllUsers() {
        return await User.find({ status: { $ne: "Deleted" }, role: "User" });
    }

    async getUserById(id) {
        const user = await User.findById(id);
        if (!user) throw new ApiError(404, "User not found");
        return user;
    }

    async updateUser(id, userData, file) {
        const { firstName, lastName, mobile, status, password } = userData;
        let { profilePicture } = userData;

        if (file) {
            if (profilePicture) {
                const publicId = profilePicture.split("/").pop().split(".")[0];
                await deleteImage(publicId);
            }
            profilePicture = await uploadImage(file.path, "profile_pictures");
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const updateFields = { firstName, lastName, mobile, profilePicture, status, password: hashedPassword };
            return await User.findByIdAndUpdate(id, updateFields, { new: true });
        }

        const updateFieldsWithoutPassword = { firstName, lastName, mobile, profilePicture, status };
        return await User.findByIdAndUpdate(id, updateFieldsWithoutPassword, { new: true });
    }

    async deleteUser(id) {
        const user = await User.findByIdAndUpdate(
            id,
            { status: "Deleted" },
            { new: true }
        );
        if (!user) throw new ApiError(404, "User not found");
        return { message: "User marked as deleted successfully" };
    }

    async googleLogin(email, authType) {
        if (!email || !authType) {
            throw new ApiError(400, "Email and authType are required");
        }

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                email,
                authType,
                status: "Active",
            });

            return {
                userId: user._id,
                email: user.email,
                isNewUser: true,
                message: "User registered successfully"
            };
        } else {
            return {
                userId: user._id,
                email: user.email,
                isNewUser: false,
                message: "Login successful"
            };
        }
    }

    async checkEmail(email) {
        if (!email) throw new ApiError(400, "Email is required");

        const user = await User.findOne({ email, authType: "Email" });
        return { exists: !!user };
    }
}

export default new UserService();
