// store.js
import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    name: null,
    email: null,
    image: null,
  }),
  actions: {
    setUser(user) {
      this.name = user.displayName;
      this.email = user.email;
      this.image = user.photoURL;
    },
    resetUser() {
      this.name = null;
      this.email = null;
      this.image = null;
    },
  },
});
