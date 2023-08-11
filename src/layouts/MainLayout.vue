<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Dientes Sanos</q-toolbar-title>
        <div class="q-pa-md" v-if="!user">
          <q-list bordered separator>
            <q-slide-item @left="LogingGoogle">
              <template v-slot:left>
                <q-icon name="sentiment_very_satisfied" />
                Cuida tu Salud
              </template>

              <q-item class="bg-blue">
                <q-item-section avatar>
                  <q-icon name="start" />
                </q-item-section>
                <q-item-section>Desliza para Ingresar </q-item-section>
              </q-item>
            </q-slide-item>
          </q-list>
        </div>
        <div v-else>
          {{ userStore.name }}- <q-btn @click="logout">Cerrar Sesión</q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Contactenos </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import { ref, onMounted } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useUserStore } from "../stores/userStore.js";

// Importa useRouter de vue-router
import { useRouter } from "vue-router";

const userStore = useUserStore();
// Dentro de la función setup
const router = useRouter(); // Utiliza useRouter para acceder al objeto del router

const user = ref(null);

const linksList = [
  {
    title: "Correo Electronico",
    caption: "arturo.alfaro87@gmail.com",
    icon: "favorite",
    link: "https://mail.google.com/mail/",
  },
];
const essentialLinks = linksList;

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const provider = new GoogleAuthProvider();
function LogingGoogle() {
  console.log("accessGoogle");
  signInWithRedirect(auth, provider);
}
onMounted(() => {
  // Suscribirse al evento de cambio de estado de autenticación
  onAuthStateChanged(auth, async (authUser) => {
    if (authUser) {
      // El usuario está autenticado
      user.value = authUser;

      // Recuperar el usuario desde Firestore
      const userData = await userStore.fetchUser(authUser.uid); // Usa 'await' aquí

      // Asignar el usuario en el store de usuario
      userStore.setUser(userData);

      // Redirigir según el rol
      if (userData.role === "Doctor") {
        router.push("/Homedoc");
      } else {
        router.push("/Home");
      }
    } else {
      // El usuario no está autenticado
      user.value = null;
      userStore.resetUser();
    }
  });

  getRedirectResult(auth)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      user.value = result.user;

      // Guardar el usuario en Firestore
      await userStore.saveUser(result.user);

      // Asignar el usuario en el store de usuario
      userStore.setUser({
        ...result.user,
        role: "Paciente", // Rol por defecto
      });

      // Redirigir al home del paciente
      router.push("/Home");
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData ? error.customData.email : null;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});
function logout() {
  auth
    .signOut()
    .then(() => {
      userStore.resetUser();
      user.value = null;
      // Redirige al usuario a la página de inicio
      router.push({ path: "/" });
    })
    .catch((error) => {
      console.error("Error signing out: ", error);
    });
}
</script>
