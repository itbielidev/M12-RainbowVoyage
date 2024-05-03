<template>
  <section class="img-container">
    <h1>Error 404 - Sorry darlings</h1>
    <span>💅🏽</span>
    <img class="rupaul" src="../../public/images/shashay.gif" />
    <RouterLink
      :to="{ name: 'home'}"
      class="btn pink-button"
    >
      Start ur engines | Inicio
    </RouterLink>
  </section>
</template>
<style scoped>
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  overflow: hidden;
}

h1 {
  font-size: 3em;
  text-align: center;
  margin: 0;
  padding: 20px 0;
  background: linear-gradient(
    to right,
    violet,
    indigo,
    blue,
    green,
    rgb(201, 201, 18),
    orange,
    red
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  border-radius: 15px;
}

span {
  font-size: 3em;
}

img.rupaul {
  height: 500px;
  border-radius: 40px; /* Ajusta el valor según la curvatura deseada */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.pink-button {
  background-color: #d90594;
  padding: 0.6rem 1rem;
  border-radius: 4rem;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
}

.pink-button:hover {
  background-color: #f2a0d7;
}

.pink-button a {
  text-decoration: none;
}

@media (max-width: 994px) {
  img.rupaul{
    height: 25rem;
  }
}

@media (max-width: 701px) {
  img.rupaul{
    height: 15rem;
  }
  h1 {
    font-size: 2em;
  }
  span {
    font-size: 2em;
  }
  .pink-button {
    font-size: 1rem;
  }
}

@media (max-width: 504px) {
  img.rupaul{
    height: 13rem;
  }
  h1 {
    font-size: 2em;
  }
  span {
    font-size: 2em;
  }
  .pink-button {
    font-size: 1.5rem;
  }
}
</style>