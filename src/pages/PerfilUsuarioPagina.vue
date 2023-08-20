<template>
  <q-page class="perfil-usuario">
    <!-- Botón para retroceder -->
    <q-btn
      dense
      flat
      round
      icon="arrow_back"
      class="q-mb-md"
      color="blue"
      @click="retroceder"
    />
    <div class="q-pa-md">
      <h2 class="text-h4 q-mb-md">Actualizar Datos</h2>
      <q-btn
        color="light-blue"
        label="Actualizar Perfil"
        @click="navegarActualizarPerfil"
      />
    </div>

    <div class="q-pa-md">
      <h2 class="text-h4 q-mb-md">Cerrar Sesión</h2>
      <CerrarSesion />
    </div>
  </q-page>
</template>

<script setup>
import ActualizarDatosUsuarioPagina from "../pages/ActualizarDatosUsuarioPagina.vue";
import CerrarSesion from "../components/CerrarSesion.vue";

import { useRouter } from "vue-router";

const router = useRouter();
const retroceder = () => {
  router.go(-1); // Esto hará que el navegador retroceda a la página anterior.
};
const navegarActualizarPerfil = () => {
  router.push("/actualizarperfil");
};
</script>

<style scoped>
.perfil-usuario {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>
