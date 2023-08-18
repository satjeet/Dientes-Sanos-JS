<template>
  <div class="bienvenida-container">
    <h1 class="welcome-title">Bienvenido</h1>
    <q-tabs v-model="tab" align="justify">
      <q-tab name="inicio-sesion" label="Iniciar Sesión" />
      <q-tab name="registro" label="Registrarse" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="inicio-sesion">
        <q-form @submit="iniciarSesion">
          <q-input v-model="email" label="Email" required />
          <q-input
            v-model="password"
            label="Contraseña"
            type="password"
            required
          />
          <q-btn type="submit" label="Iniciar Sesión" color="primary" />
          <q-btn flat label="Olvidé mi contraseña" @click="olvideContrasena" />
        </q-form>
      </q-tab-panel>
      <q-tab-panel name="registro">
        <q-form @submit="registrar">
          <q-input v-model="email" label="Email" required />
          <q-input
            v-model="password"
            label="Contraseña"
            type="password"
            required
          />
          <q-input
            v-model="confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            required
          />
          <q-btn type="submit" label="Registrarse" color="primary" />
        </q-form>
      </q-tab-panel>
    </q-tab-panels>

    <q-dialog v-model="dialog">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Error</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          {{ dialogMessage }}
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore.js";
import {
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

const userStore = useUserStore();
const router = useRouter();

const tab = ref("inicio-sesion");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const dialog = ref(false);
const dialogMessage = ref("");

function mostrarDialog(mensaje) {
  dialogMessage.value = mensaje;
  dialog.value = true;
}

async function registrar() {
  if (password.value !== confirmPassword.value) {
    mostrarDialog("Las contraseñas no coinciden");
    return;
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    await userStore.saveUser(userCredential.user);
    userStore.setUser(await userStore.fetchUser(userCredential.user.uid));
    router.push("/Home");
  } catch (error) {
    mostrarDialog("Error en el registro: " + error.message);
  }
}

async function iniciarSesion() {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    const userData = await userStore.fetchUser(userCredential.user.uid);
    userStore.setUser(userData);

    // Verificar el rol del usuario
    if (userData.rol === "Doctor") {
      router.push("/HomeDoc");
    } else {
      router.push("/Home");
    }
  } catch (error) {
    mostrarDialog("Error en el inicio de sesión: " + error.message);
  }
}

function olvideContrasena() {
  sendPasswordResetEmail(auth, email.value)
    .then(() => {
      mostrarDialog("Correo de restablecimiento de contraseña enviado!");
    })
    .catch((error) => {
      mostrarDialog("Error al enviar el correo: " + error.message);
    });
}
</script>

<style scoped>
.bienvenida-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
}
.welcome-title {
  font-size: 3rem !important;
  word-wrap: break-word;
  text-align: center;
}
@media (max-width: 600px) {
  .welcome-title {
    font-size: 1.2rem;
  }
}
@media (min-width: 1200px) {
  .welcome-title {
    font-size: 1.8rem;
  }
}
</style>
