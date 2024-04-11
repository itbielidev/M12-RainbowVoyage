<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <RouterLink to="/" class="navbar-brand">
        <img src="../../public/logo.png" alt="Logo" class="logo" />
        <span class="navegador">INICIO</span>
      </RouterLink>

      <button class="navbar-toggler" type="button" @click="toggleMenu" style="background: none; border: none">
        <font-awesome-icon icon="fa-solid fa-bars" class="barraNav"></font-awesome-icon>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse" :class="{ show: isMenuOpen }">
        <ul class="navbar-nav ms-auto">
          <li v-if="!userIsLoggedIn" class="nav-item">
            <button class="nav-link profile-button navegador" @click="open()" @mouseover="hoverButton = true"
              @mouseleave="hoverButton = false">
              <font-awesome-icon icon="fa-solid fa-file" class="iconos"></font-awesome-icon>
              REGISTRO
            </button>

          </li>
          <li v-if="!userIsLoggedIn" class="nav-item">
            <button class="nav-link navegador" @mouseover="hoverButton = true" @mouseleave="hoverButton = false"
              @click="openLogin()">
              <font-awesome-icon icon="fa-solid fa-user" class="iconos"></font-awesome-icon>
              INICIAR SESIÓN
            </button>
          </li>
          <li v-if="userIsLoggedIn" class="nav-item">
            <button class="nav-link" @mouseover="hoverButton = true" @mouseleave="hoverButton = false">
              <span class="fw-bold navegador">RESERVAS</span>
            </button>
          </li>
          <li v-if="userIsLoggedIn" class="nav-item">
            <RouterLink :to="{ name: isAdmin ? 'admin' : 'profile' }">
              <button class="nav-link" @mouseover="hoverButton = true" @mouseleave="hoverButton = false">
                <span class="fw-bold navegador">PERFIL</span>
              </button>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LoginModal from '@/components/LoginModal.vue'
import RegisterModal from '@/components/RegisterModal.vue'
const hoverButton = ref(false)
const isMenuOpen = ref(false)
import { useModal } from 'vue-final-modal'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const { userIsLoggedIn, isAdmin } = storeToRefs(useAuthStore())

const { open, close } = useModal({
  component: RegisterModal,
  attrs: {
    onConfirm() {
      close()
    },
    onCancel() {
      close()
    }
  }
})

const { open: openLogin, close: closeLogin } = useModal({
  component: LoginModal,
  attrs: {
    onConfirm() {
      closeLogin()
    },
    onCancel() {
      closeLogin()
    }
  }
})

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<style>
/* Agregar estilo para el contenedor de los enlaces */
nav {
  height: 100px;
}

.nav-link-container {
  display: flex;
  align-items: center;
}

.nav-link {
  background-color: transparent;
  border: none;
}

.navbar-nav .nav-item:not(:last-child) {
  margin-right: 10px;
}

.navbar-nav .nav-link.text-danger {
  padding: 0.5rem 0;
}

.logo {
  padding-top: 0px;
  height: 100px;
  width: auto;
}


.nav-link {
  background-color: transparent;
  border: none;
  padding: 5px 10px;
  outline: none; 
}

.nav-link:hover {
  background-color: #ffb6c1;
  border: none;
  color: #d90594;
  border-radius: 5px;
}

.navegador {
  color: #d90594;
  font-weight: bolder;
  font-size: 20px;
}

.iconos,
.barraNav {
  color: #d90594;
}

@media (max-width: 991.98px) {
  .navbar-nav .nav-item {
    display: block;
  }

  .navegador{
    font-size: 15px;
  }

  .navbar-brand {
    margin-right: 0;
  }

  .iconos {
    margin-right: 10px;
  }
}
</style>
