import express from "express";
const router = express.Router();
import {
    createResponse,
    getAllResponses,
    getResponseById,
    updateReply,
    deleteResponse
} from "../controllers/response.controller.js";

router.post("/", createResponse);
router.get("/", getAllResponses);
router.get("/:id", getResponseById);
router.put("/:id/reply", updateReply);
router.delete("/:id", deleteResponse);

export default router;
