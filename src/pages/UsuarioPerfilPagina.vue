<template>
  <q-page v-if="dataLoaded">
    <q-btn
      @click="goToHome"
      label="Regresar"
      color="secondary"
      class="regresar-btn"
      flat
      dense
      icon="arrow_back"
    />
    <q-toolbar>
      <q-toolbar-title>Perfil del Paciente</q-toolbar-title>
    </q-toolbar>

    <q-form @submit="updateProfile">
      <!-- Sección de Avatar -->
      <div class="avatar-section">
        <div v-if="urlPreview">
          <img :src="urlPreview" alt="Image Preview" width="100" />
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

      <!-- Resto del formulario -->
      <q-input v-model="user.name" label="Nombre" />
      <q-input
        v-model="user.birthdate"
        label="Fecha de nacimiento"
        type="date"
      />
      <q-input v-model="user.address" label="Dirección" />
      <q-input v-model="user.commune" label="Comuna" />
      <q-input v-model="user.email" label="Correo" type="email" />
      <q-input v-model="user.phone" label="Celular" />

      <q-btn label="Actualizar" type="submit" color="primary" />
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";
import defaultImage from "../assets/logo-adobe-express.svg";

const router = useRouter();
const userStore = useUserStore();
const user = userStore.user;

let dataLoaded = ref(false);
let imagenSeleccionada = ref(null);
const urlPreview = ref(defaultImage);

const handleImageAdd = (files) => {
  imagenSeleccionada.value = files[0];
  const url = URL.createObjectURL(files[0]);
  urlPreview.value = url;
};

const handleImageRemoval = () => {
  imagenSeleccionada.value = null;
  urlPreview.value = imagenSeleccionada.value || user.image || defaultImage;
};

onMounted(async () => {
  if (!dataLoaded.value) {
    await userStore.obtenerDatosUsuario();
    urlPreview.value = user.image || defaultImage;
    dataLoaded.value = true;
  }
});

watch(
  () => user.image,
  (newValue) => {
    if (newValue) {
      urlPreview.value = newValue;
    } else {
      urlPreview.value = defaultImage;
    }
  }
);

const goToHome = () => {
  router.push("/home");
};

const updateProfile = async () => {
  if (!userStore.user.uid) {
    console.error("UID is missing or null:", userStore.user.uid);
    return;
  }
  if (imagenSeleccionada.value) {
    console.log("valor imagen seleccionada:", imagenSeleccionada.value);
    await userStore
      .updateUserProfile(imagenSeleccionada.value)
      .then(router.push("/home"));
  }
  console.log("se fue por el save en el perfil");

  await userStore.saveUser(userStore.user);

  //router.push("/home");
};
</script>

<style scoped>
.regresar-btn {
  margin-right: 20px;
}
.q-page {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}
.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
.q-uploader {
  margin-top: 20px;
}
</style>
