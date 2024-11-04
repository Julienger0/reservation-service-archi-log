const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

router.post("/reservations", reservationController.createReservation);
router.get(
  "/reservations/:reservationId",
  reservationController.getReservation
);
router.delete(
  "/reservations/:reservationId",
  reservationController.deleteReservation
);
router.get(
  "/reservations/user/:utilisateurId",
  reservationController.getReservationsByUser
);

module.exports = router;
