<template>
  <div class="reservations-list">
    <h2>Mes réservations</h2>
    <div v-if="reservations.length">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Heure</th>
            <th>Nombre de personnes</th>
            <th>Numéro Carte</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reservation in reservations" :key="reservation.id">
            <td>{{ reservation.id }}</td>
            <td>{{ reservation.date }}</td>
            <td>{{ reservation.heure }}</td>
            <td>{{ reservation.nb_personnes }}</td>
            <td>{{ formatCardNumber(reservation.numero_carte) }}</td>
            <td>
              <button @click="cancelReservation(reservation.id)">
                Annuler
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>Aucune réservation trouvée.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReservationsList",
  data() {
    return {
      reservations: [],
      utilisateurId: 1,
    };
  },
  methods: {
    async fetchReservations() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/reservations/user/${this.utilisateurId}`
        );
        const data = await response.json();
        if (response.ok) {
          this.reservations = data;
        } else {
          alert(
            "Erreur lors de la récupération des réservations : " + data.message
          );
        }
      } catch (error) {
        console.error("Erreur:", error);
        alert("Erreur lors de la récupération des réservations.");
      }
    },
    async cancelReservation(id) {
      if (confirm("Voulez-vous vraiment annuler cette réservation ?")) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/reservations/${id}`,
            {
              method: "DELETE",
            }
          );
          const data = await response.json();
          if (response.ok) {
            alert(data.message);
            this.fetchReservations();
          } else {
            alert("Erreur lors de l'annulation : " + data.message);
          }
        } catch (error) {
          console.error("Erreur:", error);
          alert("Erreur lors de l'annulation de la réservation.");
        }
      }
    },
    formatCardNumber(cardNumber) {
      return "**** **** **** " + cardNumber.slice(-4);
    },
  },
  created() {
    this.fetchReservations();
  },
};
</script>

<style scoped>
.reservations-list {
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
}

.reservations-list h2 {
  text-align: center;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #42b983;
  color: white;
}

th,
td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
}

button {
  background-color: #e74c3c;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #c0392b;
}

.error {
  color: red;
  font-size: 0.9em;
}
</style>
