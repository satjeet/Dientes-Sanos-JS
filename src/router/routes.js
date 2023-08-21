const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      //{ path: "/inicio", component: () => import("pages/HomePaciente.vue") },
      {
        path: "/inicioProfesional",
        component: () => import("pages/HomeDoctor.vue"),
      },
      {
        path: "/registro",
        name: "RegistroUsuario",
        component: () => import("pages/RegistroUsuario.vue"),
      },
      {
        path: "/iniciarsesion",
        name: "InicioSesion",
        component: () => import("pages/InicioSesionUsuario.vue"),
      },
      {
        path: "/recuperar-contrasena",
        name: "RecuperarContrasena",
        component: () => import("pages/RecuperarClaveUsuario.vue"),
      },

      {
        path: "/HistorialCepillados",
        component: () => import("pages/HistorialCepilladosPaciente.vue"),
      },
      {
        path: "/perfil",
        component: () => import("pages/PerfilUsuarioPagina.vue"),
      },
      {
        path: "/actualizarperfil",
        component: () => import("pages/ActualizarDatosUsuarioPagina.vue"),
      },
    ],
  },
  {
    path: "/usuario",
    component: () => import("layouts/UserLayout.vue"),
    children: [
      {
        path: "/inicio",
        component: () => import("pages/InicioUsuarioPagina.vue"),
      },
      {
        path: "/RegistrarCepillado",
        component: () => import("pages/RegistrarCepillado.vue"),
      },
      {
        path: "/historialCepillados",
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
