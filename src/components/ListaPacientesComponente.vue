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
      row-key="id"
      v-model:pagination="pagination"
      :rows-per-page-options="[5, 10, 15]"
    >
      <template v-slot:body-cell-imagen="props">
        <q-td :props="props">
          <img
            :src="props.row.imagenUrl"
            alt="Imagen del paciente"
            class="patient-image"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { usePacienteStore } from "../stores/pacienteStore";

const pacienteStore = usePacienteStore();
const searchTerm = ref("");
const filteredPatients = ref([...pacienteStore.pacientes]);

const columns = [
  { name: "nombre", label: "Nombre", align: "left", field: "nombre" },
  { name: "edad", label: "Edad", align: "left", field: "edad" },
  { name: "imagen", label: "Imagen", align: "left", field: "imagenUrl" },
  // Agrega más columnas según tus necesidades
];

const pagination = ref({
  rowsPerPage: 5,
  currentPage: 1,
});

function filterPatients() {
  if (searchTerm.value) {
    filteredPatients.value = pacienteStore.pacientes.filter((paciente) =>
      paciente.nombre.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  } else {
    filteredPatients.value = [...pacienteStore.pacientes];
  }
}
</script>

<style scoped>
.patient-image {
  width: 50px;
  height: 50px;
}
</style>
