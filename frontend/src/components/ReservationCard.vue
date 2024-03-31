<template>
  <article class="w-100">
    <main class="content d-flex flex-column flex-md-row gap-3 w-100 p-3">
      <div class="w-25 img-box">
        <img src="/logo.png" alt="Reservation Photo" class="img-fluid" />
      </div>
      <div class="w-75 info-box">
        <h3 class="fw-bold">Orgullo patromonial</h3>
        <p>Titular: Nombre Apellidos</p>
        <p>Email: user@gmail.com</p>
        <div class="d-flex flex-column gap-5 flex-lg-row dates-price-box fw-bold">
          <p>12/06 - 18/06</p>
          <p>1200€</p>
        </div>
      </div>
    </main>
    <footer class="text-start text-lg-end px-3 py-2">
      <button class="button">Confirmar <font-awesome-icon icon="fa-solid fa-envelope" /></button>
    </footer>
  </article>
</template>
<style scoped>
article {
  font-family: 'Roboto', sans-serif;
  border: 2px solid rgb(217, 5, 148);
  border-radius: 10px;
}

.dates-price-box {
  color: rgb(217, 5, 148);
  font-family: 'Roboto Slab', serif;
  font-size: xx-large;
}

.button {
  font-family: 'Roboto Slab', serif;
  background-color: rgba(217, 5, 148, 1);
  color: white;
  margin-bottom: 10px;
  border-radius: 10px;
  width: max-content;
  font-size: 24px;
}

@media screen and (max-width: 568px) {
  .img-box,
  .info-box {
    width: 100%;
  }
}
</style>
