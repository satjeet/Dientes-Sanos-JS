<template>
  <div class="registro-usuario">
    <q-page>
      <q-toolbar>
        <q-btn icon="arrow_back" @click="goBack" />
        <q-toolbar-title> Registro de Usuario </q-toolbar-title>
      </q-toolbar>

      <form @submit.prevent="registrarUsuario">
        <div class="formulario-container">
          <q-input v-model="email" label="Email" autocomplete="email" />
          <q-input
            v-model="password"
            label="Contraseña"
            autocomplete="password"
            type="password"
          />
          <q-input v-model="name" label="Nombre" />
          <q-input
            v-model="fechaNacimiento"
            label="Fecha de Nacimiento"
            mask="date"
          />
          <q-input
            v-model="telefono"
            label="Teléfono de Contacto"
            mask="phone"
          />
          <!-- Botón de registro -->
          <q-btn label="Registrar" type="submit" color="blue" />
        </div>
      </form>
    </q-page>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useUserStore } from "../stores/userStore";
const router = useRouter();

const email = ref("");
const password = ref("");
const name = ref("");
const fechaNacimiento = ref("");
const telefono = ref("");
const userStore = useUserStore();

const registrarUsuario = async () => {
  try {
    await userStore.register(
      email.value,
      password.value,
      name.value,
      fechaNacimiento.value,
      telefono.value
    );

    // Redireccionar al usuario a /inicio
    router.push("/inicio");

    // Aquí puedes hacer algo después de que el registro sea exitoso, como redirigir al usuario a otra página o mostrar un mensaje
  } catch (error) {
    // Manejar el error, por ejemplo, mostrando un mensaje al usuario
    console.error("Error al registrar el usuario:", error.message);
  }
};

const goBack = () => {
  // Lógica para ir atrás, por ejemplo:
  router.go(-1);
};
</script>

<style scoped>
.registro-usuario {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.formulario-container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.boton {
  margin: 0 20px;
  width: calc(100% - 40px);
}
</style>
