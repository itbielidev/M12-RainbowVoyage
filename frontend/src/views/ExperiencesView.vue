<script setup lang="ts">
import Menu from '@/components/Menu.vue'
</script>

<template>
  <header>
    <Menu></Menu>
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
        <p>❝ Barcelona es una ciudad cosmopolita, abierta, donde la cohesión social  es una realidad. ❞</p>
        </section>
        <section class="our-experiences">
            <h2>Nuestras Experiencias</h2>
            <article class="art-exprience">
                <div class="img-article"></div>
                <div>
                    <h3 class="route-title">Orgullo patrimonial</h3>
                    <span class="experience-lenght">5 dias</span>
                    <p><strong>Visitando: </strong></p>
                </div>
            </article>
            <article class="art-exprience">
                <div class="img-article"></div>
                <div>
                    <h3 class="route-title">Orgullo patrimonial</h3>
                    <span class="experience-lenght">5 dias</span>
                    <p><strong>Visitando: </strong></p>
                </div>
            </article>
            <article class="art-exprience">
                <div class="img-article"></div>
                <div>
                    <h3 class="route-title">Orgullo patrimonial</h3>
                    <span class="experience-lenght">5 dias</span>
                    <p><strong>Visitando: </strong></p>
                </div>
            </article>

        </section>
    </main>
    <footer style="background-color: #000000; opacity: 0.62; color: white;">
    <div class="container">
      <div class="row">
        <div class="col-md-4 mb-4">
          <p>CONTACTO</p>
          <div style="display: flex; flex-direction: column; align-items: center;">
            <p style="font-size: 20px; display: flex; align-items: center;">
              <font-awesome-icon icon="fa-solid fa-phone"
                style="color: #ffffff; font-size: 40px; margin-right: 20px;"></font-awesome-icon>
              <span>765 972 423</span>
            </p>
            <p style="font-size: 20px; display: flex; align-items: center;">
              <font-awesome-icon icon="fa-solid fa-envelope"
                style="color: #ffffff; font-size: 40px; margin-right: 20px;"></font-awesome-icon>
              <span>rainbow@gmail.com</span>
            </p>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <p>REDES SOCIALES</p>
          <div class="social-icons">
            <font-awesome-icon icon="fa-brands fa-facebook"
              style="color: #ffffff; font-size: 60px; margin-right: 20px;"></font-awesome-icon>
            <font-awesome-icon icon="fa-brands fa-twitter"
              style="color: #ffffff; font-size: 60px; margin-right: 20px;"></font-awesome-icon>
            <font-awesome-icon icon="fa-brands fa-instagram"
              style="color: #ffffff; font-size: 60px;"></font-awesome-icon>
          </div>
        </div>

        <div class="col-md-4 mb-4">
          <p>NEWSLETTER</p>
          <div class="text-center">
            <input type="text" style="margin-bottom: 5px;"><br>
            <button
              style="background-color: rgba(217, 5, 148, 1); color: white; margin-bottom: 10px; border-radius: 15px; width: 130px; font-size: 24px;">Enviar</button>
          </div>
        </div>
      </div>
    </div>
  </footer>
  </body>
</template>

<style scoped>
*{
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

.title{
    height: 8rem;
}

section.filters{
    background-color: black;
    height: 4rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.btn-light{
    display: flex;
    align-items: center;
    height: 2rem;
    width: 15%;
    justify-content: center;
    font-weight: bold;
}

main{
    background-color: rgb(203, 212, 219);
}

.experience-quote{
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

</style>
