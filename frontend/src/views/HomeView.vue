<template>
  <Menu></Menu>
  <div class="image-container">
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
* {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}

.image-container {
  position: relative;
  text-align: center;
}

.text-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}

img {
  width: 100%;
  opacity: 0.7;
  filter: grayscale(10%);
}

h1, span {
  font-size: 36px;
}

span {
  font-size: 18px;
}
</style>
