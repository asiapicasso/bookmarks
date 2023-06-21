import sqlite3 from 'sqlite3';
import { open } from 'sqlite3';
import path from 'path';

/* const sqlite3 = require('sqlite3').verbose();
const path = require('path'); */

// Chemin vers le fichier de la base de données SQLite
const DB_PATH = 'database.sqlite';

/* async function initializeDatabase() {
  try {
    // Ouvrir la connexion à la base de données
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    // ... Vos fonctions pour interagir avec la base de données ...

    // Fermer la connexion à la base de données lorsque vous avez terminé
    await db.close();
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
  }
} */

// Créer une nouvelle instance de la base de données SQLite
/* const db = new sqlite3.Database(dbPath);
 */
// Fonction pour initialiser la base de données
/* function initializeDatabase() {
  // Créer la table de bookmarks
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS bookmarks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        label TEXT,
        url TEXT,
        tags TEXT
      )
    `);
  });
}  */
// Fonction pour ajouter un nouveau bookmark
export function addBookmark(bookmark, callback) {
  const db = new sqlite3.Database('database.sqlite', (err) => {
    if (err) {
      console.error(err.message);
      return;
    }

    const sql = `INSERT INTO favoris (label, url, tags) VALUES (?, ?, ?)`;
    const params = [bookmark.label, bookmark.url, bookmark.tags];

    db.run(sql, params, function (err) {
      if (err) {
        console.error(err.message);
        return;
      }

      // Récupérer l'ID du dernier enregistrement inséré
      const lastID = this.lastID;

      // Appeler le callback avec l'ID du dernier enregistrement
      if (typeof callback === 'function') {
        callback(lastID);
      }

      console.log('Nouveau bookmark ajouté avec succès. ID:', lastID);
    });

    db.close();
  });
}


// Fonction pour récupérer tous les bookmarks
export function getAllBookmarks(callback) {
  db.all('SELECT * FROM bookmarks', function(err, rows) {
    if (err) {
      console.error(err.message);
    } else {
      callback(rows);
    }
  });
}

/* export default initializeDatabase;
 */// Exporter les fonctions et la connexion à la base de données
/* module.exports = {
  db,
  initializeDatabase,
  addBookmark,
  getAllBookmarks 
};
 */