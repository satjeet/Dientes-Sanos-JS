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
} from "firebase/auth";
import { auth } from "../firebase";
import { ref, onMounted } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useUserStore } from "../stores/userStore.js";

const userStore = useUserStore();

const user = ref(null);
const linksList = [
  {
    title: "Correo Electronico",
    caption: "arturo.alfaro87@gmail.com",
    icon: "favorite",
    link: "https://mail.google.com/mail/",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const provider = new GoogleAuthProvider();
function LogingGoogle() {
  console.log("accessGoogle");
  signInWithRedirect(auth, provider);

  /*
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      user.value = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
*/
}
onMounted(() => {
  getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      user.value = result.user;
      userStore.setUser(result.user);
      // ...
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
    })
    .catch((error) => {
      console.error("Error signing out: ", error);
    });
}

const essentialLinks = linksList;
</script>
