import express from "express";
import { addWarehouse, closeWarehouse, warehouses } from "../controllers/warehouse.controller.js";

const router = express.Router();

router.post("/addWarehouse", addWarehouse);

router.post("/closeWarehouse/:id", closeWarehouse);

router.get("/warehouses", warehouses);

export default router;