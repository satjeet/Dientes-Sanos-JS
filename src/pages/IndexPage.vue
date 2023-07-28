<template>
  <q-page class="flex flex-center">
    <q-btn class="full-width" @click="goToRegisterBrushing"
      >Registrar Cepillado</q-btn
    >
    <q-btn class="full-width" @click="goToBrushingHistory"
      >Historial de Cepillado</q-btn
    >
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const goToRegisterBrushing = () => {
  router.push("/register-brushing");
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
