import React from 'react';
import { FiX } from 'react-icons/fi';
import '../css/Atendimento.css';

const AtendimentoDetailsModal = ({ isOpen, data, onClose }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="details-overlay" onClick={onClose}>
      {/* stopPropagation impede que o clique dentro do modal feche ele */}
      <div className="details-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="details-header">
          <div>
            <h2>Detalhes do Atendimento</h2>
            <p className="details-subtitle">
              Informações completas do migrante
            </p>
          </div>
          <button className="details-close-btn" onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        {/* Corpo do Modal */}
        <div className="details-body">
            
            {/* Linha 1: Nome e Documento (2 colunas) */}
            <div className="details-row details-cols-2">
                <div className="details-item">
                    <label>Nome</label>
                    <p>{data.nome}</p>
                </div>
                <div className="details-item">
                    <label>Documento</label>
                    <p>{data.documento}</p>
                </div>
            </div>

            {/* Linha 2: Nacionalidade, Idade, Gênero (3 colunas) */}
            <div className="details-row details-cols-3">
                <div className="details-item">
                    <label>Nacionalidade</label>
                    <p>{data.nacionalidade}</p>
                </div>
                <div className="details-item">
                    <label>Idade</label>
                    <p>{data.idade ? `${data.idade} anos` : '—'}</p>
                </div>
                <div className="details-item">
                    <label>Gênero</label>
                    <p>{data.genero || '—'}</p>
                </div>
            </div>

            {/* Linha 3: Serviços */}
            <div className="details-row">
                <div className="details-item">
                    <label>Serviços Prestados</label>
                    <div className="details-chips">
                        {data.servicos?.length ? (
                        data.servicos.map((servico, index) => (
                            <span key={index} className="details-chip">
                            {servico}
                            </span>
                        ))
                        ) : (
                        <span>—</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Linha 4: Contato */}
            <div className="details-row">
                <div className="details-item">
                    <label>Contato</label>
                    <p>{data.telefone || '—'}</p>
                </div>
            </div>

            {/* Linha 5: Endereço */}
            <div className="details-row">
                <div className="details-item">
                    <label>Endereço</label>
                    <p>{data.endereco || '—'}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AtendimentoDetailsModal;