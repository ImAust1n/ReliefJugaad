import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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

    isVolunteer: {
        type: Boolean,
        default: false,
    },

    type: {
        type: String,
        default: 'none',
    },

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
