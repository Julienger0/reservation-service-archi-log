<template>
  <div id="app">
    <nav>
      <router-link to="/">Faire une réservation</router-link>
      |
      <router-link to="/reservations">Mes réservations</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Styles globaux */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 50px;
}

nav {
  margin-bottom: 30px;
}

nav a {
  margin: 0 10px;
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
}

nav a.router-link-active {
  color: #35495e;
}
</style>
