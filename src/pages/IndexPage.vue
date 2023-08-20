<template>
  <q-page class="flex flex-center page-container">
    <div class="welcome-container">
      <FormularioBienvenida />
    </div>
  </q-page>
</template>

<script setup>
import FormularioBienvenida from "../components/FormularioBienvenida.vue";
import { useUserStore } from "../stores/userStore.js";

const userStore = useUserStore();
console.log(userStore);
</script>

<style scoped>
.page-container {
  align-items: center;
  justify-content: center;
  padding: 20px; /* Margen alrededor del componente */
}

.welcome-container {
  width: 100%;
  max-width: 600px; /* Puedes ajustar este valor según tus necesidades */
  text-align: center;
  font-size: 1rem; /* Tamaño de fuente base, puedes ajustarlo según tus necesidades */
}

/* Estilos para diferentes tamaños de pantalla */
@media (max-width: 600px) {
  .welcome-container {
    font-size: 0.9rem; /* Tamaño de fuente más pequeño para dispositivos pequeños */
  }
}

@media (min-width: 1200px) {
  .welcome-container {
    font-size: 1.2rem; /* Tamaño de fuente más grande para dispositivos grandes */
  }
}
</style>
