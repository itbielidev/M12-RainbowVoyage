<template>
    <div>
      <NavBar></NavBar>
      <div class="content">
        <h1 style="color: white;">¡Bienvenido a Axel Hotel Barcelona, Tu Destino en Barcelona!</h1>
      </div>
      <FooterComponent></FooterComponent>
    </div>
  </template>
  
  <script setup lang="ts">
  import NavBar from '@/components/NavBar.vue'
  import FooterComponent from '@/components/FooterComponent.vue';
  </script>
  
  <style scoped>
  .content {
    background-color: black;
    padding: 20px;
  }
  </style>
  