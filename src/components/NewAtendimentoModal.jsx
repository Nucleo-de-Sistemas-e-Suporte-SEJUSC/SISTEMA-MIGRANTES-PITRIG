import React, { useState } from 'react';
import Select from 'react-select';
import { FiX } from 'react-icons/fi';
import '../css/Atendimento.css';
// Importação simulada para opções de nacionalidade e gênero
// Em um projeto real, você precisaria definir estas opções
const nacionalidadeOptions = [
    { value: 'Venezuela', label: 'Venezuela' },
    { value: 'Colombia', label: 'Colômbia' },
    { value: 'Brasil', label: 'Brasil' },
];
const generoOptions = [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Feminino' },
    { value: 'O', label: 'Outro' },
];

const customStyles = {
    // Estilos do React-Select (copiados do Atendimento.jsx, mas simplificados aqui)
    control: (provided) => ({
        ...provided,
        minHeight: '40px',
        height: '40px',
        padding: '0 5px',
        borderRadius: '6px',
        borderColor: '#ced4da',
        backgroundColor: '#f8f9fa',
        boxShadow: 'none',
    }),
    menu: (provided) => ({ ...provided, zIndex: 3000 }), // Z-index mais alto que o modal
};


// --- Subcomponentes de Abas ---

const DadosPessoais = () => (
    <div className="tab-content-inner">
        <div className="form-row">
            <div className="form-group">
                <label>Nome Completo *</label>
                <input type="text" placeholder="Nome completo do migrante" required />
            </div>
            <div className="form-group">
                <label>Documento *</label>
                <input type="text" placeholder="CPF, RNE ou Passaporte" required />
            </div>
        </div>
        <div className="form-row form-row-3-cols">
            <div className="form-group">
                <label>Nacionalidade *</label>
                <Select
                    options={nacionalidadeOptions}
                    placeholder="Selecione"
                    isSearchable={true}
                    styles={customStyles}
                    isClearable={false}
                    required
                />
            </div>
            <div className="form-group">
                <label>Idade</label>
                <input type="number" min="0" placeholder="Idade" />
            </div>
            <div className="form-group">
                <label>Gênero</label>
                <Select
                    options={generoOptions}
                    placeholder="Selecione"
                    isSearchable={false}
                    styles={customStyles}
                    isClearable={true}
                />
            </div>
        </div>
    </div>
);

const ContatoEndereco = () => (
    <div className="tab-content-inner">
        <div className="form-row">
            <div className="form-group form-group-half">
                <label>Telefone</label>
                <input type="tel" placeholder="(11) 99999-9999" />
            </div>
            <div className="form-group form-group-half">
                <label>Acompanhantes</label>
                <input type="number" min="0" defaultValue="0" />
            </div>
        </div>
        <div className="form-group">
            <label>Endereço</label>
            <textarea placeholder="Endereço completo..."></textarea>
        </div>
    </div>
);

const Servicos = () => (
    <div className="tab-content-inner">
        <div className="servicos-grid">
            <div className="servicos-col">
                <label className="checkbox-label">
                    <input type="checkbox" /> Documentação
                </label>
                <label className="checkbox-label">
                    <input type="checkbox" /> Cadastro CPF
                </label>
                <label className="checkbox-label">
                    <input type="checkbox" /> Auxílio Emergencial
                </label>
                <label className="checkbox-label">
                    <input type="checkbox" /> Encaminhamento Educação
                </label>
            </div>
            <div className="servicos-col">
                <label className="checkbox-label">
                    <input type="checkbox" /> Orientação Jurídica
                </label>
                <label className="checkbox-label">
                    <input type="checkbox" /> Carteira de Trabalho
                </label>
                <label className="checkbox-label">
                    <input type="checkbox" /> Encaminhamento Saúde
                </label>
                <label className="checkbox-label">
                    <input type="checkbox" /> Orientação Trabalhista
                </label>
            </div>
        </div>
        <div className="form-group observations-group">
            <label>Observações</label>
            <textarea placeholder="Informações adicionais sobre o atendimento..."></textarea>
        </div>
    </div>
);


// --- Componente Principal do Modal ---

const NewAtendimentoModal = ({ isOpen, onClose }) => {
    const [currentStep, setCurrentStep] = useState(1); // 1: Dados Pessoais, 2: Contato, 3: Serviços

    if (!isOpen) return null;

    const steps = [
        { id: 1, label: 'Dados Pessoais', component: DadosPessoais },
        { id: 2, label: 'Contato e Endereço', component: ContatoEndereco },
        { id: 3, label: 'Serviços', component: Servicos },
    ];

    const CurrentComponent = steps.find(step => step.id === currentStep).component;

    const handleSave = (e) => {
        e.preventDefault();
        alert('Atendimento Salvo!');
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content new-atendimento-modal-content">
                <div className="modal-header">
                    <div>
                        <h2>Novo Atendimento</h2>
                        <p className="modal-subtitle">Cadastro completo do migrante e serviços prestados</p>
                    </div>
                    <button className="close-btn" onClick={onClose}><FiX size={24} /></button>
                </div>

                {/* Navegação por Abas */}
                <div className="tab-navigation">
                    {steps.map(step => (
                        <button
                            key={step.id}
                            className={`tab-btn ${currentStep === step.id ? 'active' : ''}`}
                            onClick={() => setCurrentStep(step.id)}
                        >
                            {step.label}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSave} className="modal-form-tabs">
                    {/* Conteúdo da Aba Atual */}
                    <CurrentComponent />

                    <div className="modal-actions">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="btn btn-primary">Salvar Atendimento</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewAtendimentoModal;