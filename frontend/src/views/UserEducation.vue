<script setup lang="ts">
import { ref } from "vue";
import coursesDescription from "../coursesDescription.json"

const courses = ref(coursesDescription)

const coursesName = ["Anti-phishing", "Autentificación de 2 factores (2FA)", "Contraseñas seguras", "Descargas piratas y webs maliciosas", "Evitar conexiones de Wi-Fi públicas", "Mesas Limpias", "Reporte de incidentes de seguridad", "Seguridad en la web"]

const courseImg = ["pishing.png", "user-password.png", "password.png", "pirata.png", "wifi.png", "mesasLimpias2.png", "Reporte-errores.png", "hhtp"]

</script>

<template>
  <h1 style="color: #3c4858; font-size: 2.5rem;">Formación usuarios</h1>
  <main class="courses">
    <section class="course" v-for="(value, key) in courses" :key="key">
      <img class="formation-image" :src="`/${value.image}`">
      <article class="formation">
        <h3>{{ key }}</h3>
        <p>{{ value.definicion }}</p>
      </article>
    </section>
  </main>
  <footer>
    <span>Logos</span>
  </footer>
</template>

<style scoped>
main.courses {
  display: flex;
  flex-direction: column;
  padding: 0 20rem;
}

section.course {
  display: flex;
  flex-direction: row;
}

article.formation {
  display: flex;
  flex-direction: column;
}

article.formation h3 {
  color: #6dd7a3;
  font-size: 1.4rem;
}

article.formation p {
  font-family: "Roboto", serif;
  font-weight: 300;
  overflow-wrap: break-word;
  word-break: break-word;
  font-size: 1.3rem;
  line-height: 2rem;
}

img.formation-image {
  height: 200px;
}

footer{
  background-color: black;
  color:white;
  height: 5rem;
  font-family: "Roboto", serif;
  font-weight:500;
  text-align: center;
padding: 1rem;
font-size: 2rem;
margin: 0px;
}
</style>