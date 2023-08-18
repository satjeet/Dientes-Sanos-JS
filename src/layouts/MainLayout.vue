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
        <div v-if="userStore.user.uid !== null">
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore.js";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import EssentialLink from "components/EssentialLink.vue";

const userStore = useUserStore();
const router = useRouter();
const leftDrawerOpen = ref(false);

const essentialLinks = [
  {
    title: "Correo Electronico",
    caption: "arturo.alfaro87@gmail.com",
    icon: "favorite",
    link: "https://mail.google.com/mail/",
  },
];

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function navigateToHome() {
  router.push({ path: "/" });
}

onMounted(() => {
  handleAuthenticationState();
  handleRedirectResult();
});

async function handleAuthenticationState() {
  onAuthStateChanged(auth, async (authUser) => {
    console.log("Hasta aqui llega sin caerse");
    if (authUser) {
      const userData = {
        uid: authUser.uid,
        email: authUser.email,
        name: authUser.displayName,
        image: authUser.photoURL,
      };
      await userStore.saveUser(userData);
      const fetchedUser = await userStore.fetchUser(authUser.uid);
      Object.assign(userStore.user, fetchedUser);

      router.push(
        userData && userData.role === "Doctor" ? "/Homedoc" : "/inicio"
      );
    } else {
      console.log("quiero ver cada vez que se ejecute en reset mal parido");
      // userStore.resetUser();
    }
  });
}

async function handleRedirectResult() {
  try {
    const result = await getRedirectResult(auth);
    if (result && result.user) {
      await userStore.saveUser(result.user);
      userStore.setUser(await userStore.fetchUser(result.user.uid));
      router.push("/Home");
    }
  } catch (error) {
    console.error("Error during redirect authentication:", error);
  }
}

function logout() {
  auth
    .signOut()
    .then(() => {
      userStore.resetUser();
      router.push({ path: "/" });
    })
    .catch((error) => {
      console.error("Error signing out:", error);
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
