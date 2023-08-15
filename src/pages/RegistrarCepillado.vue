<template>
  <div class="registrar-cepillado">
    <q-btn
      @click="regresarAInicio"
      label="Regresar"
      color="secondary"
      class="regresar-btn"
    />
    <h3>Registrar Cepillado</h3>
    <form @submit.prevent="guardarRegistro">
      <!-- Tus componentes aquí -->
      <!-- Calendario -->
      <div class="scale-down">
        <CalendarioComponente />
      </div>
      <!-- Reloj -->
      <div class="scale-down">
        <RelojComponente />
      </div>

      <!-- Imagen -->
      <ImagenVisualizacion />

      <q-btn type="submit" label="Guardar" color="primary" />
    </form>
  </div>
</template>

<script setup>
import CalendarioComponente from "../components/CalendarioComponente.vue";
import RelojComponente from "../components/RelojComponente.vue";
import ImagenVisualizacion from "../components/ImagenVisualizacion.vue";

import { usePacienteStore } from "../stores/pacienteStore";

import { useRouter } from "vue-router";

const router = useRouter();

const PacienteStore = usePacienteStore();
const regresarAInicio = () => {
  router.push("/Home"); // Asume que "/home" es la ruta del inicio del paciente
};

const guardarRegistro = async () => {
  // Lógica para guardar el registro en el store de Pinia y en Firebase
  try {
    /*const nuevoRegistro = {
      fecha: CalendarioComponente.fecha.value,
      hora: RelojComponente.hora.value,
      imagenUrl: ImagenVisualizacion.imagenSeleccionada.value,
    };
    */
    await PacienteStore.agregarRegistro().then(() => {
      // Redirige al usuario a la página de inicio después de guardar el registro
      router.push("/home");
    }); // Asumiendo que 'registros' es un array reactiva en el store de Pinia
    // Lógica para guardar en Firebase (no se proporciona aquí, ya que depende de la implementación específica)
    // Redirige al usuario a la página de inicio después de guardar el registro
  } catch (error) {
    console.error(error);
    // Notifica al usuario que ocurrió un error.
  }
};
</script>

<style>
.registrar-cepillado {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}
.scale-down {
  transform: scale(0.8);
}
.regresar-btn {
  margin-right: 10px;
}
</style>
