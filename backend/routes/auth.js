import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';

const router = express.Router();//crée un mini-serveur pour organiser tes routes dans un fichier séparé.
router.post('/register', async (req, res) => {//async:déclare une fonction qui peut attendre des opérations lentes comme la base de données.
    //'/register':le serveur qui récupère les données du formulaire(boite aux lettres)
    try {
    const { name, alias, email, password, confirmPassword } = req.body;//extrait les 5 champs du formulaire directement dans des variables.
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Mots de passe ne correspondent pas' });//.json:transforme ton objet en format JSON structuré avec les bons headers pour que le client le lise facilement.
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Mot de passe trop court' });
    }

    let user = await User.findOne({ email });//findOne():cherche et retourne le premier document correspondant dans la base de données
    if (user) return res.status(400).json({ error: 'Email déjà utilisé' });
    user = await User.findOne({ alias });
    if (user) return res.status(400).json({ error: 'Alias déjà utilisé' });

    const hashedPassword = await bcrypt.hash(password, 10); //crypte le password 
    user = new User({ name, alias, email, password: hashedPassword });//crée un NOUVEAU utilisateur avec ses 4 infos, en remplaçant le mot de passe par sa version cryptée
    await user.save();

    res.status(201).json({ message: 'Compte créé avec succès !' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;