import Inventory from '../models/inventory.model.js';

export const addItem = async (req, res) => {
    const { category, quantity } = req.body;
    const { warehouseId } = req.params;
    try {
        if (!category || !quantity || !warehouseId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const item = await Inventory.findOne({ warehouseId, category });

        if (item) return res.status(400).json({ message: "Item already exists" });

        const newItem = new Inventory({
            warehouseId,
            category,
            quantity,
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
        res.status(500).json({ message: error.message });
    }
};

export const updateItem = async (req, res) => {
    const { id } = req.params;
    const { number } = req.body;

    try {
        if (!id || !number) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const inventory = await Inventory.findById(id);
        if (!inventory) {
            return res.status(404).json({ message: "Inventory not found" });
        }

        inventory.quantity += Number(number);
        await inventory.save();

        res.status(200).json({ message: "Item updated successfully", quantity: inventory.quantity });
    } catch (error) {
        console.log("Error in addItem controller", error);
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
