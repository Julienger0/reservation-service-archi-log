class Reservation {
  /**
   * Constructeur de la classe Reservation.
   * @param {number|null} id - ID de la réservation (null lors de la création).
   * @param {number} restaurantId - ID du restaurant.
   * @param {number} utilisateurId - ID de l'utilisateur.
   * @param {string} date - Date de la réservation (format YYYY-MM-DD).
   * @param {string} heure - Heure de la réservation (format HH:MM).
   * @param {number} nbPersonnes - Nombre de personnes.
   * @param {string} numeroCarte - Numéro de carte (16 chiffres).
   */
  constructor(
    id,
    restaurantId,
    utilisateurId,
    date,
    heure,
    nbPersonnes,
    numeroCarte
  ) {
    this.id = id;
    this.restaurantId = restaurantId;
    this.utilisateurId = utilisateurId;
    this.date = date;
    this.heure = heure;
    this.nbPersonnes = nbPersonnes;
    this.numeroCarte = numeroCarte;
  }
}

module.exports = Reservation;
