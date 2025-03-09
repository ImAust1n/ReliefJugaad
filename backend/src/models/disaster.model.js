import mongoose from 'mongoose';

const disasterSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },

    state: {
        type: String,
        required: true,
    },

    severity: {
        type: Number,
        required: true,
    },

    onGoing: {
        type: Boolean,
        default: false,
    },

    description: {
        type: String,
        default: "",
    },

}, { timestamps: true });

const Disaster = mongoose.model("Disaster", disasterSchema);

export default Disaster;
