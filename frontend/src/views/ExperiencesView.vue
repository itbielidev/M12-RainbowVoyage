<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { useExperiences } from '@/composables/useExperiences'
import { useCitiesStore } from '@/stores/cities'
import { useSeoMeta } from '@unhead/vue'
import ProgressSpinner from 'primevue/progressspinner'
import ErrorMessages from '../components/ErrorMessages.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import Toast from 'primevue/toast'
import useCustomToast from '@/composables/useCustomToast'

const props = defineProps<{ cityName: string }>()
const items = ref([{ label: 'Home', route: '/' }, { label: 'Experiencias' }])

const {
  userIsLoggedIn,
  price_max,
  price_min,
  duration_max,
  duration_min,
  type,
  num_people_max,
  num_people_min
} = storeToRefs(useAuthStore())

const { getExperiences, experiences, isLoading, error, errorMessages } = useExperiences()

const { getCityByName, getDescriptionDetailByName, getCityCoverImgByName } = useCitiesStore()

const route = useRoute()
const router = useRouter()

const queries = ref({
  price_min: '600',
  price_max: '1500',
  num_people_min: '3',
  num_people_max: '10',
  type: 'all',
  duration_min: '3',
  duration_max: '5',
  ...route.query
})

const { showSuccessPreferences } = useCustomToast()

const preferencesButtonDisabled = ref<boolean>(false)

const checkConstraints = (min: string, max: string, tag: string) => {
  if (Number(min) > Number(max) || Number(max) < Number(min)) {
    switch (tag) {
      case 'price':
        queries.value.price_min = queries.value.price_max
        break
      case 'num_people':
        queries.value.num_people_min = queries.value.num_people_max
        break
      case 'duration':
        queries.value.duration_min = queries.value.duration_max
        break
    }
  }
}

watch(
  queries,
  async () => {
    await getExps()
    router.push({ query: queries.value })
  },
  { deep: true }
)

async function getExps() {
  const qs = new URLSearchParams(queries.value).toString()
  await getExperiences(getCityByName(props.cityName) as number, qs)
}

async function setPreferences() {
  //Setting the user stored preferences
  queries.value.duration_max = duration_max.value as string
  queries.value.duration_min = duration_min.value as string
  queries.value.num_people_max = num_people_max.value as string
  queries.value.num_people_min = num_people_min.value as string
  queries.value.type = type.value as string
  queries.value.price_min = price_min.value as string
  queries.value.price_max = price_max.value as string

  await getExps()

  showSuccessPreferences()

  preferencesButtonDisabled.value = true

  setTimeout(() => {
    preferencesButtonDisabled.value = false
  }, 4000)
}

onMounted(async () => {
  await getExps()
})

