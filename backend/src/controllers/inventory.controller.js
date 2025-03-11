import Inventory from '../models/inventory.model.js';

export const addItem = async (req, res) => {
    const { foodQuantity, waterQuantity, medicineQuantity, otherQuantity } = req.body;
    const { ngoId } = req.params;
    try {
        if (!foodQuantity || !waterQuantity || !medicineQuantity || !otherQuantity || !ngoId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newItem = new Inventory({
            ngoId,
            foodQuantity,
            waterQuantity,
            medicineQuantity,
            otherQuantity,
        });

        const savedItem = await newItem.save();

        res.status(201).json({
            _id: savedItem._id,
            warehouseId: savedItem.warehouseId,
            category: savedItem.category,
            quantity: savedItem.quantity,
        });

    } catch (error) {
        console.log("Error in addItem: ", error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteItem = async (req, res) => {
    try {
        const deletedItem = await Inventory.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        console.log("Error in deleteItem: ", error);
        res.status(500).json({ message: error.message });
    }
};

export const updateItem = async (req, res) => {
    const { id } = req.params;
    const { foodQuantity, waterQuantity, medicineQuantity, otherQuantity } = req.body;

    try {
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }

        const inventory = await Inventory.findById(id);
        if (!inventory) {
            return res.status(404).json({ message: "Inventory not found" });
        }

        if (foodQuantity) {
            inventory.foodQuantity += Number(foodQuantity);
        }
        if (waterQuantity) {
            inventory.waterQuantity += Number(waterQuantity);
        }
        if (medicineQuantity) {
            inventory.medicineQuantity += Number(medicineQuantity);
        }
        if (otherQuantity) {
            inventory.otherQuantity += Number(otherQuantity);
        }

        await inventory.save();

        res.status(200).json({ message: "Item updated successfully", inventory });
    } catch (error) {
        console.log("Error in updateItem controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const items = async (req, res) => {
    try {
        const allItems = await Inventory.find();
        res.status(200).json(allItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
