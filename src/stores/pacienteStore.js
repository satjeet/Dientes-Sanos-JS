import { defineStore } from "pinia";
import { ref } from "vue";
import { reactive } from "vue";

import { db, auth } from "../firebase"; // Importa tu instancia de Firebase
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  collection,
  doc,
  addDoc,
  query,
  getDocs,
  where,
} from "firebase/firestore"; // Import Firestore methods

export const usePacienteStore = defineStore("paciente", () => {
  const state = reactive({
    fecha: new Date(),
    hora: null, // Asume un valor por defecto
    imagenFile: null, // Referencia al archivo de imagen
    imagenUrl: null, // Referencia a la URL de la imagen

    selectedPatient: null,
  });
  const isDataLoaded = ref(false);
  const registros = ref([]);
  const pacientes = ref([]); // Lista de pacientes

  const setSelectedPatient = (patient) => {
    console.log("Antes de seleccionar paciente:", state.selectedPatient);
    state.selectedPatient = patient;
    console.log("Después de seleccionar paciente:", state.selectedPatient);
  };

  const obtenerPacientes = async () => {
    try {
      console.log("entrar a obtener pacientes: ");
      const usuariosRef = collection(db, "usuarios");
      const pacientesQuery = query(
        usuariosRef,
        where("role", "==", "Paciente")
      );
      const pacientesSnapshot = await getDocs(pacientesQuery);
      pacientes.value = pacientesSnapshot.docs.map((doc) => {
        return { uid: doc.id, ...doc.data() };
      });
      console.log("quiero ver la lista de pacientes: ", state.pacientes);
      isDataLoaded.value = true;
    } catch (error) {
      console.error("Error al obtener los pacientes: ", error);
    }
  };

  // obtener historial por uid especificado
  const obtenerHistorialCepilladosPorUid = async (uid) => {
    console.log("obtener historial:");

    try {
      const cepilladoRef = collection(db, "usuarios", uid, "cepillados");
      const cepilladoQuery = query(cepilladoRef);
      const querySnapshot = await getDocs(cepilladoQuery);

      const nuevosRegistros = querySnapshot.docs.map((doc) => doc.data());
      registros.value = nuevosRegistros; // Actualiza los registros directamente
      console.log("Registros recuperados:", registros.value);
      isDataLoaded.value = true;
    } catch (error) {
      console.error("Error al obtener el historial de cepillados: ", error);
    }
  };

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
      if (!state.imagenFile || !state.imagenFile.name) {
        console.error(
          "No hay imagen seleccionada o el nombre de archivo no es válido"
        );
        return; // Salir de la función si no hay imagen seleccionada o si el nombre no es válido
      }
      const userId = auth.currentUser.uid;

      // Obtener una referencia al servicio de almacenamiento y al archivo
      const storage = getStorage();
      const filePath = `usuarios/${userId}/images/${state.imagenFile.name}`; // Usa el nombre del archivo
      const fileRef = storageRef(storage, filePath);

      // Subir el archivo a Firebase Storage
      const snapshot = await uploadBytes(fileRef, state.imagenFile);

      // Obtener la URL de descarga del archivo
      state.imagenUrl = await getDownloadURL(snapshot.ref);

      const nuevoRegistro = {
        fecha: state.fecha,
        hora: state.hora,
        imagenUrl: state.imagenUrl, // Usa la URL de la imagen
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
    state.hora = nuevaHora;
  };

  const actualizarImagenFile = (nuevaImagenFile) => {
    console.log("actualizarImagenFile called with:", nuevaImagenFile);
    state.imagenFile = nuevaImagenFile;
    console.log("contenido de state ImagenFile:", state.imagenFile);
  };
  const actualizarImagenUrl = (nuevaImagenUrl) => {
    console.log("actualizarImagenUrl called with:", nuevaImagenUrl);
    state.imagenUrl = nuevaImagenUrl;
  };

  return {
    state,
    registros,
    agregarRegistro,
    actualizarFecha,
    actualizarHora,
    actualizarImagenFile,
    actualizarImagenUrl,
    imagenUrl: state.imagenUrl,
    imagenFile: state.imagenFile,
    obtenerHistorialCepillados,
    obtenerHistorialCepilladosPorUid,
    pacientes,
    obtenerPacientes,
    selectedPatient: state.selectedPatient,
    setSelectedPatient,
  };
});
