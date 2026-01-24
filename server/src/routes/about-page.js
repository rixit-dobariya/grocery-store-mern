import express from "express";
const router = express.Router();
import { getAboutPage, updateAboutPage } from "../controllers/about-page.controller.js";

router.get("/", getAboutPage);
router.put("/", updateAboutPage);

export default router;
