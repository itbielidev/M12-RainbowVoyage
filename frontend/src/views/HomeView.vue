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
        convencionales. Han luchado por igualdad y visibilidad, enfrentando discriminación. Su
        historia está marcada por el activismo y avances legales. Siguen abogando por inclusión y
        respeto.
      </p>
    </div>
    <CitiesList></CitiesList>
  </div>
  <footer style="background-color: #000000; opacity: 0.62; color: white">
    <div class="container">
      <div class="row">
        <div class="col-md-4 mb-4">
          <p class="text-center">CONTACTO</p>
          <div style="display: flex; flex-direction: column; align-items: center">
            <p style="font-size: 20px; display: flex; align-items: center">
              <font-awesome-icon
                icon="fa-solid fa-phone"
                style="color: #ffffff; font-size: 40px; margin-right: 20px"
              ></font-awesome-icon>
              <span>765 972 423</span>
            </p>
            <p style="font-size: 20px; display: flex; align-items: center">
              <font-awesome-icon
                icon="fa-solid fa-envelope"
                style="color: #ffffff; font-size: 40px; margin-right: 20px"
              ></font-awesome-icon>
              <span>rainbow@gmail.com</span>
            </p>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <p class="text-center">REDES SOCIALES</p>
          <div class="social-icons text-center">
            <font-awesome-icon
              icon="fa-brands fa-facebook"
              style="color: #ffffff; font-size: 60px; margin-right: 20px"
            ></font-awesome-icon>
            <font-awesome-icon
              icon="fa-brands fa-twitter"
              style="color: #ffffff; font-size: 60px; margin-right: 20px"
            ></font-awesome-icon>
            <font-awesome-icon
              icon="fa-brands fa-instagram"
              style="color: #ffffff; font-size: 60px"
            ></font-awesome-icon>
          </div>
        </div>

        <div class="col-md-4 mb-4">
          <p class="text-center">NEWSLETTER</p>
          <div class="text-center">
            <input type="text" style="margin-bottom: 5px" /><br />
            <button
              style="
                background-color: rgba(217, 5, 148, 1);
                color: white;
                margin-bottom: 10px;
                border-radius: 15px;
                width: 130px;
                font-size: 24px;
              "
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import CitiesList from '@/components/CitiesList.vue'
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
main {
  background-color: rgba(171, 184, 195, 0.19);
}
main{
  background-color: rgba(171, 184, 195, 0.19);
}
body {
  overflow-x: hidden;
}

.info-container p {
  margin-left: 20px;
  margin-right: 20px;
  /* Ajusta los valores de margin-left y margin-right según tus necesidades */
}

.image-container {
  position: relative;
  text-align: center;
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
  padding: 30px;
  background-color: rgba(0, 0, 0, 0.5);
  /* Fondo negro semitransparente */
  backdrop-filter: blur(10px);
  /* Efecto de desenfoque en el fondo */
}

h3 {
  font-size: 40px;
}

p {
  text-align: center;
  font-size: 35px;
}

/* Media queries para ajustar estilos en dispositivos móviles y tabletas */
@media (max-width: 768px) {
  .text-container {
    padding: 20px;
  }

  h3 {
    font-size: 30px;
  }
}

@media (max-width: 768px) {
  .info-container p {
    font-size: 25px; /* Tamaño de fuente predeterminado */
  }
}

/* Media query para pantallas extra pequeñas (tamaño xs) */
@media screen and (max-width: 575.98px) {
  .info-container p {
    font-size: 18px; /* Reducir el tamaño de fuente para pantallas xs */
  }
}
</style>
