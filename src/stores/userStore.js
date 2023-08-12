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
    await setDoc(userRef, {
      name: user.displayName, // Asegúrate de que estos campos existen en el objeto 'user'
      email: user.email,
      image: user.photoURL,
      uid: user.uid,
      role: "Paciente", // Rol por defecto para nuevos usuarios
    });
  };

  // ...

  const fetchUser = async (uidValue) => {
    const userRef = doc(db, "usuarios", uidValue);
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      return userData; // Devuelve los datos aquí
    } else {
      console.error("No se encontró el usuario con UID:", uidValue);
      return null; // Devuelve null si no se encuentra el usuario
    }
  };

  // ...

  const setUser = (user) => {
    name.value = user.name;
    email.value = user.email;
    image.value = user.image;
    uid.value = user.uid;
    role.value = user.role;
  };

  const resetUser = () => {
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
