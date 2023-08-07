<template>
  <div>
    <!-- Image Preview -->
    <div v-if="urlPreview">
      <img :src="urlPreview" alt="Image Preview" width="200" />
    </div>

    <q-uploader
      color="primary"
      v-model="imagenSeleccionada"
      accept=".jpg, .jpeg, .png"
      @added="handleImageAdd"
      @removed="handleImageRemoval"
      label="Haga clic para seleccionar una imagen"
    >
      <template #add-button>
        <q-icon name="cloud_upload" />
        <div>Haga clic para seleccionar una imagen</div>
      </template>
    </q-uploader>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from "vue";
import { usePacienteStore } from "../stores/pacienteStore";

const pacienteStore = usePacienteStore();
const imagenSeleccionada = ref(null);
const urlPreview = ref(null);

const handleImageAdd = (files) => {
  console.log("Files added:", files);
  imagenSeleccionada.value = files[0];
  pacienteStore.actualizarImagenFile(files[0]); // Actualizar el archivo en el store
};

const handleImageRemoval = () => {
  console.log("Image removed");
  imagenSeleccionada.value = null;
  pacienteStore.actualizarImagenFile(null); // Actualizar el archivo en el store
};

const stopWatch = watch(imagenSeleccionada, (newValue, oldValue) => {
  console.log("Watcher triggered");
  if (!newValue) {
    console.log("All images removed");
    urlPreview.value = null;
  } else {
    const url = URL.createObjectURL(newValue);
    console.log("Image selected:", url);
    urlPreview.value = url;
  }
});

onUnmounted(() => {
  stopWatch();
});
</script>
