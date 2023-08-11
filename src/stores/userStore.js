import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Asegúrate de importar tu instancia de Firestore
import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    name: null,
    email: null,
    image: null,
    role: "Paciente", // Valor por defecto
  }),

  actions: {
    async saveUser(user) {
      const userRef = doc(db, "usuarios", user.uid);
      await setDoc(userRef, {
        name: user.name,
        email: user.email,
        image: user.image,
        role: "Paciente", // Rol por defecto para nuevos usuarios
      });
    },

    async fetchUser(uid) {
      const userRef = doc(db, "usuarios", uid);
      const userSnapshot = await getDoc(userRef);
      return userSnapshot.data();
    },

    setUser(user) {
      this.name = user.name;
      this.email = user.email;
      this.image = user.image;
      this.role = user.role;
    },

    resetUser() {
      this.name = null;
      this.email = null;
      this.image = null;
      this.role = "Paciente";
    },
  },
});
