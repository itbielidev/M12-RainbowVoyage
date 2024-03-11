<template>
  <div>
    <section>
      <h1>Cursos formativos</h1>
      <article class="article-container">
        <div class="image-container">
          <img src="../../public/Técnico.png" alt="Imagen" />
        </div>
        <div class="text-container">
          <p>CURSOS DE FORMACIÓN PARA USUARIOS</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab optio accusantium rem dolores
            eius facere cumque. Dicta perferendis ea maxime quod deleniti asperiores, recusandae quasi
            explicabo voluptatibus libero quaerat voluptate.
          </p>
        </div>
      </article>

      <article class="article-container">
        <div class="image-container">
          <img src="" width="50" alt="Imagen" />
        </div>
        <div class="text-container">
          <p>CURSOS DE FORMACIÓN PARA USUARIOS</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab optio accusantium rem dolores
            eius facere cumque. Dicta perferendis ea maxime quod deleniti asperiores, recusandae quasi
            explicabo voluptatibus libero quaerat voluptate.
          </p>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
h1 {
  text-align: center;
}

.article-container {
  display: grid;
  grid-template-columns: auto 1fr; /* La imagen ocupa el ancho automático y el texto ocupa el espacio restante */
  gap: 20px; /* Espacio entre la imagen y el texto */
  align-items: center;
}

.image-container img {
  max-width: 100px; /* Tamaño máximo para la imagen */
  width: 100%; /* Ajusta la imagen al contenedor */
  height: auto;
}
</style>
