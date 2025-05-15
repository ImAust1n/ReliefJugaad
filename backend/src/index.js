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


const allowedOrigins = [
  "http://localhost:5173", 
  "https://8159-205-254-163-34.ngrok-free.app"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

      // Handle Preflight Requests
      if (req.method === "OPTIONS") {
          return res.sendStatus(200);
      }
  }

  next();
});


app.use((req, res, next) => {
  res.setHeader("ngrok-skip-browser-warning", "true");
  next();
});

app.get('/', (req, res) => {
    res.status(200).json({ message: "API Server is Live" });
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

app.use('/api/check', (req, res) => {
    res.status(200).json({ message: "Hello World" });
});

// Connect to the database first, then start the server
connectDB()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  });
