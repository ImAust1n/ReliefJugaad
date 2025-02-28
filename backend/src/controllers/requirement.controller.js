import Requirement from '../models/requirement.model.js';

export const addRequirement = async (req, res) => {
    const { category, quantity } = req.body;
    const { campId } = req.params;
    try {
        if (!category || !quantity || !campId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const requirement = await Requirement.findOne({ campId, category });

        if (requirement) return res.status(400).json({ message: "Requirement already exists" });

        const newRequirement = new Requirement({
            campId,
            category,
            quantity,
        });

        const savedRequirement = await newRequirement.save();

        res.status(201).json({
            _id: savedRequirement._id,
            campId: savedRequirement.campId,
            category: savedRequirement.category,
            quantity: savedRequirement.quantity,
        });

    } catch (error) {
        console.log("Error in addRequirement: ", error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteRequirement = async (req, res) => {
    try {
        const deletedRequirement = await Requirement.findByIdAndDelete(req.params.id);
        if (!deletedRequirement) {
            return res.status(404).json({ message: "Requirement not found" });
        }
        res.status(200).json({ message: "Requirement deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRequirement = async (req, res) => {
    const { id } = req.params;
    const { number } = req.body;

    try {
        if (!id || !number) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const requirement = await Requirement.findById(id);
        if (!requirement) {
            return res.status(404).json({ message: "Requirement not found" });
        }

        requirement.quantity += Number(number);
        await requirement.save();

        res.status(200).json({ message: "Requirement updated successfully", quantity: requirement.number });
    } catch (error) {
        console.log("Error in updateRequirement controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const requirements = async (req, res) => {
    try {
        const allRequirements = await Requirement.find();
        res.status(200).json(allRequirements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
