import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { auth } from "../firebase"; // Asegúrate de que la ruta sea correcta
import { onAuthStateChanged } from "firebase/auth";
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });
  /*
  onAuthStateChanged(auth, (user) => {
    if (user && Router.currentRoute.value.path === "/") {
      Router.push({ path: "/home" });
    } else {
      Router.push({ path: "/" });
    }
  });
*/
  /*
  Router.beforeEach((to, from, next) => {
    const user = auth.currentUser;

    if (to.path === "/") {
      if (user) {
        // Si hay un usuario autenticado y está en la ruta "/", redirige a "/home"
        next({ path: "/home" });
      } else {
        // Si no hay un usuario autenticado y está en la ruta "/", permite la navegación
        next();
      }
    } else {
      // Para todas las demás rutas, permite la navegación
      next();
    }
  });


  */
  /*
  Router.beforeEach((to, from, next) => {
    const user = auth.currentUser;

    if (to.path === "/" && user) {
      // Si hay un usuario autenticado y está en la ruta "/", redirige a "/home"
      next({ path: "/home" });
    } else {
      // Para todas las demás rutas, permite la navegación
      next();
    }
  });*/
  /*
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Si hay un usuario autenticado y está en la ruta "/", redirige a "/home"
      if (Router.currentRoute.value.path === "/") {
        Router.push({ path: "/home" });
      }
    } else {
      // Si no hay un usuario autenticado, verifica si está en una ruta protegida
      const requiresAuth =
        Router.currentRoute.value.meta &&
        Router.currentRoute.value.meta.requiresAuth;
      if (!user) {
        // Si está en una ruta protegida, redirige a "/"
        Router.push({ path: "/" });
      }
    }
  });

  */
  onAuthStateChanged(auth, (user) => {
    if (user && Router.currentRoute.value.path === "/") {
      // Si hay un usuario autenticado y está en la ruta "/", redirige a "/home"
      Router.push({ path: "/home" });
    }
    // No redirigir si no hay un usuario autenticado
  });

  return Router;
});
