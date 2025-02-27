import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
    dropLocation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DropLocation",
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

    district: {
        type: String,
        required: true,
    },

    state: {
        type: String,
        required: true,
    },

}, { timestamps: true });

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
