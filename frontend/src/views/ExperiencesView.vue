<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <NavBar></NavBar>
    <section class="cover-city">
      <img class="cover" src="/bcn-cover.jpeg" />
      <div class="title-box">
        <img class="title" src="/nextStop.png" />
        <img class="title" src="/barcelonaTitle.png" />
      </div>
    </section>
  </header>
  <body>
    <section class="filters">
      <button type="button" class="btn btn-light">Precio</button>
      <button type="button" class="btn btn-light">Participantes</button>
      <button type="button" class="btn btn-light">Experiencias</button>
      <button type="button" class="btn btn-light">Duración</button>
    </section>
    <main>
      <section class="experience-quote">
        <p>
          ❝ Barcelona es una ciudad cosmopolita, abierta, donde la cohesión social es una realidad.
          ❞
        </p>
      </section>
      <section class="our-experiences">
        <h2 class="title-our-experineces">Nuestras Experiencias</h2>
        <article class="art-exprience">
          <div class="img-article">
            <img src="/pedrera-cover.jpg" />
          </div>
          <div class="experience-description">
            <h3 class="route-title">Orgullo patrimonial</h3>
            <span class="experience-length">5 dias</span>
            <p><strong>Visitando: </strong>Sagrada Familia, Casa Batlló, La Pedrera</p>
            <RouterLink to="/" style="text-decoration: none; display: flex; align-self: flex-end"
              ><button class="price">
                <span>Desde<br /><strong>799€</strong></span>
              </button></RouterLink
            >
          </div>
        </article>
        <article class="art-exprience">
          <div class="img-article">
            <img src="/crema-catalana.jpg" />
          </div>
          <div class="experience-description">
            <h3 class="route-title">Sabores y Sonrisas</h3>
            <span class="experience-length">5 dias</span>
            <p><strong>Visitando: </strong>La Boqueria, Barri Gótic, tapas...</p>
            <RouterLink to="/" style="text-decoration: none; display: flex; align-self: flex-end"
              ><button class="price">
                <span>Desde<br /><strong>799€</strong></span>
              </button></RouterLink
            >
          </div>
        </article>
        <article class="art-exprience">
          <div class="img-article">
            <img src="/molino.jpg" />
          </div>
          <div class="experience-description">
            <h3 class="route-title">La noche es para mí</h3>
            <span class="experience-length">5 dias</span>
            <p><strong>Visitando: </strong>El Molino, Circuit, Candy Darling</p>
            <RouterLink to="/" style="text-decoration: none; display: flex; align-self: flex-end"
              ><button class="price">
                <span>Desde<br /><strong>799€</strong></span>
              </button></RouterLink
            >
          </div>
        </article>
      </section>
    </main>
    <FooterComponent></FooterComponent>
  </body>
</template>

<style scoped>
* {
  font-family: Roboto;
}
.cover-city {
  position: relative;
}

.cover-city img.cover {
  height: 700px;
  opacity: 0.5;
}

.title-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.title {
  height: 8rem;
}

section.filters {
  background-color: black;
  height: 4rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.btn-light {
  display: flex;
  align-items: center;
  height: 2rem;
  width: 15%;
  justify-content: center;
  font-weight: bold;
}

main {
  background-color: rgb(203, 212, 219);
}

.experience-quote {
  font-size: 2rem;
  font-weight: lighter;
  display: flex;
  justify-content: center;
}

.experience-quote p {
  width: 800px;
  text-align: center;
  margin-top: 2rem;
}

section.our-experiences {
  display: flex;
  flex-direction: column;
  gap: 2em;
}

h2.title-our-experineces {
  padding-left: 5rem;
  font-weight: 400;
}

article.art-exprience {
  display: flex;
  align-self: center;
  margin-bottom: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

article.art-exprience img {
  height: 15rem;
  width: 15rem;
}

.experience-description {
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 800px;
  padding: 2rem 2rem;
}

h3.route-title {
  color: #d90594;
  font-weight: 400;
}

.experience-description span,
.experience-description p {
  font-size: 1.2rem;
}

button.price {
  all: initial;
  font-family: Roboto;
  background-color: #d90594;
  color: white;
  text-align: center;
  border-radius: 10px;
  display: flex;
  padding: 0.4rem;
  height: 3rem;
  width: 5rem;
  flex-direction: column;
  font-size: rem;
}
</style>
