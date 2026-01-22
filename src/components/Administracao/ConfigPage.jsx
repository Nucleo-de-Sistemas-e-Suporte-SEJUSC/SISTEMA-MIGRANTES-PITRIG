import React, { useState } from 'react';
// IMPORTANTE: Assuma que você importou ConfigurationSection e Modal aqui
// import { ConfigurationSection } from './ConfigurationSection';
// import { Modal } from './Modal'; 

// Dados de Exemplo para simular os itens
const tiposDeServico = [
    { name: 'Documentação' }, 
    { name: 'Orientação Jurídica' },
    { name: 'Cadastro CPF' }
];

const nacionalidades = [
    { name: 'Venezuela' }, 
    { name: 'Colômbia' },
    { name: 'Peru' }
];

// Estilos de formulário para os modais
const formStyles = {
    label: { display: 'block', marginBottom: '5px', fontWeight: '500' },
    input: { width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '15px', boxSizing: 'border-box' },
    saveButton: { padding: '10px 15px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }
};


export function ConfigPage() {
  // Estado para controlar qual modal está aberto: 'tipo', 'nacionalidade', ou null
  const [modalType, setModalType] = useState(null); 

  const handleOpenModal = (type) => {
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  return (
    // Estrutura do Layout (similar ao screenshot)
    <div style={{ display: 'flex', gap: '20px', padding: '20px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      
      {/* Seção Tipos de Serviço */}
      <div style={{ flex: 1 }}>
        <ConfigurationSection
          title="Tipos de Serviço"
          description="Configure os tipos de serviço disponíveis"
          items={tiposDeServico}
          // Abre o modal 'tipo'
          onAddItem={() => handleOpenModal('tipo')} 
        />
      </div>

      {/* Seção Nacionalidades */}
      <div style={{ flex: 1 }}>
        <ConfigurationSection
          title="Nacionalidades"
          description="Configure as nacionalidades disponíveis"
          items={nacionalidades}
          // Abre o modal 'nacionalidade'
          onAddItem={() => handleOpenModal('nacionalidade')} 
        />
      </div>
      
      {/* =================================
        RENDERIZAÇÃO DOS MODAIS
        ================================= 
      */}

      {/* Modal para Adicionar Novo Tipo de Serviço */}
      <Modal
        isOpen={modalType === 'tipo'}
        onClose={handleCloseModal}
        title="Adicionar Novo Tipo de Serviço"
      >
        <div>
            <label style={formStyles.label}>Nome do Tipo:</label>
            <input type="text" style={formStyles.input} placeholder="Ex: Cadastro Único" />
            <button style={formStyles.saveButton} onClick={handleCloseModal}>Salvar Tipo</button>
        </div>
      </Modal>

      {/* Modal para Adicionar Nova Nacionalidade */}
      <Modal
        isOpen={modalType === 'nacionalidade'}
        onClose={handleCloseModal}
        title="Adicionar Nova Nacionalidade"
      >
        <div>
            <label style={formStyles.label}>Nome da Nacionalidade:</label>
            <input type="text" style={formStyles.input} placeholder="Ex: Paraguai" />
            <button style={formStyles.saveButton} onClick={handleCloseModal}>Salvar Nacionalidade</button>
        </div>
      </Modal>
    </div>
  );
}