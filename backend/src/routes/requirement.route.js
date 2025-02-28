import express from "express";
import { addRequirement, deleteRequirement, updateRequirement, requirements } from "../controllers/requirement.controller.js";

const router = express.Router();

router.post("/addRequirement/:campId", addRequirement);

router.post("/deleteRequirement/:id", deleteRequirement);

router.put("/updateRequirement/:id", updateRequirement);

router.get("/requirements", requirements);

export default router;