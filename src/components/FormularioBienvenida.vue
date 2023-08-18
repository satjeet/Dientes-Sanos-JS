<template>
  <div class="bienvenida">
    <q-page class="flex flex-center column items-center">
      <!-- Fila para el título -->
      <div class="row justify-center q-mb-lg">
        <h1 class="text-h3">{{ tituloApp }}</h1>
      </div>

      <!-- Fila para la imagen -->
      <div class="row justify-center q-mb-lg">
        <img :src="imagenApp" alt="Dientes Sanos" width="150" />
      </div>

      <!-- Fila para los botones con dos columnas -->
      <div class="row justify-center q-gutter-xs">
        <q-btn
          color="blue"
          label="Iniciar Sesión"
          @click="navegarInicioSesion"
        />
        <q-btn color="blue" label="Crear Cuenta" @click="navegarRegistro" />
      </div>
    </q-page>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import defaultImage from "../assets/logo-adobe-express.svg";

const router = useRouter();

const tituloApp = ref("Dientes Sanos");
const imagenApp = ref(defaultImage);

const navegarInicioSesion = () => {
  router.push("/iniciarsesion");
};

const navegarRegistro = () => {
  router.push("/registro");
};
</script>

<style scoped>
.bienvenida {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

img {
  max-width: 100%;
  height: auto;
}
</style>
