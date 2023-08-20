<template>
  <div>
    <q-btn color="negative" label="Cerrar Sesión" @click="logout" />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore.js";
import { auth } from "../firebase";

const userStore = useUserStore();
const router = useRouter();

function logout() {
  auth
    .signOut()
    .then(() => {
      userStore.resetUser();
      router.push({ path: "/" });
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
}
</script>

<style scoped>
/* Puedes agregar estilos específicos para el botón si lo deseas */
</style>
