<script setup lang="ts">
import { ref } from "vue";
import coursesDescription from "../coursesDescription.json"

const courses = ref(coursesDescription)

const coursesName = ["Anti-phishing","Autentificación de 2 factores (2FA)", "Contraseñas seguras", "Descargas piratas y webs maliciosas","Evitar conexiones de Wi-Fi públicas","Mesas Limpias","Reporte de incidentes de seguridad","Seguridad en la web"]

</script>

<template>
    <h1>Formación usuarios</h1>
    <main class="courses">
    <section class="course" v-for="(course, index) in courses" :key="index">
      <img :src="" alt="">
      <article>
        <h3>{{ coursesName[index] }}</h3>
        <p>{{ course.definicion }}</p>
      </article>
    </section>
  </main>    
</template>

<style scoped>
</style>