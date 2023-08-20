<template>
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
</template>

<script setup>
import { ref } from "vue";

const imagenFile = ref(null);

const setFile = (event) => {
  imagenFile.value = event.target.files[0];
};

const registrarCepillado = async () => {
  const fecha = new Date().toLocaleDateString();
  const hora = new Date().toLocaleTimeString();

  await agregarRegistro(imagenFile.value, fecha, hora);
};
</script>

<style scoped>
/* Aquí puedes ajustar aún más los estilos, pero dado que Quasar tiene sus propios estilos integrados, podría ser mínimo. */
</style>
