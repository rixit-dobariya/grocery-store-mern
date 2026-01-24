import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import responseService from "../services/response.service.js";

export const createResponse = asyncHandler(async (req, res) => {
  const newResponse = await responseService.createResponse(req.body);
  res.status(201).json(newResponse);
});

export const getAllResponses = asyncHandler(async (req, res) => {
  const responses = await responseService.getAllResponses();
  res.status(200).json(responses);
});

export const getResponseById = asyncHandler(async (req, res) => {
  const response = await responseService.getResponseById(req.params.id);
  res.status(200).json(response);
});

export const updateReply = asyncHandler(async (req, res) => {
  const response = await responseService.updateReply(req.params.id, req.body.reply);
  res.status(200).json(response);
});

export const deleteResponse = asyncHandler(async (req, res) => {
  const result = await responseService.deleteResponse(req.params.id);
  res.status(200).json(result);
});
