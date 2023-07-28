<template>
  <div>
    <!-- Implementación del reloj usando Quasar Time -->
    <q-time v-model="hora" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const hora = ref(new Date()); // Hora inicial seleccionada
</script>
