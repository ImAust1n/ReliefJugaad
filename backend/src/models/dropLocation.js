import mongoose from 'mongoose';

const dropLocationSchema = new mongoose.Schema({
    ngoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NGO",
        required: true,
    },
    
    name: {
        type: String,
        required: true,
    },

    district: {
        type: String,
        required: true,
    },

    state: {
        type: String,
        required: true,
    },

    location: {
        type: String,
    },

}, { timestamps: true });

const DropLocation = mongoose.model("DropLocation", dropLocationSchema);

export default DropLocation;
