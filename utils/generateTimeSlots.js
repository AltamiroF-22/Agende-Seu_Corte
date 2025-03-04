// Definição dos horários disponíveis
const startHour = 8
const endHour = 20
const interval = 45 // Gap de 45 minutos

// Função para gerar horários disponíveis
export default function generateTimeSlots() {
    const slots = []
    let current = new Date()
    current.setHours(startHour, 0, 0, 0)
  
    while (current.getHours() < endHour) {
      slots.push(current.toTimeString().slice(0, 5)) // Formata para HH:mm
      current.setMinutes(current.getMinutes() + interval)
    }
  
    return slots
}