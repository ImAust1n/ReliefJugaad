import Disaster from "../models/disaster.model.js"

export const addDisaster = async (req, res) => {
    const {type, state, severity, description} = req.body;
    try {

        if (!type || !state || !severity || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const disaster = await Disaster.findOne({ type, state });

        if (disaster) return res.status(400).json({ message: "Disaster already exists" })

        const newDisaster = new Disaster({
            type,
            state,
            severity, 
            onGoing: true,
            description,
        });

        if (newDisaster) {
            await newDisaster.save();
            res.status(201).json({
                _id:newDisaster._id,
                type: newDisaster.type,
                state: newDisaster.state,
                severity: newDisaster.severity, 
                onGoing: newDisaster.onGoing,
                description: newDisaster.description,
            });
        } else {
            res.status(400).json({ message:"Invalid user data" });
        }

    } catch (error) {
        console.log("Error in add Disaster controller", error.message);

        res.status(500).json({ message:"Internal Server Error" })
    }
};

export const closeDisaster = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Disaster ID is required" });
        }

        const disaster = await Disaster.findById({_id: id});
        if (!disaster) {
            return res.status(404).json({ message: "Disaster not found" });
        }

        disaster.onGoing = false; // Mark the disaster as closed
        await disaster.save(); // Save the changes

        res.status(200).json({ message: "Disaster closed successfully" });
    } catch (error) {
        console.log("Error in closeDisaster controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const disasters = async (req, res) => {
    try {
        const disasters = await Disaster.find({ onGoing: true }).sort({ severity: -1 });
        res.status(200).json(disasters);
    } catch (error) {
        console.log("Error in disasters controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
