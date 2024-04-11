<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { useExperiences } from '@/composables/useExperiences'
import { useCitiesStore } from '@/stores/cities'
import { useSeoMeta } from '@unhead/vue'

const props = defineProps<{ cityName: string }>()

const { getExperiences, experiences } = useExperiences()

const { getCityByName, getDescriptionDetailByName, getCityCoverImgByName } = useCitiesStore()

const route = useRoute()
const router = useRouter()

const queries = ref({
  price_min: undefined,
  price_max: undefined,
  num_people_min: undefined,
  num_people_max: undefined,
  experience_type: undefined,
  duration_min: undefined,
  duration_max: undefined,
  ...route.query
})

watch(
  queries,
  async () => {
    await getExps()
    router.push({ query: queries.value })
  },
  { deep: true }
)

async function getExps() {
  //@ts-expect-error
  const qs = new URLSearchParams(queries.value).toString()
  await getExperiences(getCityByName(props.cityName) as number, qs)
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
  ogImage: '/logo.png',
  twitterCard: 'summary_large_image'
})
</script>
<template>
  <header>
    <NavBar></NavBar>
    <section class="cover-city">
      <img class="cover" :src="`/images/${getCityCoverImgByName(props.cityName, 1)}`" />
      <div class="title-box">
        <img class="title" src="/images/nextStop.png" />
        <img class="title" :src="`/images/${getCityCoverImgByName(props.cityName, 2)}`" />
      </div>
    </section>
  </header>
  <body>
    <section class="filters cotainer">
      <button type="button" class="btn btn-light"> Participantes: 
        <select class="form-select" aria-label="Default select example">
          <option selected>Mínimo</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        -
        <select class="form-select" aria-label="Default select example">
          <option selected>Maxímo</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </button>
      <button type="button" class="btn btn-light"> Precio:
        <select class="form-select" aria-label="Default select example">
          <option selected>Mínimo</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        -
        <select class="form-select" aria-label="Default select example">
          <option selected>Maxímo</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </button>
      <button type="button" class="btn btn-light">Experiencias:
        <select class="form-select" aria-label="Default select example">
          <option value="1">Gastronómica</option>
          <option value="2">Cultural</option>
          <option value="3">Festiva</option>
        </select>
      </button>
      <button type="button" class="btn btn-light">Duración:
        <select class="form-select" aria-label="Default select example">
          <option selected>Mínimo</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        -
        <select class="form-select" aria-label="Default select example">
          <option selected>Maxímo</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </button>
    </section>
    <main>
      <section class="experience-quote">
        <p>❝{{ getDescriptionDetailByName(props.cityName) }}❞</p>
      </section>
      <section class="our-experiences">
        <h2 class="title-our-experiences">Nuestras Experiencias</h2>

        <article class="art-experience" v-for="experience in experiences" :key="experience.id">
          <div class="img-article">
            <img :src="`/images/${experience.images[0]}`" />
          </div>
          <div class="experience-description">
            <h3 class="route-title">{{ experience.name }}</h3>
            <span class="experience-length">{{ experience.duration }} dias</span>
            <p><strong>Visitando: </strong>{{ experience.descriptions[0] }}</p>
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
      </section>
    </main>
    <FooterComponent></FooterComponent>
  </body>
</template>

<style scoped>
* {
  font-family: Roboto;
}
.cover-city {
  margin-top: 4rem;
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

.title {
  height: 8rem;
}

section.filters {
  background-color: black;
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.btn-light {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

main {
  background-color: rgb(203, 212, 219);
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

article.art-experience {
  display: flex;
  align-self: center;
  margin-bottom: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  height: 15rem;
}

div.img-article {
  display: flex;
  flex: 1;
}

article.art-experience img {
  height: 100%;
  width: 100%;
}

.experience-description {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 2rem 2rem;
  flex: 2;
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
  border-radius: 10px;
  display: flex;
  padding: 0.4rem;
  height: 3rem;
  width: 5rem;
  flex-direction: column;
  cursor: pointer;
}

/* Tablet */
@media (max-width: 768px) {
  section.cover-city {
    display: flex;
    align-items: center;
    margin-top: 5rem;
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
    font-size: 1.8rem;
  }

  div.experience-description {
    width: 200px;
  }
}

/* Mobile */
@media (max-width: 576px) {
  article.art-experience {
    flex-direction: column;
    height: auto;
  }

  div.experience-description {
    width: auto;
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
</style>
