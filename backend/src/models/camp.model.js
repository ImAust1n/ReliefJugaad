import mongoose from 'mongoose';

const campSchema = new mongoose.Schema({
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

    n_Refugees: {
        type: Number,
        default: 0,
    },

    location: {
        type: String,
    },

}, { timestamps: true });

const Camp = mongoose.model("Camp", campSchema);

export default Camp;
