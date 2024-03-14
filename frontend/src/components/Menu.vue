<template>
  <nav class="navbar navbar-expand-md fixed-top d-flex w-100">
    <a class="navbar-brand logo" href="#"><img src="../../public/logo.png">Aegis</a>
    <div class="collapse navbar-collapse menu" id="navbarCollapse">
      <ul class="navbar-nav mr-auto">
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
.navbar{
  background-color: white;
}
.navbar-brand {
  font-size: 18px;
}

.logo{
  color: #D90594;
}

img {
  width: 150px;
  height: 100px;
  margin-left: 120px;
}

.menu {
  margin-left: 900px;
}

.navbar-brand {
  display: inline-flex; 
  align-items: center; 
  text-decoration: none; 
}

.profile-button {
  background-color: #D90594; 
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.5s; 
  color: white; 
}

.profile-button:hover{
  background-color: #FFB6C1;
}

.icon {
  color: white; 
}

.register{
  margin-right: 15px;
}
</style>
