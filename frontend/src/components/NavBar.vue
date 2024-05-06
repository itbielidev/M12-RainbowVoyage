<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light menu">
    <div class="container">
      <RouterLink to="/" class="navbar-brand">
        <img src="/images/logo.webp" alt="Logo" class="logo" />
        <span class="navegador">INICIO</span>
      </RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarsExample07"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" style="color: #d90594"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarCollapse" :class="{ show: isMenuOpen }">
        <ul class="navbar-nav ms-auto">
          <li v-if="!userIsLoggedIn" class="nav-item">
            <button
              class="nav-link profile-button navegador"
              @click="open()"
              @mouseover="hoverButton = true"
              @mouseleave="hoverButton = false"
            >
              <font-awesome-icon icon="fa-solid fa-file" class="iconos"></font-awesome-icon>
              REGISTRO
            </button>
          </li>
          <li v-if="!userIsLoggedIn" class="nav-item">
            <button
              class="nav-link navegador"
              @mouseover="hoverButton = true"
              @mouseleave="hoverButton = false"
              @click="openLogin()"
            >
              <font-awesome-icon icon="fa-solid fa-user" class="iconos"></font-awesome-icon>
              INICIAR SESIÓN
            </button>
          </li>
          <li v-if="userIsLoggedIn" class="nav-item">
            <button
              class="nav-link"
              @mouseover="hoverButton = true"
              @mouseleave="hoverButton = false"
            ></button>
          </li>
          <li v-if="userIsLoggedIn" class="nav-item">
            <RouterLink :to="{ name: isAdmin ? 'admin' : 'profile' }">
              <button
                class="nav-link p-0"
                @mouseover="hoverButton = true"
                @mouseleave="hoverButton = false"
              >
                <span class="fw-bold navegador">PERFIL</span>
              </button>
            </RouterLink>
          </li>
          <li
            v-if="userIsLoggedIn"
            class="nav-item d-flex align-items-center gap-1 logout li-log-out"
            @click="logout()"
          >
            <span class="fw-bold log-out">CERRAR SESIÓN</span>
            <font-awesome-icon icon="fa-solid fa-power-off" />
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
const { logout } = useAuthStore()
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
</script>

<style>
.log-out {
  color: #d90594;
  font-size: 20px;
}

.li-log-out:hover {
  cursor: pointer;
  background-color: #ffb6c1;
  border-radius: 5px;
}

.fa-power-off {
  color: #d90594;
}

a {
  text-decoration: none !important;
}
.menu {
  height: 180px;
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
  height: 175px;
  width: auto;
  margin-top: 15px;
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

.nav-link:focus {
  color: #d90594;
}

.navegador {
  color: #d90594;
  font-weight: bolder;
  font-size: 20px;
  border: none;
  color: #d90594;
  border-radius: 5px;
}

.iconos,
.barraNav {
  color: #d90594;
}

.navbar-toggler {
  color: #d90594;
}

@media (max-width: 991.98px) {
  .navbar-brand {
    margin-right: 0;
  }

  .navbar-toggler {
    padding: 0.25rem 0.5rem; /* Reducir el padding del botón del toggler */
  }

  .navbar-nav .nav-item {
    display: block;
    margin-bottom: 5px; /* Reducir el margen inferior entre elementos */
  }

  .navbar-nav .nav-link {
    padding: 5px 8px; /* Reducir el padding de los enlaces */
  }

  .logo {
    height: 70px; /* Reducir el tamaño del logo */
  }

  .navegador {
    font-size: 13px; /* Reducir el tamaño de la tipografía del texto del menú */
  }

  .iconos {
    margin-right: 8px; /* Reducir el margen entre los iconos y el texto */
  }

  .menu {
    height: 200px;
  }

  .log-out,
  .li-log-out {
    font-size: 13px;
  }
}
</style>
