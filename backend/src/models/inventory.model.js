import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
    warehouseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warehouse",
        required: true,
    },
    
    foodQuantity: {
        type: Number,
        required: true,
    },

    waterQuantity: {
        type: Number,
        required: true,
    },

    medicineQuantity: {
        type: Number,
        required: true,
    },

    otherQuantity: {
        type: Number,
        required: true,
    }

}, { timestamps: true });

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
