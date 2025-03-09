import express from "express";
import { addDisaster, closeDisaster, disasters } from "../controllers/disaster.controller.js";

const router = express.Router();

router.post("/addDisaster", addDisaster);

router.post("/closeDisaster/:id", closeDisaster);

router.get("/all", disasters);

export default router;