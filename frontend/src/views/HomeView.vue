<template>
  <Menu></Menu>
  <div class="image-container">
    <div class="header-filter"></div>
    <img src="../../public/metro.png" width="100%">
    <div class="text-container bg-dark">
      <h3>"Descubre destinos inclusivos con nuestra web para el colectivo LGTBIQ"</h3>
    </div>
  </div>
  <div class="info-container">
    <p>El colectivo LGTBIQ reúne a personas con orientaciones sexuales o identidades de género no convencionales. Han luchado por igualdad y visibilidad, enfrentando discriminación. Su historia está marcada por el activismo y avances legales. Siguen abogando por inclusión y respeto.</p>
  </div>
  <Ciudad></Ciudad>
</template>

<script setup lang="ts">
import Menu from "@/components/Menu.vue";
import Ciudad from "@/components/Ciudades.vue"
</script>

<style>
.image-container {
  position: relative;
  text-align: center;
}

img {
  width: 100%;
}

.text-container {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  padding: 30px;
}

h3 {
  font-size: 40px;
}

p {
  text-align: center;
  font-size: 36px;
  margin-top: 150px; 
  margin-left: 315px; /* Separación a los lados */
  margin-right: 315px; /* Separación a los lados */
}
</style>
