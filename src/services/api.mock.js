import { gerarUsuarios, gerarAtendimentos } from "../simulations/generators";

let usuarios = gerarUsuarios();
let atendimentos = gerarAtendimentos();

export const apiMock = {
  login: (user, senha) =>
    user === "admin" && senha === "123"
      ? { user, role: "ADMIN" }
      : null,

  usuarios: {
    list: () => Promise.resolve(usuarios),
    add: u => {
      usuarios.push(u);
      return Promise.resolve(u);
    },
    remove: id => {
      usuarios = usuarios.filter(u => u.id !== id);
      return Promise.resolve();
    }
  },

  atendimentos: {
    list: () => Promise.resolve(atendimentos),
    set: dados => {
      atendimentos = dados;
      return Promise.resolve();
    }
  },
  
  agendamentos: {
    list: () => Promise.resolve(agendamentos),

    add: (novo) => {
      agendamentos.push(novo);
      return Promise.resolve(novo);
    },

    remove: (id) => {
      agendamentos = agendamentos.filter(a => a.id !== id);
      return Promise.resolve();
    }
  }
};
