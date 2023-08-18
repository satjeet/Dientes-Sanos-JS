<template>
  <div class="recuperar-contrasena">
    <q-page>
      <q-toolbar>
        <q-toolbar-title> Recuperar Contraseña </q-toolbar-title>
      </q-toolbar>

      <div class="formulario-container">
        <q-input v-model="email" label="Email" />
        <q-btn
          label="Enviar Enlace de Recuperación"
          @click="recuperarContrasena"
        />
      </div>
    </q-page>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/userStore";

const email = ref("");
const userStore = useUserStore();

const recuperarContrasena = async () => {
  await userStore.resetPassword(email.value);
};
</script>

<style scoped>
.recuperar-contrasena {
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
