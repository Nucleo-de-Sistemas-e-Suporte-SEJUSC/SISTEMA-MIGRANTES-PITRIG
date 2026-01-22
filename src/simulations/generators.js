export function gerarUsuarios(qtd = 5) {
  return Array.from({ length: qtd }, (_, i) => ({
    id: crypto.randomUUID(),
    nome: `Usuário ${i + 1}`,
    email: `usuario${i + 1}@pitrig.gov`,
    perfil: i === 0 ? "ADMIN" : "GESTOR",
    ativo: true
  }));
}

export function gerarAtendimentos(qtd = 50) {
  const status = ["Pendente", "Em Atendimento", "Concluído"];

  return Array.from({ length: qtd }, (_, i) => ({
    id: crypto.randomUUID(),
    nome: `Migrante ${i + 1}`,
    pais: "Venezuela",
    status: status[Math.floor(Math.random() * status.length)],
    data: new Date().toISOString()
  }));
}
