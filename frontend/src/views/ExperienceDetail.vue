<template>
  <div>
    <NavBar></NavBar>
    <div class="content">
      <h1 style="color: white">¡Bienvenido a Axel Hotel Barcelona, Tu Destino en Barcelona!</h1>
    </div>
    <DatesForm></DatesForm>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { onMounted } from 'vue'
import { useExperiences } from '@/composables/useExperiences'
import DatesForm from '@/components/DatesForm.vue'
const { getExperience, experience } = useExperiences()

const props = defineProps<{ experienceId: string }>()

onMounted(async () => {
  await getExperience(props.experienceId)
})
</script>

<style scoped>
.content {
  background-color: black;
  padding: 20px;
}
</style>
