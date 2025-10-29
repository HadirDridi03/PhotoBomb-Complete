import express, { json } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import cors from 'cors'; 

dotenv.config(); 
const app = express();

app.use(express.json());
app.use(cors());  
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
    connectDB();
    console.log("server started at http://localhost:5000");
});