useSeoMeta({
  title: `Rainbow Voyage | Experiencias de ${props.cityName}`,
  description: `Experiencias de ${props.cityName}. ${getDescriptionDetailByName(props.cityName)} `,
  ogDescription: `Experiencias de ${props.cityName}. ${getDescriptionDetailByName(
    props.cityName
  )} `,
  ogTitle: `Rainbow Voyage | Experiencias de ${props.cityName}`,
  ogImage: '/logo.webp',
  twitterCard: 'summary_large_image'
})
</script>
<template>
  <NavBar></NavBar>
  <header class="container">
    <section class="cover-city">
      <img class="cover" :src="`/images/${getCityCoverImgByName(props.cityName, 1)}`" />
      <div class="title-box">
        <img class="title" src="/images/nextStop.webp" />
        <img class="title" :src="`/images/${getCityCoverImgByName(props.cityName, 2)}`" />
      </div>
    </section>
  </header>
  <body>
    <div class="container">
      <Toast></Toast>
      <!-- el div engloba todo menos el footer, asi el footer ocupa todo el ancho de pantalla -->
      <section class="filters container flex-wrap gap-2">
        <button type="button" class="btn btn-light">
          Participantes:
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="queries.num_people_min"
            @change="checkConstraints(queries.num_people_min, queries.num_people_max, 'num_people')"
          >
            <option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          -
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="queries.num_people_max"
            @change="checkConstraints(queries.num_people_min, queries.num_people_max, 'num_people')"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10" selected>10</option>
          </select>
        </button>
        <button type="button" class="btn btn-light">
          Precio:
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="queries.price_min"
            @change="checkConstraints(queries.price_min, queries.price_max, 'price')"
          >
            <option value="600" selected>600</option>
            <option value="700">700</option>
            <option value="800">800</option>
            <option value="900">900</option>
            <option value="1100">1100</option>
            <option value="1300">1300</option>
            <option value="1500">1500</option>
          </select>
          -
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="queries.price_max"
            @change="checkConstraints(queries.price_min, queries.price_max, 'price')"
          >
            <option value="600">600</option>
            <option value="700">700</option>
            <option value="800">800</option>
            <option value="900">900</option>
            <option value="1100">1100</option>
            <option value="1300">1300</option>
            <option value="1500" selected>1500</option>
          </select>
        </button>
        <button type="button" class="btn btn-light">
          Experiencias:
          <select class="form-select" aria-label="Default select example" v-model="queries.type">
            <option value="gastronomic">Gastronómica</option>
            <option value="cultural">Cultural</option>
            <option value="festive" selected>Festiva</option>
            <option value="all">Todas</option>
          </select>
        </button>
        <button type="button" class="btn btn-light">
          Duración:
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="queries.duration_min"
            @change="checkConstraints(queries.duration_min, queries.duration_max, 'duration')"
          >
            <option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          -
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="queries.duration_max"
            @change="checkConstraints(queries.duration_min, queries.duration_max, 'duration')"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5" selected>5</option>
          </select>
        </button>
        <button
          v-if="userIsLoggedIn"
          type="button"
          class="btn-preferences mt-3 align-self-center"
          value="Activar preferencias"
          @click="setPreferences"
          :disabled="preferencesButtonDisabled"
        >
          Activar tus filtros
        </button>
      </section>
      <main class="container">
        <section class="breadcrumbs-box">
          <BreadCrumbs :items="items"></BreadCrumbs>
        </section>
        <section class="experience-quote w-100 mb-3">
          <p class="display-5 w-100 city-quote">
            ❝{{ getDescriptionDetailByName(props.cityName) }}❞
          </p>
        </section>
        <section v-if="!isLoading && experiences && experiences.length > 0" class="our-experiences">
          <h2 class="title-our-experiences">Nuestras Experiencias</h2>
          <template v-for="experience in experiences" :key="experience.id">
            <RouterLink
              class="centered-link"
              :to="{
                name: 'experienceDetail',
                params: { experienceId: experience.id, cityName: props.cityName }
              }"
            >
              <article class="art-experience">
                <div class="img-article">
                  <img :src="`/images/${experience.images[0]}`" />
                </div>
                <div class="experience-description">
                  <h3 class="route-title">{{ experience.name }}</h3>
                  <span class="experience-length">{{ experience.duration }} dias</span>
                  <p class="experience-activities">
                    <strong>Actividades: </strong>{{ experience.descriptions[0] }}
                  </p>
                  <RouterLink
                    :to="{
                      name: 'experienceDetail',
                      params: { experienceId: experience.id, cityName: props.cityName }
                    }"
                    style="text-decoration: none; display: flex; align-self: flex-end"
                    ><button class="price">
                      <span
                        >Desde<br /><strong>{{ experience.price }}€</strong></span
                      >
                    </button></RouterLink
                  >
                </div>
              </article>
            </RouterLink>
          </template>
        </section>
        <section v-else-if="!error && isLoading" class="d-flex justify-content-center">
          <ProgressSpinner></ProgressSpinner>
        </section>
        <section v-else-if="error" class="d-flex justify-content-center">
          <ErrorMessages :messages="errorMessages"></ErrorMessages>
        </section>
        <section
          v-else-if="!error && !isLoading && experiences?.length === 0"
          class="d-flex justify-content-center"
        >
          <h3>No hay experiencias que coincidan con los filtros especificados.</h3>
        </section>
      </main>
    </div>
    <FooterComponent></FooterComponent>
  </body>
</template>
<style>
/*Tenemos que hacerlo de manera global para que se sobreescriban los estilos del componente Toast */
.p-toast .p-toast-message.p-toast-message-info {
  background: #d90594 !important;
  color: whitesmoke !important;
  font-weight: 600 !important;
}

.p-toast .p-toast-message.p-toast-message-info .p-toast-message-icon,
.p-toast .p-toast-message.p-toast-message-info .p-toast-icon-close {
  color: whitesmoke !important;
  font-weight: 600 !important;
}

.p-toast .p-toast-message .p-toast-message-content .p-toast-summary {
  font-weight: 600 !important;
}

.p-toast .p-toast-message.p-toast-message-info .p-toast-detail {
  color: whitesmoke !important;
  font-weight: 600 !important;
}

.p-toast .p-toast-message.p-toast-message-info .p-toast-icon-close:hover {
  background: #d90594 !important;
}
</style>

<style scoped>
* {
  font-family: Roboto;
}

