import express from "express";
import { addNeedy, getAllNeedy } from "../controllers/needy.controller.js";

const router = express.Router();

router.post("/add", addNeedy);
router.get("/all", getAllNeedy);

export default router;