export default function addMinutes(timeStr, minutes) {
    const [hours, mins] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, mins, 0, 0);  // Definindo a hora e minutos
    date.setMinutes(date.getMinutes() + minutes);  // Adicionando os minutos
  
    // Formatando a hora para "HH:mm"
    const newHours = String(date.getHours()).padStart(2, '0');
    const newMinutes = String(date.getMinutes()).padStart(2, '0');
    return `${newHours}:${newMinutes}`;
}
  