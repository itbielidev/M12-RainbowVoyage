<template>
  <div>
    <NavBar></NavBar>
    <div class="content">
      <h1 style="color: white">¡Bienvenido a Axel Hotel Barcelona, Tu Destino en Barcelona!</h1>
    </div>
    <DatesForm :experienceId="props.experienceId" @reserve="openModal"></DatesForm>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { onMounted, ref } from 'vue'
import { useExperiences } from '@/composables/useExperiences'
import DatesForm from '@/components/DatesForm.vue'
import GoToReservationFormModal from '@/components/GoToReservationFormModal.vue'
import { useModal } from 'vue-final-modal'
import { useRouter } from 'vue-router'

const { getExperience, experience } = useExperiences()
const router = useRouter()
const props = defineProps<{ experienceId: string }>()

const dateId = ref<number>(-1)
const date = ref<string>('')
const people = ref<string>('')

onMounted(async () => {
  await getExperience(props.experienceId)
})

function openModal(selectedDateId: number, dateSelected: string, numPeople: string) {
  dateId.value = selectedDateId
  date.value = dateSelected
  people.value = numPeople
  open()
}

function goToReservationForm() {
  router.push({
    name: 'reservation',
    query: {
      experienceName: experience.value?.name,
      experienceId: props.experienceId,
      dateId: dateId.value,
      date: date.value,
      image: experience.value?.images[0],
      people: people.value
    }
  })
}

const { open, close } = useModal({
  component: GoToReservationFormModal,
  attrs: {
    onConfirm() {
      close()
      goToReservationForm()
    },
    onCancel() {
      close()
    }
  }
})
</script>

<style scoped>
.content {
  background-color: black;
  padding: 20px;
}
</style>
