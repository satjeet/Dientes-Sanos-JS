<template>
  <div>
    <q-input
      v-model="searchTerm"
      placeholder="Buscar paciente..."
      @input="filterPatients"
    />
    <q-table
      :rows="filteredPatients"
      :columns="columns"
      row-key="name"
      v-model:pagination="pagination"
      :rows-per-page-options="[5, 10, 15]"
      @row-click="loadCepilladoHistorial"
    >
      <template v-slot:body-cell-image="props">
        <q-td :props="props">
          <img
            :src="props.row.image"
            alt="Imagen del paciente"
            class="patient-image"
          />
        </q-td>
      </template>
    </q-table>
    <div v-if="selectedPatient">
      <CepilladoHistorialComponent />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usePacienteStore } from "../stores/pacienteStore";
import CepilladoHistorialComponent from "./CepilladoHistorialComponent.vue";

const pacienteStore = usePacienteStore();
const searchTerm = ref("");
const filteredPatients = ref([]);
const selectedPatient = ref(null);

const columns = [
  { name: "name", label: "Nombre", align: "left", field: "name" },
  { name: "email", label: "Email", align: "left", field: "email" },
  { name: "image", label: "Imagen", align: "left", field: "image" },
];

const pagination = ref({
  rowsPerPage: 5,
  currentPage: 1,
});

function filterPatients() {
  if (searchTerm.value) {
    filteredPatients.value = pacienteStore.pacientes.filter((paciente) =>
      paciente.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  } else {
    filteredPatients.value = [...pacienteStore.pacientes];
  }
}

async function loadCepilladoHistorial(evt, row) {
  console.log("row: en lista pacientes componente", row);
  console.log("UID: en lista pacientes componente", row.uid);

  pacienteStore.setSelectedPatient(row);
  await pacienteStore.obtenerHistorialCepilladosPorUid(row.uid);
}

onMounted(() => {
  pacienteStore.obtenerPacientes();
  filteredPatients.value = [...pacienteStore.pacientes];
});

const components = { CepilladoHistorialComponent };
</script>

<style scoped>
.patient-image {
  width: 50px;
  height: 50px;
}
</style>
