import { useEffect } from "react";
import { useUsuariosStore } from "../../store/useUsuariosStore";

export default function UserTable() {
  const { usuarios, carregar, remover } = useUsuariosStore();

  useEffect(() => {
    carregar();
  }, []);

  return (
    <table>
      <tbody>
        {usuarios.map(u => (
          <tr key={u.id}>
            <td>{u.nome}</td>
            <td>{u.email}</td>
            <td>{u.perfil}</td>
            <td>
              <button onClick={() => remover(u.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
