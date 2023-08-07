<template>
  <div>
    <!-- Implementation of the clock using Quasar Time -->
    <q-time v-model="hora" mask="HH:mm" />

    <!-- Hour input field that syncs with the clock -->
    <q-input v-model="hora" label="Hora" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { usePacienteStore } from "../stores/pacienteStore";

const pacienteStore = usePacienteStore();

const hora = ref(formatDate(new Date(), "HH:mm"));

function formatDate(date, format) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  return format.replace("HH", hours).replace("mm", minutes);
}

const actualizarHora = () => {
  console.log("Hora en el componenteReloj:", hora.value);

  const [hours, minutes] = hora.value.split(":");
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  pacienteStore.actualizarHora(date);
};

watch(hora, actualizarHora);
</script>
