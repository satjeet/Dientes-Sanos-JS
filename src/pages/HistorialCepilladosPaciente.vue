<template>
  <q-page v-if="dataLoaded">
    <q-btn
      @click="regresarAInicio"
      label="Regresar"
      color="secondary"
      class="regresar-btn"
    />
    <h3 class="title">Historial de cepillados</h3>
    <q-card v-for="(registro, index) in registros" :key="index" class="q-ma-md">
      <q-card-section>
        <div class="row">
          <q-img :src="registro.imagenUrl" class="col-4" />
          <div class="col-8">
            <div><strong>Fecha:</strong> {{ formatDate(registro.fecha) }}</div>
            <div><strong>Hora:</strong> {{ formatTime(registro.hora) }}</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
  <div v-else>Cargando...</div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { usePacienteStore } from "../stores/pacienteStore";
import { formatDate, formatTime } from "../utils/dateUtils";
import { useRouter } from "vue-router";

const pacienteStore = usePacienteStore();
const registros = computed(() => pacienteStore.registros);
const router = useRouter();

const dataLoaded = ref(false); // Estado para rastrear si los datos están cargados

onMounted(async () => {
  await pacienteStore.obtenerHistorialCepillados(); // Asume que esta es la función que carga los datos
  dataLoaded.value = true; // Actualiza el estado una vez que los datos estén cargados
});

const regresarAInicio = () => {
  router.push("/inicio");
};
</script>
<style scoped>
.title {
  text-align: center;
  font-size: calc(
    16px + 1vw
  ); /* Ajusta el tamaño en relación con el ancho de la pantalla */
}
.regresar-btn {
  margin-right: 10px;
}
</style>
