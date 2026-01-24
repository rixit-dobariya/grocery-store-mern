import express from "express";
const router = express.Router();
import {
    addAddress,
    getAddressById,
    getAddressesByUserId,
    updateAddress
} from "../controllers/address.controller.js";

router.post("/", addAddress);
router.get("/:addressId", getAddressById);
router.get("/user/:userId", getAddressesByUserId);
router.put("/:addressId", updateAddress);

export default router;
