import express from "express";
const router = express.Router();
import { getContactPage, updateContactPage } from "../controllers/contact-page.controller.js";

router.get("/", getContactPage);
router.put("/", updateContactPage);

export default router;
