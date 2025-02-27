import mongoose from 'mongoose';

const govSchema = new mongoose.Schema({
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
    },

    state: {
        type: String,
    },

    type: {
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

const GOV = mongoose.model("GOV", govSchema);

export default GOV;
