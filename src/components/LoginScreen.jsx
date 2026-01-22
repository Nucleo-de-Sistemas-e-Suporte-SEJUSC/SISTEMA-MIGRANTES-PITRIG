import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";;

export default function LoginScreen() {
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");
  const login = useAuthStore(s => s.login);

  async function entrar() {
    const ok = await login(user, senha);
    if (!ok) alert("Credenciais inválidas");
  }

  return (
    <div>
      <input placeholder="Usuário" onChange={e => setUser(e.target.value)} />
      <input type="password" placeholder="Senha" onChange={e => setSenha(e.target.value)} />
      <button onClick={entrar}>Entrar</button>
    </div>
  );
}
