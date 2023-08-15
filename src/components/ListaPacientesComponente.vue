<template>
  <div class="patient-list-container">
    <div class="search-container">
      <q-input v-model="searchTerm" placeholder="Buscar paciente..." />
    </div>
    <div class="table-container">
      <q-table :rows="filteredPatients" :columns="columns" row-key="uid">
        <template v-slot:body="props">
          <q-tr
            :props="props"
            @click="loadCepilladoHistorial($event, props.row)"
          >
            <q-td key="image" :props="props" class="image-column">
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
    </div>
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
  width: 40px;
  height: 40px;
  border-radius: 20px;
}

.patient-list-container {
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

/* Estilo para el contenedor del campo de búsqueda */
.search-container {
  width: 100%;
  max-width: 400px; /* Puedes ajustar este valor según tus necesidades */
  margin-bottom: 20px;
  display: flex;
  justify-content: center; /* Centra el campo de búsqueda dentro del contenedor */
}

.table-container {
  overflow-x: auto; /* Permite el desplazamiento horizontal */
}

.image-column {
  display: table-cell; /* Asegura que se muestre en pantallas grandes */
}

q-td[key="email"] {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 600px) {
  q-input {
    font-size: 0.9rem;
    margin-bottom: 10px;
  }

  q-table {
    font-size: 0.8rem;
  }

  .patient-image {
    width: 30px;
    height: 30px;
  }

  .image-column {
    display: none; /* Oculta la columna de imágenes en pantallas pequeñas */
  }
}

@media (min-width: 601px) and (max-width: 1024px) {
  q-input {
    font-size: 1rem;
    margin-bottom: 15px;
  }

  q-table {
    font-size: 0.9rem;
  }
}

@media (min-width: 1025px) {
  q-input {
    font-size: 1.1rem;
    margin-bottom: 20px;
  }

  q-table {
    font-size: 1rem;
  }
}
</style>
