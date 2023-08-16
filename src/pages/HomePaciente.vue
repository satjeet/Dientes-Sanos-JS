<template>
  <div class="home-paciente">
    <q-page>
      <q-toolbar>
        <q-toolbar-title>
          Bienvenido, {{ userStore.user.name }}
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
        <q-btn
          label="Perfil"
          style="width: 50%; margin: 20px 0"
          @click="navigateToProfile"
        />
      </div>
    </q-page>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const dataLoaded = ref(false); // Estado para rastrear si los datos están cargados

const userData = computed(() => userStore.user); // Propiedad computada para obtener los datos del usuario

onMounted(async () => {
  // Asume que userStore tiene una función similar a obtenerHistorialCepillados
  await userStore.obtenerDatosUsuario();
  console.log("Datos del usuario:", userData.value);
  dataLoaded.value = true; // Actualiza el estado una vez que los datos estén cargados
});

const navegarRegistroCepillado = () => {
  router.push("/RegistrarCepillado");
};

const navegarHistorialCepillado = () => {
  router.push("/HistorialCepillados");
};

const navigateToProfile = () => {
  router.push("/Perfil");
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
