import express from "express";
import { addCamp, closeCamp, camps, addRefugees } from "../controllers/camp.controller.js";

const router = express.Router();

router.post("/addCamp", addCamp);

router.post("/closeCamp/:id", closeCamp);

router.put("/updateCamp/:id", addRefugees);

router.get("/camps", camps);

export default router;