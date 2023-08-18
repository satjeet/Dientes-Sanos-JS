<template>
  <div class="inicio-sesion">
    <q-page>
      <q-toolbar>
        <q-btn icon="arrow_back" @click="goBack" />
        <q-toolbar-title> Inicio de Sesión </q-toolbar-title>
      </q-toolbar>
      <form @submit.prevent="iniciarSesion">
        <div class="formulario-container">
          <q-input v-model="email" label="Email" autocomplete="email" />
          <q-input
            v-model="password"
            label="Contraseña"
            type="password"
            autocomplete="password"
          />

          <q-btn label="Iniciar Sesión" @click="iniciarSesion" />
          <q-btn
            flat
            label="¿Olvidaste tu contraseña?"
            @click="navegarRecuperarContrasena"
          />
        </div>
      </form>
    </q-page>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useUserStore } from "../stores/userStore";

const email = ref("");
const password = ref("");
const userStore = useUserStore();
const router = useRouter();

const iniciarSesion = async () => {
  await userStore.loginUser(email.value, password.value);
};

const navegarRecuperarContrasena = () => {
  router.push("/recuperar-contrasena");
};

const goBack = () => {
  // Lógica para ir atrás, por ejemplo:
  router.go(-1);
};
</script>

<style scoped>
.inicio-sesion {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.formulario-container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}
</style>
