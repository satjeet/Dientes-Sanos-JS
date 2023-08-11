const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/Home",
        component: () => import("pages/HomePaciente.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/Homedoc",
        component: () => import("pages/HomeDoctor.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/RegistrarCepillado",
        component: () => import("pages/RegistrarCepillado.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/HistorialCepillados",
        component: () => import("pages/HistorialCepilladosPaciente.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
