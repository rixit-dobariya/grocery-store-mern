import express from "express";
const router = express.Router();
import { createOrder } from "../controllers/payment.controller.js";

router.post("/create-order", createOrder);

export default router;
