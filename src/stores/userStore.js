import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { reactive, computed } from "vue";
import { auth } from "../firebase";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export const useUserStore = () => {
  const user = reactive({
    name: null,
    email: null,
    image: null,
    uid: null,
    role: "Paciente",
    birthdate: null,
    address: null,
    commune: null,
    cellphone: null,
  });

  const isUserSet = computed(() => user.name !== null && user.uid !== null);
  const getCurrentUID = () => {
    const user = auth.currentUser;
    console.log("getCurrentUID");
    console.log("user: " + user.uid);

    return user ? user.uid : null;
  };
  const obtenerDatosUsuario = async () => {
    try {
      console.error("el current uid:", user.uid);

      // Asume que tienes una forma de obtener el UID del usuario actual
      const currentUID = getCurrentUID();
      await fetchUser(currentUID);
    } catch (error) {
      console.error("Error obteniendo datos del usuario:", error);
      throw error;
    }
  };
  const saveUser = async (userData) => {
    try {
      if (!userData.uid) {
        console.error("UID is missing or null:", userData.uid);
        return;
      }
      const userRef = doc(db, "usuarios", userData.uid);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        const existingData = userSnapshot.data();
        await setDoc(userRef, {
          ...existingData,
          ...userData,
          role: existingData.role || "Paciente",
        });
      } else {
        await setDoc(userRef, {
          ...userData,
          role: "Paciente",
        });
      }
    } catch (error) {
      console.error("Error saving user:", error);
      throw error;
    }
  };

  const fetchUser = async (uidValue) => {
    if (!uidValue) {
      console.error("UID is missing or null:", uidValue);
      return;
    }
    try {
      const userRef = doc(db, "usuarios", uidValue);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        Object.assign(user, userData);
      } else {
        console.error("User not found with UID:", uidValue);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };

  const resetUser = () => {
    Object.assign(user, {
      name: null,
      email: null,
      image: null,
      uid: null,
      role: "Paciente",
      birthdate: null,
      address: null,
      commune: null,
      cellphone: null,
    });
  };
  const initialize = async () => {
    try {
      // Obtener el UID actual del usuario. Esto dependerá de cómo estés manejando la autenticación.
      const currentUID = getCurrentUID(); // Suponiendo que tienes una función que obtiene el UID actual

      if (currentUID) {
        await fetchUser(currentUID); // Usar la función fetchUser para cargar los datos del usuario
      } else {
        console.warn("No hay un UID de usuario actual.");
      }
    } catch (error) {
      console.error("Error al inicializar el userStore:", error);
    }
  };

  const updateUserProfile = async (imageFile) => {
    try {
      const userId = getCurrentUID();

      // Subir la imagen a Firebase Storage
      const storage = getStorage();
      const filePath = `usuarios/${userId}/profile/${imageFile}`;
      const fileRef = storageRef(storage, filePath);

      // Subir el archivo a Firebase Storage
      const snapshot = await uploadBytes(fileRef, imageFile);

      // Obtener la URL de descarga del archivo
      const imageUrl = await getDownloadURL(snapshot.ref);

      // Actualizar la URL de la imagen en Firestore
      const userRef = doc(db, "usuarios", userId);
      await setDoc(userRef, { image: imageUrl }, { merge: true });

      // Actualizar la imagen en el store local
      user.image = imageUrl;
      console.log("imagen;", user.image);
    } catch (error) {
      console.error("Error al actualizar el perfil del usuario: ", error);
    }
  };

  return {
    user,
    updateUserProfile,
    isUserSet,
    saveUser,
    fetchUser,
    resetUser,
    obtenerDatosUsuario,
    initialize,
  };
};
