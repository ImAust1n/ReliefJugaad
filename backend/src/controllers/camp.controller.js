import Camp from "../models/camp.model.js"

export const addCamp = async (req, res) => {
    const { name, district, state, location, n_Refugees } = req.body;
    const { latitude, longitude } = req.query;
    try {
        if (!name || !district || !state || !location || !latitude || !longitude || !n_Refugees) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const camp = await Camp.findOne({ name, district, state });

        if (camp) return res.status(400).json({ message: "Camp already exists" });

        const newCamp = new Camp({
            name,
            district,
            state,
            location,
            latitude,
            longitude,
            n_Refugees,
        });

        await newCamp.save();
        res.status(201).json({
            _id: newCamp._id,
            name: newCamp.name,
            district: newCamp.district,
            state: newCamp.state,
            location: newCamp.location,
            latitude: newCamp.latitude,
            longitude: newCamp.longitude,
            n_Refugees: newCamp.n_Refugees,
        });
    } catch (error) {
        console.log("Error in addCamp controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const closeCamp = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Camp ID is required" });
        }

        const camp = await Camp.findById({ _id: id });
        if (!camp) {
            return res.status(404).json({ message: "Camp not found" });
        }

        await Camp.deleteOne({ _id: id }); // Delete the camp

        res.status(200).json({ message: "Camp closed successfully" });
    } catch (error) {
        console.log("Error in closeCamp controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const camps = async (req, res) => {
    try {
        const camps = await Camp.find();
        res.status(200).json(camps);
    } catch (error) {
        console.log("Error in camps controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const addRefugees = async (req, res) => {
    const { id } = req.params;
    const { number } = req.body;

    try {
        if (!id || !number) {
            return res.status(400).json({ message: "Camp ID and number of refugees are required" });
        }

        const camp = await Camp.findById(id);
        if (!camp) {
            return res.status(404).json({ message: "Camp not found" });
        }

        camp.n_Refugees += Number(number);
        await camp.save();

        res.status(200).json({ message: "Refugees added successfully", n_Refugees: camp.n_Refugees });
    } catch (error) {
        console.log("Error in addRefugees controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

