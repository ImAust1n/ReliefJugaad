import mongoose from 'mongoose';

const warehouseSchema = new mongoose.Schema({
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
        required: true,
    },

    latitude: {
        type: String,
        required: true,
    },

    longitude: {
        type: String,
        required: true,
    },
    
}, { timestamps: true });

const Warehouse = mongoose.model("Warehouse", warehouseSchema);

export default Warehouse;
