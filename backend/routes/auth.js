import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';

const router = express.Router();//crée un mini-serveur pour organiser tes routes dans un fichier séparé.
router.post('/register', async (req, res) => {//async:déclare une fonction qui peut attendre des opérations lentes comme la base de données.
   //'/register':le serveur qui récupère les données du formulaire(boite aux lettres)
    try {
    const { name, email, password, confirmPassword, role = 'user'  } = req.body;//extrait les 5 champs du formulaire directement dans des variables.
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Mots de passe ne correspondent pas' });//.json:transforme ton objet en format JSON structuré avec les bons headers pour que le client le lise facilement.
    }
    if (password.length < 8 || !/(?=.*[A-Z])(?=.*[0-9])/.test(password)) {
      return res.status(400).json({ error: 'Mot de passe doit avoir 8+ caractères, 1 majuscule et 1 chiffre' });
    }

    let user = await User.findOne({ email });//findOne():cherche et retourne le premier document correspondant dans la base de données
    if (user) return res.status(400).json({ error: 'Email déjà utilisé' });
    if (role !== 'user' && role !== 'admin') {
      return res.status(400).json({ error: 'Rôle invalide' });
    }


    const hashedPassword = await bcrypt.hash(password, 10); //crypte le password 
    user = new User({ name, email, password: hashedPassword ,role});//crée un NOUVEAU utilisateur avec ses 4 infos, en remplaçant le mot de passe par sa version cryptée
    await user.save();

    res.status(201).json({ message: 'Compte créé avec succès !', 
      userId: user._id,
      role: user.role  });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;