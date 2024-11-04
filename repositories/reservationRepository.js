const db = require("../db/database");
const { encrypt, decrypt } = require("../utils/crypto");

class ReservationRepository {
  create(reservation) {
    return new Promise((resolve, reject) => {
      const encryptedCard = encrypt(reservation.numeroCarte);

      const query = `
        INSERT INTO reservations (restaurant_id, utilisateur_id, date, heure, nb_personnes, numero_carte)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const params = [
        reservation.restaurantId,
        reservation.utilisateurId,
        reservation.date,
        reservation.heure,
        reservation.nbPersonnes,
        encryptedCard, // Stocker le numéro de carte crypté
      ];

      db.run(query, params, function (err) {
        if (err) {
          console.error("Repository: Error inserting reservation:", err);
          return reject(err);
        }
        reservation.id = this.lastID;

        resolve(reservation);
      });
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM reservations WHERE id = ?", [id], (err, row) => {
        if (err) {
          console.error("Repository: Error fetching reservation by ID:", err);
          return reject(err);
        }
        if (row) {
          row.numero_carte = decrypt(row.numero_carte);
        }
        resolve(row);
      });
    });
  }

  findByUserId(utilisateurId) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM reservations WHERE utilisateur_id = ?";
      db.all(query, [utilisateurId], (err, rows) => {
        if (err) {
          console.error(
            "Repository: Error fetching reservations by user ID:",
            err
          );
          return reject(err);
        }

        const decryptedRows = rows.map((row) => {
          return {
            ...row,
            numero_carte: decrypt(row.numero_carte),
          };
        });
        resolve(decryptedRows);
      });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM reservations WHERE id = ?", [id], function (err) {
        if (err) {
          console.error("Repository: Error deleting reservation:", err);
          return reject(err);
        }
        resolve();
      });
    });
  }
}

module.exports = new ReservationRepository();
