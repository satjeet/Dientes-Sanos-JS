<template>
  <div>
    <!-- Implementación del calendario usando Quasar Date -->
    <q-date v-model="fecha" @input="actualizarFecha" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { usePacienteStore } from "../stores/pacienteStore";

const pacienteStore = usePacienteStore();
const fecha = ref(new Date()); // Fecha inicial seleccionada

const actualizarFecha = () => {
  pacienteStore.actualizarFecha(fecha.value);
};
</script>
