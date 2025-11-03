import express, { json } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import cors from 'cors'; 
import mongoose from 'mongoose';

dotenv.config(); 
const app = express();

app.use(express.json());
app.use(cors());  
app.use("/api/auth", authRoutes);

const PORT = 5000;

// Fonction pour supprimer l'index problématique
const removeProblematicIndex = async () => {
  try {
    await mongoose.connection.collection('users').dropIndex('alias_1');
    console.log('✅ Index alias supprimé');
  } catch (error) {
    console.log('ℹ️ Index alias déjà supprimé ou inexistant');
  }
};

app.listen(PORT, async () => {
    await connectDB();
    await removeProblematicIndex(); 
    console.log(`server started at http://localhost:${PORT}`);
});
