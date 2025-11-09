const asyncHandler = require("../utils/asyncHandler");
const {
  createResponseService,
  getAllResponsesService,
  getResponseByIdService,
  updateReplyService,
  deleteResponseService,
} = require("../services/response.service");

// Create response
const createResponse = asyncHandler(async (req, res) => {
  const response = await createResponseService(req.body);
  res.status(201).json({
    success: true,
    message: "Response created successfully.",
    data: response,
  });
});

// Get all responses
const getAllResponses = asyncHandler(async (req, res) => {
  const responses = await getAllResponsesService();
  res.status(200).json({
    success: true,
    message: "Responses fetched successfully.",
    data: responses,
  });
});

// Get response by ID
const getResponseById = asyncHandler(async (req, res) => {
  const response = await getResponseByIdService(req.params.id);
  res.status(200).json({
    success: true,
    message: "Response retrieved successfully.",
    data: response,
  });
});

// Update reply and send email
const updateReply = asyncHandler(async (req, res) => {
  const response = await updateReplyService(req.params.id, req.body.reply);
  res.status(200).json({
    success: true,
    message: "Reply updated and email sent successfully.",
    data: response,
  });
});

// Delete response
const deleteResponse = asyncHandler(async (req, res) => {
  const result = await deleteResponseService(req.params.id);
  res.status(200).json({
    success: true,
    message: result.message,
  });
});

module.exports = {
  createResponse,
  getAllResponses,
  getResponseById,
  updateReply,
  deleteResponse,
};
