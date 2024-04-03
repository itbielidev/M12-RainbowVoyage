<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import TripIcon from '@/components/icons/TripIcon.vue'
</script>
<template>
  <NavBar></NavBar>
  <main
    class="gap-2 d-flex flex-column justify-content-center text-center pt-3 container"
    style="margin-top: 6rem"
  >
    <h2>Mi perfil</h2>
    <!-- PERSONAL INFORMATION -->
    <section class="card border p-2 my-4 mx-5 d-flex text-start">
      <div class="card-header border-bottom" style="background-color: white">
        <h4 class="card-header-title">Información Personal</h4>
      </div>
      <div class="card-body">
        <form class="row g-3">
          <!-- name -->
          <div class="col-md-6">
            <label class="form-label">
              Nombre
              <span class="text-danger">*</span>
            </label>
            <input type="text" class="form-control" placeholder="Introduce tu nombre " />
          </div>
          <!-- surnames -->
          <div class="col-md-6">
            <label class="form-label"
              >Apellidos
              <span class="text-danger">*</span>
            </label>
            <input type="text" class="form-control" placeholder="Introduce tus apellidos" />
          </div>
          <!-- phone -->
          <div class="col-md-6">
            <label class="form-label">
              Teléfono
              <span class="text-danger">*</span>
            </label>
            <input type="phone" class="form-control" placeholder="Introduce tu nº teléfono" />
          </div>
          <!-- mail -->
          <div class="col-md-6">
            <label class="form-label">
              Email
              <span class="text-danger">*</span>
            </label>
            <input type="email" class="form-control" placeholder="Introduce tu email" />
          </div>
          <!-- address -->
          <div class="col-md-12">
            <label class="form-label">
              Dirección
              <span class="text-danger">*</span>
            </label>
            <input type="text" class="form-control" placeholder="calle número población" />
          </div>
          <div class="col-12 text-end">
            <a href="#" class="btn pink-button">Guardar</a>
          </div>
        </form>
      </div>
    </section>
    <!-- UPDATE EMAIL -->
    <section class="card border p-2 my-4 mx-5 d-flex text-start">
      <div class="card-header border-bottom" style="background-color: white">
        <h4 class="card-header-title">Actualizar Email</h4>
      </div>
      <div class="card-body">
        <form>
          <label class="form-label"> Nuevo email </label>
          <input type="email" class="form-control" placeholder="Introduce tu nuevo email" />
          <div class="text-end mt-3">
            <a href="#" class="btn pink-button">Guardar</a>
          </div>
        </form>
      </div>
    </section>
    <!-- UPDATE PASSWORD  -->
    <section class="card border p-2 my-4 mx-5 d-flex text-start">
      <div class="card-header border-bottom" style="background-color: white">
        <h4 class="card-header-title">Actualizar Contraseña</h4>
      </div>
      <div class="card-body">
        <form>
          <label class="form-label"> Contraseña nueva </label>
          <input type="email" class="form-control" placeholder="Introduce tu nueva contraseña" />
          <div class="text-end mt-3">
            <a href="#" class="btn pink-button">Guardar</a>
          </div>
        </form>
      </div>
    </section>
    <!-- BOOKINGS -->
    <section class="card border p-2 my-4 mx-5 d-flex text-start">
      <div class="card-header border-bottom" style="background-color: white">
        <h4 class="card-header-title">Mis Reservas</h4>
      </div>
      <!-- BOOKING -->
      <div class="card-body">
        <div class="card border mb-4">
          <div
            class="card-header border-bottom d-md-flex justify-content-md-between align-items-center"
          >
            <div class="d-flex align-items-center">
              <div class="bg-light rounded-circle flex-shrink-0">
                <TripIcon></TripIcon>
              </div>
              <div class="ms-2">
                <h6 class="ms-0">Barcelona - Málaga</h6>
                <ul class="small d-flex flex-column">
                  <li>Nº reserva: 54681</li>
                  <li>Experiencia: Orgullo Patrimonial</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="row g-3">
            <div class="col-sm-6 col-md-4">
              <span>Ida</span>
              <h6 class="mb-0">Martes 30 abril 9:00h</h6>
            </div>
            <div class="col-sm-6 col-md-4">
              <span>Vuelta</span>
              <h6 class="mb-0">Domingo 5 mayo 10:45h</h6>
            </div>
            <div class="col-md-4">
              <span>Reserva a nombre de: </span>
              <h6 class="mb-0">Pedro Torres</h6>
            </div>
          </div>
        </div>
      </div>
      <!-- end booking -->
    </section>
  </main>

  <FooterComponent></FooterComponent>
</template>
<style scoped>
* {
  font-family: 'Roboto';
}

.pink-button {
  background-color: #d90594;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  color: white;
}

.pink-button:hover {
  background-color: #f2a0d7;
}

.pink-button a {
  text-decoration: none;
}
</style>
