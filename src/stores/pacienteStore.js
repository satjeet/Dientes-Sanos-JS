import { defineStore } from "pinia";
import { ref } from "vue";
import { db, auth } from "../firebase"; // Importa tu instancia de Firebase
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { collection, doc, addDoc, query, getDocs } from "firebase/firestore"; // Import Firestore methods

export const usePacienteStore = defineStore("paciente", () => {
  const registros = ref([]);
  const fecha = ref(new Date());
  const hora = ref(null); // Asume un valor por defecto
  const imagenFile = ref(null); // Referencia al archivo de imagen
  const imagenUrl = ref(null); // Referencia a la URL de la imagen

  const obtenerHistorialCepillados = async () => {
    try {
      const userId = auth.currentUser.uid;
      const cepilladoRef = collection(db, "usuarios", userId, "cepillados");
      const cepilladoQuery = query(cepilladoRef);
      const querySnapshot = await getDocs(cepilladoQuery);

      registros.value = querySnapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.error("Error al obtener el historial de cepillados: ", error);
    }
  };

  const agregarRegistro = async () => {
    try {
      if (!imagenFile.value || !imagenFile.value.name) {
        console.error(
          "No hay imagen seleccionada o el nombre de archivo no es válido"
        );
        return; // Salir de la función si no hay imagen seleccionada o si el nombre no es válido
      }
      const userId = auth.currentUser.uid;

      // Obtener una referencia al servicio de almacenamiento y al archivo
      const storage = getStorage();
      const filePath = `usuarios/${userId}/images/${imagenFile.value.name}`; // Usa el nombre del archivo
      const fileRef = storageRef(storage, filePath);

      // Subir el archivo a Firebase Storage
      const snapshot = await uploadBytes(fileRef, imagenFile.value);

      // Obtener la URL de descarga del archivo
      imagenUrl.value = await getDownloadURL(snapshot.ref);

      const nuevoRegistro = {
        fecha: fecha.value,
        hora: hora.value,
        imagenUrl: imagenUrl.value, // Usa la URL de la imagen
      };

      // Lógica para guardar el registro en Firebase y en el store de Pinia
      registros.value.push(nuevoRegistro);

      // Guarda el registro en Firestore
      const cepilladoRef = collection(db, "usuarios", userId, "cepillados");
      await addDoc(cepilladoRef, nuevoRegistro);
    } catch (error) {
      console.error("Error al agregar el registro: ", error);
    }
  };

  const actualizarFecha = (nuevaFecha) => {
    fecha.value = nuevaFecha;
  };

  const actualizarHora = (nuevaHora) => {
    console.log("actualizarHora called with:", nuevaHora);
    hora.value = nuevaHora;
  };

  const actualizarImagenFile = (nuevaImagenFile) => {
    console.log("actualizarImagenFile called with:", nuevaImagenFile);
    imagenFile.value = nuevaImagenFile;
    console.log("contenido de ImagenFile.value:", imagenFile.value);
  };
  const actualizarImagenUrl = (nuevaImagenUrl) => {
    console.log("actualizarImagenUrl called with:", nuevaImagenUrl);
    imagenUrl.value = nuevaImagenUrl;
  };

  return {
    registros,
    agregarRegistro,
    actualizarFecha,
    actualizarHora,
    actualizarImagenFile,
    actualizarImagenUrl, // Agregar esta línea
    imagenUrl, // Agregar esta línea si necesitas acceder a la URL desde fuera del store
    obtenerHistorialCepillados,
  };
});
