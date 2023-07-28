<template>
  <div class="home-paciente">
    <q-page>
      <q-toolbar>
        <q-toolbar-title> Bienvenido, {{ nombreUsuario }} </q-toolbar-title>
      </q-toolbar>

      <div class="botones-container">
        <q-btn
          class="boton"
          color="primary"
          v-ripple
          @click="navegarRegistroCepillado"
        >
          Registro de Cepillado
        </q-btn>
        <q-btn
          class="boton"
          color="primary"
          v-ripple
          @click="navegarHistorialCepillado"
        >
          Historial de Cepillado
        </q-btn>
      </div>
    </q-page>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const nombreUsuario = "Nombre del Paciente"; // Reemplazar con el nombre del usuario real

const navegarRegistroCepillado = () => {
  router.push("/RegistrarCepillado");
};

const navegarHistorialCepillado = () => {
  router.push("/historial-cepillado");
};
</script>

<style scoped>
.home-paciente {
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
