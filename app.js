const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Connectez-vous à la base de données SQLite
const db = new sqlite3.Database('mydatabase.db');

// Créez une table (si elle n'existe pas déjà)
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INT, name TEXT)");

  // Insérer "Jody" dans la table users si l'ID n'existe pas déjà
  const insertStmt = db.prepare("INSERT OR IGNORE INTO users (id, name) VALUES (?, ?)");
  insertStmt.run(1, "Jodyyy");
  insertStmt.finalize();
});

// Définir le répertoire public pour servir des fichiers statiques
app.use(express.static('public'));

// Gérer la requête GET
app.get('/', (req, res) => {
  // Effectuer une opération SQLite (par exemple, récupérer le nom depuis la base de données)
  db.serialize(() => {
    db.get("SELECT name FROM users WHERE id = 1", (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erreur serveur');
      }

      const userName = row ? row.name : 'Jody'; // Utiliser 'Jody' si aucune entrée n'est trouvée

      // Envoyer une réponse avec le texte et l'image
      res.send(`
        <h1>Coucou ${userName} !</h1>
        <img src="/img/memedev.jpg" alt="meme">
      `);
    });
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
