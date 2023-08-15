<template>
  <q-page>
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
</template>

<script setup>
import { watch } from "vue";
import { usePacienteStore } from "../stores/pacienteStore";
import { computed } from "vue";
const pacienteStore = usePacienteStore();
import { formatDate, formatTime } from "../utils/dateUtils";

const registros = computed(() => pacienteStore.registros);
//const registros = pacienteStore.registros;
</script>
