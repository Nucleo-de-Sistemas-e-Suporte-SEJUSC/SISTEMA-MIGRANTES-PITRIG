import { cenarios } from "../simulations/scenarios";
import { useAtendimentosStore } from "../store/useAtendimentosStore";

export default function SimulacaoPanel() {
  const aplicar = useAtendimentosStore(s => s.aplicarCenario);

  return (
    <div>
      <button onClick={() => aplicar(cenarios.baixo)}>Baixo Fluxo</button>
      <button onClick={() => aplicar(cenarios.medio)}>Médio Fluxo</button>
      <button onClick={() => aplicar(cenarios.alto)}>Alto Fluxo</button>
    </div>
  );
}
