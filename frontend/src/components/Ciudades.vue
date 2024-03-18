<template>
  <Menu></Menu>
  <div class="container">
    <div class="row">
      <div v-for="(city, index) in cities" :key="index" class="col-md-6 mb-3 position-relative text-center" style="overflow:hidden">
        <div class="text-container w-100" style="margin-top: -200px;" v-if="!city.hovered">
          <p class="m-0" style="color: black;">{{ city.name }}</p>
        </div>
        <img :src="city.image" class="img-fluid" :alt="city.alt" @mouseover="hoverCity(index, true)" @mouseout="hoverCity(index, false)">
        <div class="overlay">
          <p style="font-size: 20px;margin-left: 20px; margin-right: 20px;">{{ city.overlayText }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from "@/components/Menu.vue";

const cities = [
  { name: "BARCELONA", image: "../../public/Barcelona.png", alt: "Barcelona", overlayText: "Barcelona es conocida por su vibrante comunidad LGTBIQ, con eventos como el Barcelona Pride y una escena nocturna inclusiva que refleja su apoyo a la diversidad.", hovered: false },
  { name: "MADRID", image: "../../public/Madrid.png", alt: "Madrid", overlayText: "Madrid destaca como un epicentro LGTBIQ en España, con barrios como Chueca que celebran la diversidad con orgullo y eventos como el WorldPride, atrayendo a personas de todo el mundo.", hovered: false },
  { name: "IBIZA", image: "../../public/Ibiza.png", alt: "Ibiza", overlayText: "Ibiza ofrece un ambiente de apertura y aceptación, con fiestas inclusivas y espacios seguros para la comunidad LGTBIQ, convirtiéndola en un destino popular para personas de todas las orientaciones sexuales.", hovered: false },
  { name: "MÁLAGA", image: "../../public/Malaga.png", alt: "Malaga", overlayText: "Málaga ofrece una atmósfera cosmopolita y tolerante, con una escena LGTBIQ vibrante y eventos como el Festival Internacional de Cine LGTBIQ+ que promueven la inclusión y la diversidad en la ciudad.", hovered: false },
  { name: "GRAN CANARIAS", image: "../../public/GranCanarias.png", alt: "Gran Canarias",overlayText: "Gran Canaria es reconocida por su comunidad diversa y acogedora, especialmente en lugares como Maspalomas, que alberga eventos como el Maspalomas Gay Pride, atrayendo a visitantes de todas partes del mundo.", hovered: false }
];

const hoverCity = (index: number, hovered: boolean) => {
  cities[index].hovered = hovered;
};
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

.text-container {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

img {
  width: 100%;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Cambiamos el degradado por un color sólido con transparencia */
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay p {
  color: white;
  font-size: 20px;
}

.col-md-6:hover .overlay {
  opacity: 1;
}

.col-md-6:hover .text-container {
  display: none;
}
</style>
