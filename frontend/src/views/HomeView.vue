<template>
  <div class="main">
    <NavBar></NavBar>
    <div class="image-container">
      <div class="header-filter"></div>
      <img
        :src="`/images/${closestCity?.images[3] || 'coverMadrid.webp'}`"
        class="img-fluid main-img"
      />
      <div class="text-container">
        <h3>"Descubre destinos inclusivos con nuestra web para el colectivo LGTBIQA+"</h3>
      </div>
    </div>
    <div class="info-container py-3">
      <p>
        El colectivo LGTBIQA+ reúne a personas con orientaciones sexuales o identidades de género no
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
import FooterComponent from '@/components/FooterComponent.vue'
import { onMounted, ref } from 'vue'
import { useCitiesStore } from '@/stores/cities'
import { useSeoMeta } from '@unhead/vue'
import { type City } from '@/types'

const { getAll: getCities, cities } = useCitiesStore()
const closestCity = ref<City | null>(null)

onMounted(async () => {
  await getCities()
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords
      findClosestCity(latitude, longitude)
    },
    (error) => {
      console.error('Error al obtener la ubicación actual:', error)
    }
  )
})

const findClosestCity = (userLat: number, userLon: number) => {
  if (!cities) return
  let closest = null
  let closestDistance = Infinity
  for (const city of cities) {
    const distance = calculateDistance(userLat, userLon, city.latitude, city.longitude)
    if (distance < closestDistance) {
      closest = city
      closestDistance = distance
    }
  }
  closestCity.value = closest
}

const calculateDistance = (userLat: number, userLon: number, cityLat: number, cityLon: number) => {
  const R = 6371 // Radio de la Tierra en kilómetros
  const dLat = ((cityLat - userLat) * Math.PI) / 180
  const dLon = ((cityLon - userLon) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(userLat) * Math.cos(cityLat) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c
  return distance
}

useSeoMeta({
  title: 'Rainbow Voyage | Inicio',
  description:
    'Página principal de Rainbow Voyage donde se muestran los princiaples destinos nacionales a los que se pueden viajar',
  ogDescription:
    'Página principal de Rainbow Voyage donde se muestran los princiaples destinos nacionales a los que se pueden viajar',
  ogTitle: 'Rainbow Voyage | Inicio ',
  ogImage: '/logo.webp',
  twitterCard: 'summary_large_image'
})
</script>

<style scoped>
.main {
  background-color: rgba(171, 184, 195, 0.18);
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

.main-img {
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
}

@media (max-width: 768px) {
  .info-container p {
    font-size: 25px; /* Tamaño de fuente predeterminado */
  }

  h3 {
    font-size: 20px;
  }
}

/* Media query para pantallas extra pequeñas (tamaño xs) */
@media screen and (max-width: 575.98px) {
  .main-img {
    width: 95%;
  }

  .text-container {
    width: 80%;
    
  }

  .text-container h3 {
    font-size: 1.2rem;
  }

  .info-container p {
    font-size: 18px; /* Reducir el tamaño de fuente para pantallas xs */
    margin-left: 0px;
    margin-right: 0px;
    padding: 1.2rem;
  }

  h3 {
    font-size: 12px;
  }

 }
</style>
