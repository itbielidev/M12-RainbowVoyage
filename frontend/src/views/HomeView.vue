<template>
  <div class="main">
    <NavBar></NavBar>
    <div class="image-container">
      <div class="header-filter"></div>
      <img src="/images/metro.webp" class="img-fluid" alt="Metro Image" />
      <div class="text-container">
        <h3>"Descubre destinos inclusivos con nuestra web para el colectivo LGTBIQ"</h3>
      </div>
    </div>
    <div class="info-container">
      <p>
        El colectivo LGTBIQ reúne a personas con orientaciones sexuales o identidades de género no
        normativas. Han luchado por igualdad y visibilidad, enfrentando discriminación. Su historia
        está marcada por el activismo y avances legales. Siguen abogando por inclusión y respeto.
      </p>
    </div>
    <CitiesList></CitiesList>
  </div>
  <FooterComponent></FooterComponent>
</template>
<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import CitiesList from '@/components/CitiesList.vue'
import FooterComponent from "@/components/FooterComponent.vue";
import { onMounted } from 'vue'
import { useCitiesStore } from '@/stores/cities'
import { useSeoMeta } from '@unhead/vue'

const { getAll: getCities } = useCitiesStore()

onMounted(async () => {
  await getCities()
})

useSeoMeta({
  title: 'Rainbow Voyage | Inicio',
  description:
    'Página principal de Rainbow Voyage donde se muestran los princiaples destinos a los que se pueden viajar',
  ogDescription:
    'Página principal de Rainbow Voyage donde se muestran los princiaples destinos a los que se pueden viajar',
  ogTitle: 'Rainbow Voyage | Inicio ',
  ogImage: '/logo.webp',
  twitterCard: 'summary_large_image'
})
</script>

<style scoped>
.main {
  background-color: rgba(171, 184, 195, 0.19);
}

body {
  overflow-x: hidden;
}

.info-container p {
  margin-left: 250px;
  margin-right: 250px;
  text-align: center;
  font-size: 25px;
}

.image-container {
  position: relative;
  text-align: center;
}

img {
  width: 74%;
}

.text-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  padding: 30px;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}

h3 {
  font-size: 40px;
}


@media (max-width: 768px) {
  .info-container p {
    font-size: 25px; /* Tamaño de fuente predeterminado */
  }

  h3{
    font-size: 20px;
  }
}

/* Media query para pantallas extra pequeñas (tamaño xs) */
@media screen and (max-width: 575.98px) {
  .info-container p {
    font-size: 18px; /* Reducir el tamaño de fuente para pantallas xs */
  }

  h3{
    font-size: 12px;
  }
}
</style>
