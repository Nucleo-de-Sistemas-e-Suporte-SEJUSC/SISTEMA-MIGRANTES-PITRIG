import { gerarAtendimentos } from "./generators";

export const cenarios = {
  baixo: gerarAtendimentos(10),
  medio: gerarAtendimentos(100),
  alto: gerarAtendimentos(500)
};
