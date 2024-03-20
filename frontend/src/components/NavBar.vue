<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light fixed-top navbar-pink">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="../../public/logo.png" alt="Logo" class="logo" />
        <span class="inicio">INICIO</span>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
        style="background: none; border: none"
      >
        <font-awesome-icon icon="fa-solid fa-bars" style="color: #d90594"></font-awesome-icon>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse" :class="{ show: isMenuOpen }">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <button
              class="nav-link profile-button register"
              @click="open()"
              @mouseover="hoverButton = true"
              @mouseleave="hoverButton = false"
            >
              <font-awesome-icon
                icon="fa-solid fa-file"
                class="icon"
                style="color: #d90594"
              ></font-awesome-icon>
              REGISTRO
            </button>
          </li>
          <li class="nav-item">
            <button
              class="nav-link profile-button"
              @mouseover="hoverButton = true"
              @mouseleave="hoverButton = false"
              @click="openLogin()"
            >
              <font-awesome-icon
                icon="fa-solid fa-user"
                class="icon"
                style="color: #d90594"
              ></font-awesome-icon>
              PERFIL
            </button>
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

<style scoped>
nav {
  height: 5rem;
}

.navbar-brand {
  display: flex;
  align-items: center;
  font-size: 18px;
}

.logo {
  width: 150px;
  height: 100px;
  margin-right: 10px;
}

.inicio {
  color: #d90594;
}

.profile-button {
  background-color: transparent;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.5s;
  color: #d90594;
}

.profile-button:hover {
  background-color: #ffb6c1;
}

.icon {
  color: #d90594;
}

.register {
  margin-right: 15px;
}

@media (max-width: 768px) {
  .navbar-brand {
    margin-right: auto;
  }

  .collapse.navbar-collapse {
    justify-content: center;
  }
}
</style>
