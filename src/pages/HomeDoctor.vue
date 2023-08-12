<template>
  <div class="home-doc-container">
    <q-btn class="toggle-button" @click="togglePatientList">
      {{ showPatientList ? "Regresar" : "Ver Lista de Pacientes" }}
    </q-btn>

    <div v-if="!showPatientList" class="home-doc-card">
      <q-card-section class="home-doc-header">
        <h2>Bienvenido Doctor</h2>
      </q-card-section>
      <q-card-section class="home-doc-content">
        <p>Accede a la información de tus pacientes y gestiona sus citas.</p>
      </q-card-section>
    </div>

    <div v-if="showPatientList">
      <PatientListComponent :pacientes="pacientesStore.pacientes" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { usePacienteStore } from "../stores/pacienteStore";
import PatientListComponent from "../components/ListaPacientesComponente.vue";

const pacientesStore = usePacienteStore();
const showPatientList = ref(false);

async function togglePatientList() {
  showPatientList.value = !showPatientList.value;
  if (showPatientList.value) {
    console.log("antes de llamar a obtener Pacientes");
    await pacientesStore.obtenerPacientes(); // Cargar los pacientes
    window.scrollTo(0, document.body.scrollHeight);
  }
}
</script>

<style scoped>
.home-doc-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e6f7ff; /* Color azul claro y tranquilizador */
}

.toggle-button {
  margin: 20px;
  background-color: #1890ff; /* Color azul principal */
  color: white;
}

.home-doc-card {
  width: 400px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 20px;
}

.home-doc-header {
  background-color: #1890ff; /* Color azul principal */
  color: white;
  padding: 20px;
  border-radius: 10px 10px 0 0;
}

.home-doc-content {
  padding: 20px;
}
</style>
