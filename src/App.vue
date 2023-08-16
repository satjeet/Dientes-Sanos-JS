<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useUserStore } from "./stores/userStore.js"; // Asegúrate de actualizar la ruta a tu userStore

export default defineComponent({
  name: "App",
  setup() {
    const userStore = useUserStore();

    onMounted(async () => {
      await userStore.initialize();
      console.log("Se ejecuto el inizializaR");
    });

    return {};
  },
});
</script>
