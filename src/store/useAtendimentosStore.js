import { create } from "zustand";
import { api } from "../services/api";

export const useAtendimentosStore = create(set => ({
  atendimentos: [],
  carregar: async () => {
    const data = await api.atendimentos.list();
    set({ atendimentos: data });
  },
  aplicarCenario: async dados => {
    await api.atendimentos.set(dados);
    set({ atendimentos: dados });
  }
}));
