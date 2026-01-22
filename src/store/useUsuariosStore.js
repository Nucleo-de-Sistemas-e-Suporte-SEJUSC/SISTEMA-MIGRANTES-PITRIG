import { create } from "zustand";
import { api } from "../services/api";

export const useUsuariosStore = create(set => ({
  usuarios: [],
  carregar: async () => {
    const data = await api.usuarios.list();
    set({ usuarios: data });
  },
  adicionar: async usuario => {
    await api.usuarios.add(usuario);
    set(s => ({ usuarios: [...s.usuarios, usuario] }));
  },
  remover: async id => {
    await api.usuarios.remove(id);
    set(s => ({ usuarios: s.usuarios.filter(u => u.id !== id) }));
  }
}));
