import express from 'express'
import dotenv from 'dotenv'
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js"
import ngoRoutes from "./routes/ngo.route.js"
import govRoutes from "./routes/gov.route.js"
import disasterRoutes from "./routes/disaster.route.js"
import donationRoutes from "./routes/donation.route.js"
import warehouseRoutes from "./routes/warehouse.route.js"
import campRoutes from "./routes/camp.route.js"
import inventoryRoutes from "./routes/inventory.route.js"
import requirementRoutes from "./routes/requirement.route.js"
import needyRoutes from "./routes/needy.route.js"
import emailRoutes from "./routes/email.route.js"
import userRoutes from "./routes/user.route.js"
import { connectDB } from "./lib/db.js"

dotenv.config()

const PORT = process.env.PORT;

const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.get('/', (req, res) => {
    res.reponse(200).json({ message: "API Server is Live" });
})

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/ngos', ngoRoutes);
app.use('/api/gov', govRoutes);
app.use('/api/disasters', disasterRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/warehouse', warehouseRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/camp', campRoutes);
app.use('/api/requirements', requirementRoutes);
app.use('/api/needy', needyRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})
