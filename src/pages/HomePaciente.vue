<template>
  <div class="home-paciente">
    Bienvenido, {{ userStore.name.value }}
    <q-page>
      <q-toolbar>
        <q-toolbar-title>
          Bienvenido, {{ userStore.name.value }}
        </q-toolbar-title>
      </q-toolbar>

      <div class="botones-container">
        <q-btn
          class="boton"
          color="primary"
          v-ripple
          @click="navegarRegistroCepillado"
        >
          Registro de Cepillado
        </q-btn>
        <q-btn
          class="boton"
          color="primary"
          v-ripple
          @click="navegarHistorialCepillado"
        >
          Historial de Cepillados
        </q-btn>
      </div>
    </q-page>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/userStore.js";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { watchEffect } from "vue";

const userStore = useUserStore();

const router = useRouter();
//const nombreUsuario = computed(() => userStore.name.value); // Reemplazar con el nombre del usuario real
const nombreUsuario = userStore.name.value;

console.log("nombre computado", userStore.computedName);
console.log("nombre ", userStore.name);

const navegarRegistroCepillado = () => {
  router.push("/RegistrarCepillado");
};

const navegarHistorialCepillado = () => {
  router.push("/HistorialCepillados");
};
</script>

<style scoped>
.home-paciente {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.botones-container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.boton {
  margin: 0 20px;
  width: calc(100% - 40px);
}
</style>
