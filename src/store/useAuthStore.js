import { create } from "zustand";
import { api } from "../services/api";

export const useAuthStore = create(set => ({
  user: null,
  login: async (u, s) => {
    const res = await api.login(u, s);
    if (res) set({ user: res });
    return !!res;
  },
  logout: () => set({ user: null })
}));
