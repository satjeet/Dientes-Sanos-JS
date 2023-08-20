<template>
  <div class="menu-pie">
    <q-btn color="blue" class="menu-btn" label="Inicio" @click="accionInicio" />
    <q-btn
      color="blue"
      class="menu-btn"
      label="Alarmas"
      @click="accionAlarmas"
    />
    <q-btn
      color="blue"
      class="menu-btn"
      label="Historial"
      @click="accionHistorial"
    />
    <q-btn color="blue" class="menu-btn" label="Perfil" @click="accionPerfil" />
  </div>
</template>

<script setup>
import { ref, watchEffect, watch, onMounted, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";
import { QSpinner } from "quasar";

const router = useRouter();
const userEmail = ref(null);
const isLoading = ref(true);
const userStore = useUserStore();

onBeforeMount(() => {});
/*
onMounted(() => {
  if (userStore.user.email) {
    userEmail.value = userStore.user.email;
    isLoading.value = false;

    const userRole = userStore.user.role;
    console.log("Datos del userRole:", userRole);

    if (userRole === "Doctor") {
      router.push("/HomeDoc");
    }
    // Assuming you have a ref called 'dataLoaded'
    dataLoaded.value = true;
  } else {
    console.log("No hay usuario detectado.");
    // Handle case where there's no user email
  }
});

*/
watch(
  () => userStore.isUserSet.value,
  (newValue) => {
    console.log("isUserSet.value ha cambiado:", newValue);
    if (newValue) {
      console.log("Usuario detectado:", userEmail.value);
    } else {
      console.log("No hay usuario detectado.");
    }
  }
);

const accionInicio = () => {
  router.push("/perfil");
};

const accionAlarmas = () => {
  router.push("/perfil");
};

const accionHistorial = () => {
  router.push("/perfil");
};

const accionPerfil = () => {
  router.push("/perfil");
};
</script>

<style scoped>
.menu-pie {
  display: flex;
  width: 100%;
  background-color: blue;
}

.menu-btn {
  flex: 1;
  background-color: blue;
}
</style>
