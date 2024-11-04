import { createRouter, createWebHistory } from "vue-router";
import ReservationForm from "../components/ReservationForm.vue";
import ReservationsList from "../components/ReservationsList.vue";

const routes = [
  {
    path: "/",
    name: "ReservationForm",
    component: ReservationForm,
  },
  {
    path: "/reservations",
    name: "ReservationsList",
    component: ReservationsList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
