import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
    warehouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warehouse",
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

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
