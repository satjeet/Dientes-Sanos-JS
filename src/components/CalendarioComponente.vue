<template>
  <div>
    <!-- Implementación del calendario usando Quasar Date -->
    <q-date v-model="fecha" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const fecha = ref(new Date()); // Fecha inicial seleccionada
</script>
