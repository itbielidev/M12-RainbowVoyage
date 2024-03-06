<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top" :class="{ 'bg-dark': !isScrolled, 'bg-white': isScrolled }">
    <a><img src="../../public/logo.png" width="50px">Aegis</a>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav mr-auto" style="list-style: none; display: inline-flex;">
        <li class="nav-item active">
          <a class="nav-link" href="#">
            <font-awesome-icon icon="user" class="fa-lg"/> PERFIL
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <font-awesome-icon icon="file" class="fa-lg"/> REGISTRARSE
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isScrolled = ref(false);

window.addEventListener('scroll', () => {
  isScrolled.value = window.scrollY > 0;
});
</script>

<style scoped>
.navbar a {
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  color: white;
}

.navbar a:hover {
  color: #6dd7a3; 
}

.navbar {
  transition: background-color 0.3s ease;
}

.bg-dark {
  background-color: transparent !important;
}

.bg-white {
  background-color: white !important;
}
</style>
