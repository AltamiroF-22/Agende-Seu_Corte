<script setup>
import { ref, watch, onMounted  } from 'vue'
import { VSnackbar, VBtn } from 'vuetify/components' 
import axios from 'axios'

import addMinutes from '~/utils/addMinutes';
// Função para gerar horários disponíveis
import generateTimeSlots from '~/utils/generateTimeSlots';

const name = ref('')

// Estado para armazenar os horários ocupados para uma data específica
const bookedAppointments = ref([])

// Estado para armazenar a data e o horário selecionado
const selectedDate = ref(new Date().toISOString().split('T')[0]) // Data atual por padrão
const TODAY= ref(new Date().toISOString().split('T')[0])
const selectedTime = ref(null)



// Estado para o snackbar
const snackbar = ref(true)
const message = ref('Bem vindo!')
const snackbarColor = ref('green') // Cor do snackbar (pode ser 'green' ou 'red')



const timeSlots = ref(generateTimeSlots())

// Buscar horários ocupados do backend para a data selecionada
const fetchBookedAppointments = async () => {
  if (!selectedDate.value) return

  try {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/appointments?date=${selectedDate.value}`)
    bookedAppointments.value = data.map(app => app.time)
  } catch (error) {
    console.error('Erro ao buscar horários:', error)
  }
}

// Verifica se o horário já está ocupado
const isBooked = (time) => bookedAppointments.value.includes(time+':00')

// Marcar um agendamento
const bookAppointment = async () => {
  if (!selectedDate.value || !selectedTime.value) return

  if(!name.value){
    message.value = `Você precisa informar o seu nome!`
    snackbar.value = true
    snackbarColor.value = 'red'
    return
  }

  try {
    await axios.post('http://127.0.0.1:8000/api/appointments', {
      customer_name: name.value,
      date: selectedDate.value,
      time: selectedTime.value
    })

      // Exibir snackbar com a mensagem de sucesso
    message.value = `Agendamento confirmado para ${selectedTime.value} na data ${selectedDate.value}.`
    snackbar.value = true
    snackbarColor.value = 'green'
    name.value = ''
    fetchBookedAppointments() // Atualiza os horários ocupados
    selectedTime.value = null
  } catch (error) {
    message.value = error.response?.data?.error || "Erro ao agendar! Tente novamente."
    snackbarColor.value = 'red' // Cor vermelha para erro
    snackbar.value = true
  }
}



// Observa mudanças na data para buscar os horários ocupados automaticamente
watch(selectedDate, fetchBookedAppointments)

onMounted (()=> {
    fetchBookedAppointments();
})
</script>

<template>

<div class="absolute top-0 right-0">
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor" 
      top
      :timeout="3000"
    >
      {{ message }}
      <template #action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
 
  <div class="bg-gray-50 py-24 sm:py-32">
    <div class="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
      <h2 class="text-center text-3xl font-bold text-indigo-600 sm:text-4xl">
        Agende seu Corte
      </h2>

      <p class="mx-auto mt-2 max-w-xlg text-center text-2xl font-medium text-gray-700">
        Escolha a data e a hora para o seu corte
      </p>
     
  
      <div class="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-lg mx-auto my-7">
    <!-- Input de nome -->
    <div class="w-full">
      <label for="name" class="block text-sm font-medium text-gray-900 mb-1">
        Nome e sobrenome
      </label>
      <input
        v-model="name"
        type="text"
        name="name"
        autocomplete="given-name"
        class="border block w-full rounded-lg bg-white px-4 py-2 text-base text-gray-900 outline-none  ring-gray-300 placeholder-gray-400"
      />
    </div>

    <!-- Input de data -->
    <div class="w-full">
      <label for="date" class="block text-sm font-medium text-gray-900 mb-1">
        Selecione a data
      </label>
      <input
        type="date"
        :min="TODAY"
        v-model="selectedDate"
        class="border block w-full rounded-lg bg-white px-4 py-2 text-base text-gray-900 outline-none  ring-gray-300"
      />
    </div>
  </div>

      <div class="flex w-full items-center justify-center flex-col">
    

        <!-- Exibição dos horários -->
        <div v-if="selectedDate" class="grid grid-cols-3 md:grid-cols-4 gap-2">
          <button
            v-for="time in timeSlots"
            :key="time"
            :class="[
              'p-2 border rounded-lg text-center',
              isBooked(time)
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed opacity-50'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            ]"
            :disabled="isBooked(time)"
            @click="selectedTime = time"
          >
            {{ time }} - {{ addMinutes(time,45)}}
          </button>
        </div>

        <div v-if="selectedTime" class="mt-4">
          <p>Horário selecionado: <strong>{{ selectedTime }}</strong></p>
          <button
            class="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg"
            @click="bookAppointment"
          >
            Confirmar Agendamento ?
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
  text-align: center;
}
.v-snackbar{
    position: absolute;
    top: 0;
    right: 0;
}
</style>
