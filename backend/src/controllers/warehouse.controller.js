import Warehouse from "../models/warehouse.model.js"

export const addWarehouse = async (req, res) => {
    const { ngoId, name, district, state, location } = req.body;
    const { latitude, longitude } = req.query;
    try {

        if (!ngoId || !name || !district || !state || !location || !latitude || !longitude) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const warehouse = await Warehouse.findOne({ ngoId, name, district, state });

        if (warehouse) return res.status(400).json({ message: "Warehouse already exists" });

        const newWarehouse = new Warehouse({
            ngoId,
            name,
            district,
            state,
            location,
            latitude,
            longitude,
        });

        if (newWarehouse) {
            await newWarehouse.save();
            res.status(201).json({
                _id: newWarehouse._id,
                ngoId: newWarehouse.ngoId,
                name: newWarehouse.name,
                district: newWarehouse.district,
                state: newWarehouse.state,
                location: newWarehouse.location,
                latitude: newWarehouse.latitude,
                longitude: newWarehouse.longitude,
            });
        } else {
            res.status(400).json({ message: "Invalid warehouse data" });
        }

    } catch (error) {
        console.log("Error in add Warehouse controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const closeWarehouse = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Warehouse ID is required" });
        }

        const warehouse = await Warehouse.findById({ _id: id });
        if (!warehouse) {
            return res.status(404).json({ message: "Warehouse not found" });
        }

        await Warehouse.deleteOne({ _id: id }); // Delete the warehouse

        res.status(200).json({ message: "Warehouse closed successfully" });
    } catch (error) {
        console.log("Error in closeWarehouse controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const warehouses = async (req, res) => {
    try {
        const warehouses = await Warehouse.find();
        res.status(200).json(warehouses);
    } catch (error) {
        console.log("Error in warehouses controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
