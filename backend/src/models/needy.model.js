import mongoose from 'mongoose';

const needySchema = new mongoose.Schema({
    latitude: {
        type: String,
        required: true,
    },

    longitude: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Needy = mongoose.model("Needy", needySchema);

export default Needy;