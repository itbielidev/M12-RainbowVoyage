<script setup lang="ts">
import Menu from "@/Components/Menu.vue";
</script>


<template>
  <div class="background-image">
    <Menu></Menu>
    <h1>BIENVENIDOS A AEGIS</h1>
   <p>Ciberseguridad para microempresas y autónomos</p>
  </div>
</template>

<style scoped>
.background-image {
  background-image: url('../../public/fondoImagenPrincipal.jpeg');
  background-size: cover;
  background-position: center;
  height: 90vh;
}
h1, p{
    color: white;
    text-align: center;
    font-size: 67px;
    font-family: Roboto,Helvetica,Arial,sans-serif;
}
p{
    font-size: 18px;
}
</style>
