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

const PORT = 5000;

app.listen(PORT, () => {
    connectDB();
    console.log(`server started at http://localhost:${PORT}`);
});
