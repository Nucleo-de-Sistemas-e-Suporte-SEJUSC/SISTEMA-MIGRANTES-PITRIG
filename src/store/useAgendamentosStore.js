import { create } from "zustand";
import { api } from "../services/api";

export const useAgendamentosStore = create((set, get) => ({
  agendamentos: [],

  carregar: async () => {
    const data = await api.agendamentos.list();
    set({ agendamentos: data });
  },

  criar: async (novoAgendamento) => {
    await api.agendamentos.add(novoAgendamento);
    set(state => ({
      agendamentos: [...state.agendamentos, novoAgendamento]
    }));
  },

  remover: async (id) => {
    await api.agendamentos.remove(id);
    set(state => ({
      agendamentos: state.agendamentos.filter(a => a.id !== id)
    }));
  }
}));
