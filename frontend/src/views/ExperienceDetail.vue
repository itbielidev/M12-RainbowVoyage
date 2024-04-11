<template>
  <div class="body">
    <NavBar></NavBar>
    <div class="content">
      <h1>¡Bienvenido a Axel Hotel Barcelona, Tu Destino en Barcelona!</h1>
    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-6">
          <p>¡Axel Hotel Barcelona, tu oasis de estilo, confort y diversión en el corazón de Barcelona!</p>
          <p>Nuestro hotel, ubicado en el emblemático barrio del Eixample, es mucho más que un lugar para alojarse; ¡es
            un destino en sí mismo! Con un enfoque único en la comunidad LGBTQ+, cada detalle refleja nuestra calidez y
            modernidad.</p>
          <p>Disfruta de lujosas habitaciones y suites, sumérgete en nuestra piscina en la azotea con vistas
            impresionantes, y explora la rica cultura y vida nocturna de Barcelona.</p>
          <p>¡Estamos aquí para hacer que tu estancia sea inolvidable, ya sea por negocios o por placer! ¡Únete a
            nosotros y descubre por qué somos un destino vibrante para todos!</p>
        </div>
        <div class="col-md-6">
          <!-- Carrusel de Fotos -->
          <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="../../public/images/detalleBarcelona/hotel.webp" class="d-block w-100 img-carousel"
                  alt="Slide 1">
              </div>
              <div class="carousel-item">
                <img src="../../public/images/detalleBarcelona/habitación.webp" class="d-block w-100 img-carousel"
                  alt="Slide 2">
              </div>
              <div class="carousel-item">
                <img src="../../public/images/detalleBarcelona/copas.webp" class="d-block w-100 img-carousel"
                  alt="Slide 3">
              </div>
              <div class="carousel-item">
                <img src="../../public/images/detalleBarcelona/piscina.webp" class="d-block w-100 img-carousel"
                  alt="Slide 3">
              </div>
              <div class="carousel-item">
                <img src="../../public/images/detalleBarcelona/spa.webp" class="d-block w-100 img-carousel"
                  alt="Slide 3">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true" style="color: transparent;"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true" style="color: transparent;"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div class="border rounded-5 d-flex justify-content-center align-items-center pack">
          <div>
            <h4 class="text-center fw-bold">Tu pack incluye</h4>
            <ul class="text-center" style="list-style-type: none;">
              <li style="font-size: 24px;">Asistencia a la llegada</li>
              <li style="font-size: 24px;">4 noches</li>
              <li style="font-size: 24px;">Todo incluido</li>
              <li style="font-size: 24px;">Teléfono de emergencias 24h/365días.</li>
              <li style="font-size: 24px;">REGALO:
                <ul style="list-style-type: none;">
                  <li style="font-size: 32px;">1 día de SPA</li>
                </ul>
              </li>
              <li style="font-size: 24px;">Rutas</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
    <DatesForm></DatesForm>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { onMounted } from 'vue'
import { useExperiences } from '@/composables/useExperiences'
import DatesForm from '@/components/DatesForm.vue'
const { getExperience, experience } = useExperiences()

const props = defineProps<{ experienceId: string }>()

onMounted(async () => {
  await getExperience(props.experienceId)
})
</script>

<style scoped>
.body {
  background-color: rgba(171, 184, 195, 0.19);
}

.content {
  background-color: black;
  padding: 20px;
}

h1 {
  color: white;
  text-align: center;
}

p {
  text-align: center;
  margin-top: 35px;
  font-size: 20px;
}

.img-carousel {
  height: 400px;
  /* Ajusta la altura deseada */
}

li {
  list-style-type: none;
  /* Quita los puntos de la lista */
  padding-left: 1em;
  /* Añade un poco de espacio a la izquierda para simular los puntos */
  position: relative;
}

/* Estilo para los puntos */
li::before {
  content: "\2022";
  color: #d90594;
  font-size: 1.2em;
  position: absolute;
  left: 0;
}

.pack {
  background-color: white;
  width: 35%;
}
</style>
