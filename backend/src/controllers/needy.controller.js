import Needy from "../models/needy.model.js";

export const addNeedy = async (req, res) => {
    const { latitude, longitude } = req.body;
    try {
        if (!latitude || !longitude) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newNeedy = new Needy({
            latitude,
            longitude,
        });

        const savedNeedy = await newNeedy.save();

        res.status(201).json({
            _id: savedNeedy._id,
            latitude: savedNeedy.latitude,
            longitude: savedNeedy.longitude,
        });
        
    } catch (error) {
        console.log(
            "Error in addNeedy: ",
            error
        )
        res.status(500).json({ message: error.message });
    }
}

export const getAllNeedy = async (req, res) => {
    try {
        const allNeedy = await Needy.find();
        res.status(200).json(allNeedy);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
