<template>
  <div>
    <q-uploader
      color="primary"
      v-model="imagenSeleccionada"
      accept=".jpg, .jpeg, .png"
      @add-file="onImagenSeleccionada"
    >
      <template #add-button>
        <q-icon name="cloud_upload" />
        <div>Haga clic para seleccionar una imagen</div>
      </template>
    </q-uploader>

    <div v-if="imagenSeleccionada">
      <img
        :src="imagenSeleccionada.url"
        alt="Imagen seleccionada"
        style="max-width: 100%"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const imagenSeleccionada = ref(null);

const onImagenSeleccionada = (file) => {
  // Asegurarnos de que solo muestre la última imagen seleccionada
  imagenSeleccionada.value = file[file.length - 1];
};
</script>
