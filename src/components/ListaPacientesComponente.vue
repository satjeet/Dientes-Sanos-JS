<template>
  <div>
    <q-input v-model="searchTerm" placeholder="Buscar paciente..." />
    <q-table :rows="filteredPatients" :columns="columns" row-key="uid">
      <template v-slot:body="props">
        <q-tr :props="props" @click="loadCepilladoHistorial($event, props.row)">
          <q-td key="image" :props="props">
            <img
              :src="props.row.image"
              alt="Imagen del paciente"
              class="patient-image"
            />
          </q-td>
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="email" :props="props">{{ props.row.email }}</q-td>
        </q-tr>
      </template>
    </q-table>
    <div>
      <CepilladoHistorialComponent />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { QTable, QTh, QTr, QTd } from "quasar";
import { usePacienteStore } from "../stores/pacienteStore";
import CepilladoHistorialComponent from "./CepilladoHistorialComponent.vue";

const pacienteStore = usePacienteStore();
const searchTerm = ref("");

// Llama a obtenerPacientes cuando el componente se monte
onMounted(async () => {
  await pacienteStore.obtenerPacientes();
});

const columns = [
  {
    name: "image",
    label: "Imagen",
    field: "image",
    align: "left",
    sortable: false,
  },
  { name: "name", label: "Nombre", field: "name", align: "left" },
  { name: "email", label: "Email", field: "email", align: "left" },
];

const filteredPatients = computed(() => {
  if (pacienteStore.pacientes && searchTerm.value.trim() !== "") {
    return pacienteStore.pacientes.filter((paciente) =>
      paciente.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  } else {
    return pacienteStore.pacientes || []; // Asegúrate de que los pacientes estén disponibles
  }
});

async function loadCepilladoHistorial(evt, row) {
  pacienteStore.setSelectedPatient(row);
  await pacienteStore.obtenerHistorialCepilladosPorUid(row.uid);
}
</script>

<style scoped>
.patient-image {
  width: 50px;
  height: 50px;
}
</style>
