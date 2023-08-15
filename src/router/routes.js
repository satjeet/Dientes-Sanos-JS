const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/Home", component: () => import("pages/HomePaciente.vue") },
      { path: "/Homedoc", component: () => import("pages/HomeDoctor.vue") },
      {
        path: "/RegistrarCepillado",
        component: () => import("pages/RegistrarCepillado.vue"),
      },
      {
        path: "/HistorialCepillados",
        component: () => import("pages/HistorialCepilladosPaciente.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