.btn-preferences {
  background-color: rgba(217, 5, 148, 1);
  color: white;
  margin-bottom: 10px;
  border-radius: 12px;
  width: max-content;
  padding: 0.6rem 1rem;
}

.btn-preferences:disabled {
  background-color: #ed44b5;
}

.cover-city {
  position: relative;
  width: 100%;
}

.cover-city img.cover {
  height: 700px;
  width: 100%;
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
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}

.btn-light {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  gap: 6px;
}

main,
body {
  background-color: #eff2f4;
}

.breadcrumbs-box {
  margin-left: 0 !important;
  padding-left: 0 !important;
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

h2.title-our-experiences {
  padding-left: 5rem;
  font-weight: 400;
}

.centered-link {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: black;
}

article.art-experience {
  display: flex;
  align-self: center;
  margin-bottom: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  height: 15rem;
  border-top-right-radius: 3rem;
  border-bottom-right-radius: 3rem;
  border-top-left-radius: 3rem;
  border-bottom-left-radius: 3rem;
}

div.img-article {
  display: flex;
  flex: 1;
}

article.art-experience img {
  height: 100%;
  width: 100%;
  border-top-left-radius: 3rem;
  border-bottom-left-radius: 3rem;
}

.experience-description {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 2rem 2rem;
  flex: 2;
  border-top-right-radius: 3rem;
  border-bottom-right-radius: 3rem;
}

h3.route-title {
  color: #d90594;
  font-weight: 400;
}

.experience-description span,
.experience-description p {
  font-size: 1rem;
}

button.price {
  all: initial;
  font-family: Roboto;
  background-color: #d90594;
  color: white;
  text-align: center;
  border-radius: 9rem;
  display: flex;
  padding: 0.4rem;
  height: 3rem;
  width: 5rem;
  flex-direction: column;
  cursor: pointer;
  justify-content: center;
}

button.price:hover {
  background-color: #f66ac7;
}

/* Tablet */
@media (max-width: 994px) {
  section.cover-city {
    display: flex;
    align-items: center;
  }

  section.cover-city img.cover {
    height: 500px;
  }

  section.cover-city div.title-box {
    width: 80%;
    justify-items: center;
  }

  section.cover-city div.title-box img.title {
    width: 90%;
  }

  section.filters {
    display: grid;
    grid-template-columns: 2fr 2fr;
    grid-template-rows: 2fr 2fr;
    justify-content: center;
    padding: 1rem;
    align-items: center;
    gap: 2rem;
  }

  .experience-quote p {
    width: 800px;
    font-size: 1.7rem;
  }

  section.our-experiences {
    padding: 2rem;
  }

  h2.title-our-experiences {
    font-size: 1.6rem;
  }

  article.art-experience {
    flex-direction: column;
    height: auto;
  }

  article.art-experience img {
    border-top-left-radius: 3rem;
    border-top-right-radius: 3rem;
    border-bottom-left-radius: 0rem;
    border-bottom-right-radius: 0rem;
  }

  div.experience-description {
    width: auto;
    border-top-left-radius: 0rem;
    border-top-right-radius: 0rem;
    border-bottom-left-radius: 3rem;
    border-bottom-right-radius: 3rem;
  }

  div.experience-description p {
    font-size: 1 rem;
  }
}

/* Mobile */
@media (max-width: 607px) {
  article.art-experience {
    flex-direction: column;
    height: auto;
  }

  article.art-experience img {
    border-top-left-radius: 3rem;
    border-top-right-radius: 3rem;
    border-bottom-left-radius: 0rem;
    border-bottom-right-radius: 0rem;
  }

  div.experience-description {
    width: auto;
    border-top-left-radius: 0rem;
    border-top-right-radius: 0rem;
    border-bottom-left-radius: 3rem;
    border-bottom-right-radius: 3rem;
  }

  div.experience-description p {
    font-size: 1.1rem;
  }

  section.filters {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    justify-content: center;
    padding: 1rem;
    align-items: center;
    gap: 2rem;
  }
}

@media (min-width: 350px) {
  section.cover-city img.cover {
    height: 18rem;
  }
  img.title {
    height: 100%;
    margin: 0rem 0.5rem;
  }

  .btn-preferences {
    width: 100%;
  }

  p.city-quote {
    font-size: 1.6rem;
    margin: 1rem;
  }

  section.our-experiences {
    margin: 0;
    padding: 0;
  }

  h2.title-our-experiences {
    align-self: center;
    padding-left: 0%;
  }

  article.art-experience {
    width: 100%;
  }

  button.price {
    width: 8rem;
  }
}
</style>
