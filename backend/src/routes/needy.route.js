import express from "express";
import { addNeedy, getAllNeedy, closeRequest } from "../controllers/needy.controller.js";

const router = express.Router();

router.post("/add", addNeedy);
router.get("/all", getAllNeedy);
router.post("/close/:id", closeRequest);

export default router;