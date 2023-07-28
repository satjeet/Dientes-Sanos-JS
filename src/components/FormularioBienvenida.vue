<template>
  <div>
    <div class="bienvenida-container">
      <h1>Bienvenido</h1>
      <q-tabs v-model="tab" align="justify">
        <q-tab name="inicio-sesion" label="Iniciar Sesión" />
        <q-tab name="registro" label="Registrarse" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="inicio-sesion">
          <h2>Inicio de Sesión</h2>
          <q-form @submit="iniciarSesion">
            <q-input v-model="email" label="Email" required />
            <q-input
              v-model="password"
              label="Contraseña"
              type="password"
              required
            />

            <q-btn type="submit" label="Iniciar Sesión" color="primary" />
          </q-form>
        </q-tab-panel>
        <q-tab-panel name="registro">
          <h2>Registro</h2>
          <q-form @submit="registrar">
            <q-input v-model="nombre" label="Nombre" required />
            <q-input v-model="email" label="Email" required />
            <q-input
              v-model="password"
              label="Contraseña"
              type="password"
              required
            />

            <q-btn type="submit" label="Registrarse" color="primary" />
          </q-form>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const tab = ref("registro");
const nombre = ref("");
const email = ref("");
const password = ref("");

const registrar = () => {
  // Lógica para el registro
  console.log("Registrarse:", nombre.value, email.value, password.value);
};

const iniciarSesion = () => {
  // Lógica para el inicio de sesión
  console.log("Iniciar Sesión:", email.value, password.value);
  // Después de la lógica de inicio de sesión, navegar a HomePaciente.vue
  navegarAHomePaciente();
};

// Función para navegar a la página HomePaciente.vue
const navegarAHomePaciente = () => {
  router.push("/Home");
};
</script>

<style>
.bienvenida-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Esto hará que el contenido esté centrado verticalmente */
}
</style>
