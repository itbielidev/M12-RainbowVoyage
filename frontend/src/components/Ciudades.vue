<template>
    <Menu></Menu>
    <div class="image-container">
      <div class="header-filter"></div>
      <div class="row">
        <div class="column">
          <img src="../../public/Barcelona.png" width="100%">
        </div>
        <div class="column">
          <img src="../../public/image2.png" width="100%">
        </div>
      </div>
      <div class="row">
        <div class="column">
          <img src="../../public/image3.png" width="100%">
        </div>
        <div class="column">
          <img src="../../public/Malaga.png" width="100%">
        </div>
      </div>
      <div class="row center">
        <div class="column">
          <img src="../../public/GranCanarias.png" width="100%">
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import Menu from "@/components/Menu.vue";
  </script>
  
  <style>
  .image-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .column {
    flex: 1;
    padding: 10px;
  }
  
  .center {
    justify-content: center;
  }
  
  img {
    width: 100%;
  }
  </style>
  