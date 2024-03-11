<template>
  <div class="capa">
    <section class="container">
      <h1>Cursos de formación</h1>
      <div class="image-text-container text-center">
        <div class="item">
          <img src="../../public/Técnico.png">
          <div class="text">
            <h4>CURSOS DE FORMACIÓN PARA TÉCNICOS</h4>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet possimus dicta fuga consequatur veniam consectetur rem hic dolores officia, aperiam quam minus, tempora laboriosam, natus recusandae a velit quas at!</p>
          </div>
        </div>
        <div class="item">
          <img src="../../public/Técnico.png">
          <div class="text">
            <h4>CURSOS DE FORMACIÓN PARA USUARIOS</h4>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet possimus dicta fuga consequatur veniam consectetur rem hic dolores officia, aperiam quam minus, tempora laboriosam, natus recusandae a velit quas at!</p>
          </div>
        </div>
      </div>
    </section>

    <section class="container">
      <h1>Nuestras formaciones</h1>
      
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.capa {
  background-color: white;
}

.image-text-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.item {
  display: flex;
  align-items: center;
  margin-bottom: 50px;
}

img {
  border-radius: 3px;
  width: 250px;
}

.text {
  margin-left: 20px;
}

h1 {
  text-align: center;
  color: #3c4858;
  font-weight: 700;
  font-size: 37px;
  font-family: "Roboto Slab", "Times New Roman", serif;
}

h4 {
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  font-size: 18px;
}
</style>
