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
        <q-toolbar-title @click="navigateToHome">
          <span class="company-name">Dientes Sanos</span>
        </q-toolbar-title>
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

        <!-- Botón de Cerrar Sesión en la sección de Contactenos -->
        <div v-if="userStore.uid.value !== null">
          <q-item clickable @click="logout">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section>Cerrar Sesión</q-item-section>
          </q-item>
        </div>
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

function navigateToHome() {
  router.push({ path: "/" });
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
      const userData = await userStore.fetchUser(authUser.uid);
      if (!userData) {
        console.log("guarda un paciente");

        await userStore.saveUser({
          ...authUser,
          role: "Paciente",
        });
      } else {
        console.log("guarda el rol", userData.role);

        await userStore.saveUser({
          ...authUser,
          role: userData.role,
        });
      }
      const updatedUserData = await userStore.fetchUser(authUser.uid);
      if (updatedUserData) {
        userStore.setUser(updatedUserData);
      }
      if (updatedUserData && updatedUserData.role === "Doctor") {
        router.push("/Homedoc");
      } else {
        router.push("/Home");
      }
    } else {
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

      const userData = await userStore.fetchUser(result.user.uid);
      if (userData) {
        userStore.setUser(userData);
      }
      // Asignar el usuario en el store de usuario
      /*
      userStore.setUser({
        ...result.user,
        role: "Paciente", // Rol por defecto
      });
*/
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
<style scoped>
.q-layout {
  background: #ffffff;
}

q-toolbar {
  background: #2196f3;
  color: white;
}

.company-name {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
}

q-drawer {
  background: #ffffff;
}

q-item-label {
  font-weight: bold;
  color: #2196f3;
}

q-item {
  cursor: pointer;
  transition: background 0.3s;
}

q-item:hover {
  background: #f0f0f0;
}

q-item-section {
  color: #555;
}

q-item-section avatar q-icon {
  font-size: 1.2rem;
  color: #2196f3;
}

q-page-container {
  padding: 20px;
}

.EssentialLink a {
  text-decoration: none;
  color: inherit;
}

.EssentialLink q-icon {
  color: #2196f3;
}

q-form {
  margin-bottom: 20px;
}

q-input {
  font-size: 1.25rem;
}

q-input label {
  font-size: 1.25rem;
}

q-btn {
  margin-top: 10px;
}
</style>
