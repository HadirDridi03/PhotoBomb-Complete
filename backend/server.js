import express, { json } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';//authRoutes = LE "LIVREUR" qui apporte tes routes du fichier auth.js au serveur
/* .env → fichier où tu mets tes secrets/config
dotenv.config() → lit .env et met les valeurs dans Node
process.env → objet qui contient toutes les variables d’environnement disponibles*/
dotenv.config(); 
const app= express();//fonction pré-définie qui crée une application Express

app.use(express.json());//comprendre les données envoyé avant de les utiliser
app.use("/api/auth",authRoutes);
app.listen(5000,()=>{//démarre le serveur sur un port spécifique.
    connectDB();
    console.log("server started at http://localhost:5000");
});

