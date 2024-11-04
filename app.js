const express = require("express");
const app = express();
const reservationRoutes = require("./routes/reservationRoutes");
require("dotenv").config();
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use("/api", reservationRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(
    `Le service de réservation est en cours d'exécution sur le port ${PORT}`
  );
});
