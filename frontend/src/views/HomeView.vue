<template>
  <Menu></Menu>
  <div class="image-container">
    <div class="header-filter"></div>
    <img src="../../public/fondoImagenPrincipal.jpeg" width="100%">
    <div class="text-container">
      <h1>BIENVENIDO A AEGIS</h1>
      <span class="sub-title">Ciberseguridad para microempresas y autónomos</span>
    </div>
  </div>
  <Cursos></Cursos>
</template>

<script setup lang="ts">
import Menu from "@/components/Menu.vue";
import Cursos from "@/components/CursosFormación.vue"
</script>

<style>
.image-container {
  position: relative;
  text-align: center;
}

.header-filter {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
}

img {
  width: 100%;
}

.text-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center; 
}

h1,
span {
  font-size: 67px;
  font-family: "Roboto", sans-serif;
  line-height: 1.4;
}

span {
  font-size: 18px;
}
</style>
