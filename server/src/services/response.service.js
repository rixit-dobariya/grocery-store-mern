const Response = require("../models/Response");
const nodemailer = require("nodemailer");
const AppError = require("../utils/AppError");

// Mail transporter (configure via env vars)
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Create new response
exports.createResponseService = async (data) => {
  const { name, email, phone, message } = data;
  if (!name || !email || !message) throw new AppError("Missing required fields", 400);

  const newResponse = await Response.create({ name, email, phone, message });
  return newResponse;
};

// Get all responses
exports.getAllResponsesService = async () => {
  const responses = await Response.find().sort({ createdAt: -1 });
  return responses;
};

// Get single response by ID
exports.getResponseByIdService = async (id) => {
  const response = await Response.findById(id);
  if (!response) throw new AppError("Response not found", 404);
  return response;
};

// Update reply and send email
exports.updateReplyService = async (id, reply) => {
  const response = await Response.findByIdAndUpdate(
    id,
    { reply },
    { new: true, runValidators: true }
  );
  if (!response) throw new AppError("Response not found", 404);

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: response.email,
      subject: "Response to your query",
      text: `Hi ${response.name},\n\nYour Query: ${response.message}\nReply: ${reply}`,
    });
  } catch (err) {
    throw new AppError(`Failed to send email: ${err.message}`, 500);
  }

  return response;
};

// Delete response
exports.deleteResponseService = async (id) => {
  const response = await Response.findByIdAndDelete(id);
  if (!response) throw new AppError("Response not found", 404);
  return { message: "Response deleted successfully" };
};
