<template>
  <q-page v-if="dataLoaded">
    <q-toolbar>
      <q-toolbar-title>Perfil del Paciente</q-toolbar-title>
    </q-toolbar>

    <q-form @submit="updateProfile">
      <q-avatar>
        <img :src="pacienteStore.imagenUrl" />
        <q-input type="file" v-model="newImage" label="Cambiar imagen" />
      </q-avatar>

      <q-input v-model="pacienteStore.name" label="Nombre" />
      <q-input
        v-model="pacienteStore.birthdate"
        label="Fecha de nacimiento"
        type="date"
      />
      <q-input v-model="pacienteStore.address" label="Dirección" />
      <q-input v-model="pacienteStore.commune" label="Comuna" />
      <q-input v-model="pacienteStore.email" label="Correo" type="email" />
      <q-input
        v-model="pacienteStore.password"
        label="Contraseña"
        type="password"
      />

      <q-btn label="Actualizar" type="submit" color="primary" />
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usePacienteStore } from "../stores/pacienteStore";

const pacienteStore = usePacienteStore();

let dataLoaded = ref(false);
let newImage = ref(null);

onMounted(async () => {
  // Aquí puedes cargar cualquier dato adicional si es necesario
  // Por ejemplo, obtener la información actual del paciente desde Firebase
  // y asignarla a las propiedades correspondientes en `pacienteStore`.
  dataLoaded.value = true;
});

const updateProfile = async () => {
  await pacienteStore.updateProfile();
};
</script>

<style scoped>
.q-page {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.q-avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.q-input {
  margin-bottom: 20px;
}
</style>
