const Reservation = require("../models/reservationModel");
const reservationRepository = require("../repositories/reservationRepository");

exports.createReservation = async (req, res) => {
  try {
    const {
      restaurantId,
      utilisateurId,
      date,
      heure,
      nbPersonnes,
      numeroCarte,
    } = req.body;

    // Validation du numéro de carte : 16 chiffres
    const carteRegex = /^\d{16}$/;
    if (!carteRegex.test(numeroCarte)) {
      return res.status(400).json({
        message: "Le numéro de carte doit contenir exactement 16 chiffres.",
      });
    }

    const reservation = new Reservation(
      null,
      restaurantId,
      utilisateurId,
      date,
      heure,
      nbPersonnes,
      numeroCarte
    );

    const newReservation = await reservationRepository.create(reservation);

    res.status(201).json(newReservation);
  } catch (error) {
    console.error("Error in createReservation:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getReservation = async (req, res) => {
  try {
    const reservation = await reservationRepository.findById(
      req.params.reservationId
    );
    if (reservation) {
      res.json(reservation);
    } else {
    }
  } catch (error) {
    console.error("Error in getReservation:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    await reservationRepository.delete(req.params.reservationId);
    res.json({ message: "Réservation annulée avec succès" });
  } catch (error) {
    console.error("Error in deleteReservation:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getReservationsByUser = async (req, res) => {
  try {
    const reservations = await reservationRepository.findByUserId(
      req.params.utilisateurId
    );

    res.json(reservations);
  } catch (error) {
    console.error("Error in getReservationsByUser:", error);
    res.status(500).json({ message: error.message });
  }
};
