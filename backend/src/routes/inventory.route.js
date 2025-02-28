import express from "express";
import { addItem, deleteItem, updateItem, items } from "../controllers/inventory.controller.js";

const router = express.Router();

router.post("/addItem/:warehouseId", addItem);

router.post("/deleteItem/:id", deleteItem);

router.put("/updateItem/:id", updateItem);

router.get("/items", items);

export default router;