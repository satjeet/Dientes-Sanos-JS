<template>
  <div v-if="isLoading">Cargando...</div>
  <div v-else>
    <div class="q-pa-md">
      <h2>Registrar Cepillado</h2>
      <div class="q-mt-md">
        <q-file
          v-model="imagenFile"
          accept="image/*"
          capture="camera"
          outlined
          placeholder="Toma una foto de tu cepillado"
        />
        <q-btn
          :disable="!imagenFile"
          class="q-mt-md"
          color="primary"
          label="Registrar Cepillado"
          @click="registrarCepillado"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/userStore";
import { watchEffect } from "vue";
import { onMounted, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const imagenFile = ref(null);

const userStore = useUserStore();
const isLoading = ref(true);

isLoading.value = userStore.isLoading;

onMounted(async () => {
  await userStore.initialize(); // Suponiendo que 'initialize' es asíncrono
  console.log(
    "el contenido de user en registroCepillado después del montaje",
    userStore
  );
});

const user = userStore.user; // Asumiendo que tienes un getter 'user' en tu store.

const setFile = (event) => {
  imagenFile.value = event.target.files[0];
};

const registrarCepillado = async () => {
  const fechayhora = new Date();

  await userStore.agregarRegistroFotograficoUsuario(
    imagenFile.value,
    fechayhora
  );

  // Navega al historial de cepillados después de registrar.
  router.push("/historialCepillados"); // Asume que la ruta del historial es "/historial-de-cepillados".
};
</script>

<style scoped>
/* Aquí puedes ajustar aún más los estilos, pero dado que Quasar tiene sus propios estilos integrados, podría ser mínimo. */
</style>
