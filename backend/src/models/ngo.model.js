import mongoose from 'mongoose';

const ngoSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    
    password: {
        type: String,
        required: true,
        minLength: 6,
    },

    district: {
        type: String,
        required: true,
    },

    state: {
        type: String,
        required: true,
    },

    phoneNumber: {
        type: String,
        required: true,
    },

    registrationNumber: {
        type: String,
        required: true,
    },

}, { timestamps: true });

const NGO = mongoose.model("NGO", ngoSchema);

export default NGO;
