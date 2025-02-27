import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
    donorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        required: true,
        default: "pending",
    },

}, { timestamps: true });

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;
