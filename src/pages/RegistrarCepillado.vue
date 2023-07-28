<template>
  <div class="registrar-cepillado">
    <h2>Registrar Cepillado</h2>

    <!-- Calendario -->
    <CalendarioComponente />

    <!-- Reloj -->
    <RelojComponente />

    <!-- Imagen -->
    <ImagenVisualizacion />

    <!-- Botón para guardar -->
    <q-btn @click="guardarRegistro" label="Guardar" color="primary" />
  </div>
</template>

<script setup>
import CalendarioComponente from "../components/CalendarioComponente.vue";
import RelojComponente from "../components/RelojComponente.vue";
import ImagenVisualizacion from "../components/ImagenVisualizacion.vue";

import { usePacienteStore } from "../stores/paciente";
const PacienteStore = usePacienteStore();

const guardarRegistro = () => {
  // Lógica para guardar el registro en el store de Pinia y en Firebase
  const nuevoRegistro = {
    fecha: CalendarioComponente.fecha.value,
    hora: RelojComponente.hora.value,
    imagenUrl: ImagenVisualizacion.imagenSeleccionada.value,
  };
  PacienteStore.registros.push(nuevoRegistro); // Asumiendo que 'registros' es un array reactiva en el store de Pinia
  // Lógica para guardar en Firebase (no se proporciona aquí, ya que depende de la implementación específica)
};
</script>

<style>
.registrar-cepillado {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}
</style>
