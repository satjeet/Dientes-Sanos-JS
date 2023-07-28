import { defineStore } from "pinia";

export const usePacienteStore = defineStore("storePaciente", {
  state: () => ({
    registros: [], // Array para almacenar los registros de cepillado
  }),
  actions: {
    agregarRegistro(registro) {
      this.registros.push(registro);
    },
    // Agrega otras acciones aquí si lo necesitas
  },
});

export function setupStore() {
  return usePacienteStore(); // Esta función se utiliza para inicializar el store en el punto de entrada principal de Vue (main.js)
}
