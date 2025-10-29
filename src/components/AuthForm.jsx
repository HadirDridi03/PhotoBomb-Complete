import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/AuthForm.css";

//type ici va etre soit login ou signup
export default function AuthForm({ type }) {
    //formData est un objet qui contient les valeurs des champs du formulaire
    //useState({...}) initialise chaque champ à une chaîne vide
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "signup" && formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    // TODO: Ajouter appel API ici
    console.log("Formulaire envoyé :", formData);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {type === "signup" && (
        <>
          <input
            type="text"
            name="name"
            placeholder="Nom complet"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
        </>
      )}

      <input
        type="email"
        name="email"
        placeholder="Adresse e-mail"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        value={formData.password}
        onChange={handleChange}
        required
      />

      {type === "signup" && (
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmer le mot de passe"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      )}

      <button type="submit" className="auth-button">
        {type === "login" ? "Se connecter" : "Créer mon compte"}
      </button>

      {type === "login" ? (
        <p className="auth-switch">
          Pas encore de compte ? <Link to="/signup">S’inscrire</Link>
        </p>
      ) : (
        <p className="auth-switch">
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      )}
    </form>
  );
}
