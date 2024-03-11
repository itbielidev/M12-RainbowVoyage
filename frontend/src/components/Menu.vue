<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top d-flex w-100" :class="{ 'navbar-scrolled': scrolled }">
    <a class="navbar-brand logo" href="#"><img src="../../public/logo.png">Aegis</a>
    <div class="collapse navbar-collapse menu" id="navbarCollapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#"><font-awesome-icon icon="fa-solid fa-user" :class="{ 'icon-white': !scrolled }"></font-awesome-icon> PERFIL</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#"><font-awesome-icon icon="fa-solid fa-file" :class="{ 'icon-white': !scrolled }"></font-awesome-icon> REGISTRARSE</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const scrolled = ref(false);

window.addEventListener('scroll', () => {
  scrolled.value = window.scrollY > 0;
});
</script>

<style scoped>
.navbar {
  background-color: transparent; 
  font-family: "Roboto", sans-serif;
  color: white;
  background-color: transparent; 
  transition: background-color 0.3s ease-in-out; 
}

.navbar-brand {
  font-size: 18px;
}

img {
  width: 50px;
  height: 50px;
}

.logo {
  margin-left: 200px;
}

.menu {
  margin-left: 900px;
}

.navbar-brand {
  display: inline-flex; 
  align-items: center; 
  text-decoration: none; 
}

.navbar-scrolled {
  background-color: white; 
}

.icon {
  margin-right: 5px;
  color: black !important;  
}

.icon-white {
  color: white !important;
}

a:hover {
  color: #6dd7a3;
}

.navbar,
.navbar-scrolled .navbar-brand,
.navbar-scrolled .nav-link {
  color: black !important; 
}
</style>
