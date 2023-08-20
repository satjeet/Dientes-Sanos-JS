<template>
  <div>
    <registrar-cepillado-usuario user />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/userStore";
import RegistrarCepilladoUsuario from "../components/RegistrarCepilladoUsuario.vue";

const userStore = useUserStore();
const user = userStore.user; // Asumiendo que tienes un getter 'user' en tu store.
</script>

<style scoped>
/* Tus estilos aquí */
</style>
