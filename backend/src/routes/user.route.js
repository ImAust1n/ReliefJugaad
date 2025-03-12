import express from 'express';
import User from '../models/user.model.js';

const router = express.Router();

router.get('/emails', async (req, res) => {
    try {
        const users = await User.find().select('email');
        const emails = users.map(user => user.email);
        res.status(200).json(emails);
    } catch (error) {
        console.error("Error fetching user emails:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
