<template>
  <q-page class="flex flex-center">
    Estoy en la index page
    <div v-if="userStore.name == null">
      <q-btn class="full-width" @click="goToRegisterBrushing"
        >Registrar Cepilladosssssssss</q-btn
      >
      <q-btn class="full-width" @click="goToBrushingHistory"
        >Historial de Cepillado</q-btn
      >
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore.js";
const router = useRouter();
const userStore = useUserStore();
const goToRegisterBrushing = () => {
  router.push("/RegistrarCepillado");
};

const goToBrushingHistory = () => {
  router.push("/brushing-history");
};
//import FormularioBienvenida from "../components/FormularioBienvenida.vue";
</script>

<style scoped>
.centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.full-width {
  width: 100%;
  margin-top: 10px;
}
</style>
