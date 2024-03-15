<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light fixed-top">
    <a class="navbar-brand" href="#">
      <img src="../../public/logo.png" alt="Logo" class="logo">
      <span class="inicio">INICIO</span>
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarCollapse">
      <ul class="navbar-nav">
        <li class="nav-item">
          <button class="nav-link profile-button register" @mouseover="hoverButton = true" @mouseleave="hoverButton = false">
            <font-awesome-icon icon="fa-solid fa-file" class="icon"></font-awesome-icon> REGISTRO
          </button>
        </li>
        <li class="nav-item">
          <button class="nav-link profile-button" @mouseover="hoverButton = true" @mouseleave="hoverButton = false">
            <font-awesome-icon icon="fa-solid fa-user" class="icon"></font-awesome-icon> PERFIL
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const hoverButton = ref(false);
</script>

<style scoped>
.navbar-brand {
  display: flex;
  align-items: center;
  font-size: 18px;
}

.logo {
  width: 150px;
  height: 100px;
  margin-right: 10px; /* Adjust as needed */
}

.inicio {
  color: #D90594; /* Color rosa */
}

.profile-button {
  background-color: #D90594; /* Color rosa */
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.5s;
  color: white;
}

.profile-button:hover {
  background-color: #FFB6C1;
}

.icon {
  color: white;
}

.register {
  margin-right: 15px;
}

@media (max-width: 768px) {
  .navbar-brand {
    margin-right: auto;
  }

  .collapse.navbar-collapse {
    justify-content: center;
  }
}
</style>
