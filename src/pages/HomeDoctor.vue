<template>
  <div class="home-doctor">
    <q-page>
      <q-toolbar>
        <q-toolbar-title> Bienvenido, Doctor </q-toolbar-title>
      </q-toolbar>

      <div class="botones-container">
        <q-btn
          class="boton"
          color="primary"
          v-ripple
          @click="navegarListaPacientes"
        >
          Ver Lista de Pacientes
        </q-btn>
      </div>
    </q-page>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const navegarListaPacientes = () => {
  router.push("/ListaPacientes"); // Ruta a la página con la lista de pacientes
};
</script>

<style scoped>
.home-doctor {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.botones-container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.boton {
  margin: 0 20px;
  width: calc(100% - 40px);
}
</style>
