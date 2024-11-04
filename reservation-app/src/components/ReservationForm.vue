<template>
  <div class="reservation-form">
    <h2>Faire une réservation</h2>
    <form @submit.prevent="submitReservation">
      <div class="form-group">
        <label for="date">Date :</label>
        <input type="date" v-model="reservation.date" required />
        <span v-if="dateError" class="error">{{ dateError }}</span>
      </div>
      <div class="form-group">
        <label for="heure">Heure :</label>
        <input type="time" v-model="reservation.heure" required />
      </div>
      <div class="form-group">
        <label for="nbPersonnes">Nombre de personnes :</label>
        <input type="number" v-model="reservation.nbPersonnes" required />
        <span v-if="nbPersonnesError" class="error">{{ nbPersonnesError }}</span>
      </div>
      <div class="form-group">
        <label for="numeroCarte">Numéro Carte :</label>
        <input
          type="text"
          v-model="reservation.numeroCarte"
          @input="validateForm"
          maxlength="16"
          required
          placeholder="Entrez 16 chiffres"
        />
        <span v-if="cardError" class="error">{{ cardError }}</span>
      </div>
      <button type="submit" :disabled="!isFormValid">Réserver</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "ReservationForm",
  data() {
    return {
      reservation: {
        restaurantId: 1,
        utilisateurId: 1,
        date: "",
        heure: "",
        nbPersonnes: "",
        numeroCarte: "",
      },
      cardError: "",
      nbPersonnesError: "",
      dateError: "",
      isFormValid: false,
    };
  },
  methods: {
    validateForm() {
      const cardRegex = /^\d{16}$/;
      const today = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format

      // Validate card number
      if (this.reservation.numeroCarte === "") {
        this.cardError = "";
        this.isFormValid = false;
      } else if (!cardRegex.test(this.reservation.numeroCarte)) {
        this.cardError = "Le numéro de carte doit contenir exactement 16 chiffres.";
        this.isFormValid = false;
      } else {
        this.cardError = "";
      }

      // Validate number of persons
      if (this.reservation.nbPersonnes > 8) {
        this.nbPersonnesError = "Le nombre de personnes ne peut pas dépasser 8.";
        this.isFormValid = false;
      } else {
        this.nbPersonnesError = "";
      }

      // Validate reservation date
      if (this.reservation.date && this.reservation.date < today) {
        this.dateError = "La date de réservation ne peut pas être dans le passé.";
        this.isFormValid = false;
      } else {
        this.dateError = "";
      }

      // Set form validity based on all conditions
      this.isFormValid = !this.cardError && !this.nbPersonnesError && !this.dateError;
    },
    async submitReservation() {
      if (!this.isFormValid) {
        alert("Veuillez corriger les erreurs dans le formulaire avant de soumettre.");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/reservations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.reservation),
        });
        const data = await response.json();
        if (response.ok) {
          alert("Réservation confirmée avec l'ID: " + data.id);
          this.$router.push("/reservations");
        } else {
          alert("Erreur lors de la réservation : " + data.message);
        }
      } catch (error) {
        console.error("Erreur:", error);
        alert("Erreur lors de la réservation.");
      }
    },
  },
  watch: {
    "reservation.date": "validateForm",
    "reservation.heure": "validateForm",
    "reservation.nbPersonnes": "validateForm",
    "reservation.numeroCarte": "validateForm",
  },
};
</script>

<style scoped>
.reservation-form {
  max-width: 400px;
  margin: 0 auto;
  text-align: left;
}

.reservation-form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #35495e;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.error {
  color: red;
  font-size: 0.9em;
}

button {
  background-color: #42b983;
  color: white;
  padding: 10px;
  border: none;
  width: 100%;
  cursor: pointer;
}

button:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #35495e;
}
</style>
