import mongoose from 'mongoose';

const requirementSchema = new mongoose.Schema({
    campId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Camp",
        required: true,
    },
    
    category: {
        type: String,
        required: true,
    },

    quantity: {
        type: Number,
        required: true,
    },

}, { timestamps: true });

const Requirement = mongoose.model("Requirement", requirementSchema);

export default Requirement;
