import express from "express";
import { donateMoney, getDonations } from "../controllers/donation.controller.js";

const router = express.Router();

router.post("/donate/:donorId", donateMoney);

router.get("/status", getDonations);

export default router;