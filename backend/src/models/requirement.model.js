import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
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

    status: {
        type: String,
        required: true,
    }

}, { timestamps: true });

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
