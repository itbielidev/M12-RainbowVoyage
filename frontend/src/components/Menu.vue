<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark d-flex">
    <a class="navbar-brand" href="#"><img src="../../public/logo.png">Aegis</a>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <font-awesome-icon icon="fa-solid fa-user"/><a class="nav-link" href="#">PERFIL</a>
        </li>
        <li class="nav-item">
          <font-awesome-icon icon="fa-solid fa-file"/><a class="nav-link disabled" href="#">REGISTRARSE</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">

</script>

<style scoped>
img {
  width: 100px;
  height: 100px;
}

.navbar-brand {
  display: inline-flex; 
  align-items: center; 
  text-decoration: none; 
  color: inherit; 
}
</style>
