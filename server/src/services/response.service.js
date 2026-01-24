import Response from "../models/Response.js";
import nodemailer from "nodemailer";
import config from "../config/index.js";
import { ApiError } from "../utils/ApiError.js";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: config.emailUser,
        pass: config.emailPass,
    },
});

class ResponseService {
    async createResponse(responseData) {
        const { name, email, phone, message } = responseData;
        if (!name || !email || !message) {
            throw new ApiError(400, "Name, email and message are required");
        }
        const newResponse = new Response({ name, email, phone, message });
        return await newResponse.save();
    }

    async getAllResponses() {
        return await Response.find().sort({ createdAt: -1 });
    }

    async getResponseById(id) {
        const response = await Response.findById(id);
        if (!response) {
            throw new ApiError(404, "Response not found");
        }
        return response;
    }

    async updateReply(id, reply) {
        if (!reply) throw new ApiError(400, "Reply is required");

        const response = await Response.findByIdAndUpdate(
            id,
            { reply },
            { new: true, runValidators: true }
        );

        if (!response) {
            throw new ApiError(404, "Response not found");
        }

        await transporter.sendMail({
            from: config.emailUser,
            to: response.email,
            subject: "Response to your query",
            text: `Hi ${response.name},\n\nYour Query: ${response.message}\nReply: ${reply}`
        });

        return response;
    }

    async deleteResponse(id) {
        const response = await Response.findByIdAndDelete(id);
        if (!response) {
            throw new ApiError(404, "Response not found");
        }
        return { message: "Response deleted successfully" };
    }
}

export default new ResponseService();
