// app.js

const express = require('express');
const app = express();
const port = 3000;

// Définir le répertoire public pour servir des fichiers statiques
app.use(express.static('public'));

app.get('/', (req, res) => {
  // Envoyer une réponse avec le texte et l'image
  res.send(`
    <h1>Coucou Jody !</h1>
    <img src="/img/memedev.jpg" alt="meme">
  `);
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
