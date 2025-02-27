import { generateToken } from "../lib/utils.js";
import GOV from "../models/gov.model.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    const {fullName, email, password, district, state, phoneNumber, type} = req.body;
    try {

        if (!fullName || !email || !password || !district || !state || !phoneNumber || !type) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters long" });
        }

        const user = await GOV.findOne({ email });

        if (user) return res.status(400).json({ message: "Email already exists" })

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new GOV({
            fullName,
            email,
            password:hashedPassword,
            district,
            state,
            phoneNumber, 
            type,
        });

        if (newUser) {
            // generate jwt token
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                district: newUser.district,
                state: newUser.state,
                phoneNumber: newUser.phoneNumber, 
                type: newUser.type,
            });
        } else {
            res.status(400).json({ message:"Invalid user data" });
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);

        res.status(500).json({ message:"Internal Server Error" })
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await GOV.findOne({email});

        if (!user) {
            return res.status(400).json({ message:"Invalid Credentials" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message:"Invalid Credentials" })
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id:user._id,
            fullName: user.fullName,
            email: user.email,
            district: user.district,
            state: user.state,
            phoneNumber: user.phoneNumber, 
            type: user.type,
        });

    } catch (error) {
        console.log("Error in login controller", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge:0 })
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        console.log("Error in logout controller", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}