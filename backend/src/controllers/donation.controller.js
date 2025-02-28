import Donation from "../models/donation.model.js"

export const donateMoney = async (req, res) => {
    const {amount} = req.body;
    const {donorId} = req.params;
    try {

        if (!amount || !donorId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newDonation = new Donation({
            donorId,
            amount,
            status: "successful",
        });

        if (newDonation) {
            await newDonation.save();
            res.status(201).json({
                _id:newDonation._id,
                amount: newDonation.amount,
                donorId: newDonation.donorId,
                status: "successful",
            });
        } else {
            res.status(400).json({ message:"Invalid user data" });
        }

    } catch (error) {
        console.log("Error in add Disaster controller", error.message);

        res.status(500).json({ message:"Internal Server Error" })
    }
};


export const getDonations = async (req, res) => {
    try {
        const donations = await Donation.find({ status:"successful" });
        res.status(200).json(donations);
    } catch (error) {
        console.log("Error in donations controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
