<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-blue-8 text-white">
      <q-toolbar>
        <MenuPieUsuario />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import MenuPieUsuario from "../components/MenuPieUsuario.vue";
</script>
