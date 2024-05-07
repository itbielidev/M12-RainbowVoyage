<script setup lang="ts">
import { useDates } from '@/composables/useDates'
import ProgressSpinner from 'primevue/progressspinner'
import ErrorMessages from './ErrorMessages.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import LoginModal from '@/components/LoginModal.vue'
import { useModal } from 'vue-final-modal'
import { ref } from 'vue'

const {
  monthsSelect,
  formData,
  formatDate,
  checkAvailableDates,
  datesAvailable,
  dateSelected,
  selectedDateId,
  isLoading,
  error,
  errorMessages
} = useDates()

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

const checkAvailabilty = () => {
  //MAYBE CHECK SOMETHING

  emit('reserve', selectedDateId.value, dateSelected.value, formData.value.numPeople)
}

const monthYearSelectorisDisabled = ref<boolean>(false)
const numPeopleSelectorisDisabled = ref<boolean>(false)

const { userIsLoggedIn } = storeToRefs(useAuthStore())
const props = defineProps<{ experienceId: string }>()
const emit = defineEmits<{
  reserve: [selectedDateId: number, selectedDate: string, numPeople: string]
}>()

function setSelectedDateId(event: any) {
  selectedDateId.value = Number(
    (event.target as HTMLSelectElement).options[(event.target as HTMLSelectElement).selectedIndex]
      .id
  )
}

function disableNumPeopleSelector() {
  //Block the selectors to not refecth other dates

  numPeopleSelectorisDisabled.value = true
}

function enableSelectors() {
  numPeopleSelectorisDisabled.value = false
  monthYearSelectorisDisabled.value = false
  datesAvailable.value = null
  formData.value.numPeople = '1'
  formData.value.dateSelected = ''
  selectedDateId.value = -1
}
</script>
<template>
  <section class="d-flex flex-column gap-2 justify-content-center align-items-center p-1">
    <div class="d-flex gap-1">
      <label class="me-1" for="months">Escoge el mes: </label>
      <select
        name="months"
        id="months"
        v-model="formData.selectedMonth"
        @change="checkAvailableDates(props.experienceId)"
        :disabled="monthYearSelectorisDisabled"
      >
        <optgroup>
          <option v-for="month in monthsSelect" :value="month" :key="month">{{ month }}</option>
        </optgroup>
      </select>
    </div>
    <section>
      <label class="me-1" for="numPeople">Indica el número de personas </label>
      <select
        name="numPeople"
        id="numPeople"
        v-model="formData.numPeople"
        @change="disableNumPeopleSelector(), checkAvailableDates(props.experienceId)"
        :disabled="numPeopleSelectorisDisabled"
      >
        <optgroup>
          <option v-for="num in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" :value="num" :key="num">
            {{ num }}
          </option>
        </optgroup>
      </select>
    </section>
    <section class="d-flex flex-column justify-content-center">
      <button @click="enableSelectors" class="button fw-bold px-2 py-2 mt-2" type="button">
        REINICIAR OPCIONES
      </button>
    </section>
    <section
      class="d-flex flex-column align-items-center justify-content-center"
      v-if="datesAvailable && datesAvailable.length > 0"
    >
      <label for="dates" class="fw-bold fs-5 mt-3"
        >Fechas disponibles para {{ formData.selectedMonth }}</label
      ><br />
      <select
        name="dates"
        id="dates"
        v-model="dateSelected"
        @change="setSelectedDateId($event)"
        class="mb-3"
      >
        <optgroup>
          <option
            v-for="date in datesAvailable"
            :value="`${formatDate(date.start_date)} - ${formatDate(date.end_date)}`"
            :key="date.id"
            :disabled="date.max_people - date.current_people < Number(formData.numPeople)"
            :id="date.id.toString()"
          >
            {{ formatDate(date.start_date) }} - {{ formatDate(date.end_date) }} ( plazas disponibles
            : {{ date.max_people - date.current_people }})
          </option>
        </optgroup>
      </select>
      <section
        class="d-flex flex-column justify-content-center align-items-center"
        v-if="dateSelected && dateSelected.length > 0"
      >
        <button
          v-if="userIsLoggedIn"
          @click="checkAvailabilty"
          class="button fw-bold mt-3 px-1 py-2"
          type="button"
        >
          REALIZAR RESERVA
        </button>
        <div v-else class="d-flex flex-column align-items-center justify-content-center gap-1">
          <p class="p-0 m-0 fw-bold fs-5 text-center">
            Tienes que iniciar sesión para poder hacer una reserva
          </p>
          <button @click="openLogin()" class="button fw-bold mt-1 px-1 py-2" type="button">
            INICIAR SESIÓN
          </button>
        </div>
      </section>
    </section>
    <section
      class="d-flex flex-column gap-2 justify-content-center align-items-center"
      v-else-if="isLoading"
    >
      Comprobando fechas para {{ formData.selectedMonth }}
      <ProgressSpinner />
    </section>
    <!-- <section v-else-if="!datesAvailable">Escoge fechas para empezar la reserva.</section> -->
    <section v-else-if="!datesAvailable || datesAvailable.length === 0">
      No hay fechas disponibles
    </section>

    <section v-else-if="!isLoading && error">
      <ErrorMessages :messages="errorMessages"></ErrorMessages>
    </section>
  </section>
</template>
<style scoped>
select {
  background-color: white;
  border: none;
  border: 2px solid #d90594;
  border-radius: 50px;
  padding: 1px 3px 1px 3px;
}

button {
  color: white;
  margin: 0 auto;
  width: 70%;
}

.button {
  border-radius: 5px;
  background-color: #d90594;
  border: none;
  width: fit-content;
  transition: all 0.3s ease-in-out;
}
</style>
