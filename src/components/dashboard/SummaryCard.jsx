import { useAtendimentosStore } from "../../store/useAtendimentosStore";

export default function SummaryCard() {
  const atendimentos = useAtendimentosStore(s => s.atendimentos);

  return (
    <div>
      <h3>Total</h3>
      <strong>{atendimentos.length}</strong>
    </div>
  );
}
