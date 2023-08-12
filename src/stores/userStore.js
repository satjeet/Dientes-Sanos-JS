import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Asegúrate de importar tu instancia de Firestore
import { ref } from "vue";

export const useUserStore = () => {
  const name = ref(null);
  const email = ref(null);
  const image = ref(null);
  const uid = ref(null);
  const role = ref("Paciente"); // Valor por defecto

  const saveUser = async (user) => {
    const userRef = doc(db, "usuarios", user.uid);
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      await setDoc(userRef, {
        name: user.displayName || userData.name,
        email: user.email || userData.email,
        image: user.photoURL || userData.image,
        uid: user.uid,
        role: userData.role || "Paciente", // Mantener el rol existente
      });
    } else {
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        uid: user.uid,
        role: "Paciente", // Rol por defecto para nuevos usuarios
      });
    }
  };

  // ...

  const fetchUser = async (uidValue) => {
    try {
      const userRef = doc(db, "usuarios", uidValue);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        if (userData) {
          return {
            name: userData.name || null,
            email: userData.email || null,
            image: userData.image || null,
            uid: userData.uid || null,
            role: userData.role || "Paciente", // Default value if role is not defined
          };
        } else {
          console.error("UserData is undefined for UID:", uidValue);
        }
      } else {
        console.error("No se encontró el usuario con UID:", uidValue);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
    return null; // Return null if user not found or an error occurred
  };

  // ...

  const setUser = (user) => {
    console.log("setUser llamado con:", user);
    name.value = user.name;
    email.value = user.email;
    image.value = user.image;
    uid.value = user.uid;
    role.value = user.role;
  };

  const resetUser = () => {
    console.log("resetUser llamado");
    name.value = null;
    email.value = null;
    image.value = null;
    uid.value = null;
    role.value = "Paciente";
  };

  return {
    name,
    email,
    image,
    uid,
    role,
    saveUser,
    fetchUser,
    setUser,
    resetUser,
  };
};
