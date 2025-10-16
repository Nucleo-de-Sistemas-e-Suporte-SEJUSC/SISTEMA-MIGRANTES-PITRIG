import React, { useState } from 'react';
import '../css/Agendamentos.css';
import { FiSearch, FiFilter, FiPlus, FiMoreHorizontal } from 'react-icons/fi';
import { nacionalidadeOptions } from '../data/paises';
import Select from 'react-select';
// Dados simulados da tabela (migrantes)
const appointmentsData = [
    { id: 1, nome: "Maria Silva Santos", documento: "123.456.789-00", dataHora: "14/01/2024\n09:00", nacionalidade: "Venezuela", acompanhantes: 2, status: "Confirmado" },
    { id: 2, nome: "Carlos Mendoza", documento: "987.654.321-00", dataHora: "14/01/2024\n10:30", nacionalidade: "Colombia", acompanhantes: 0, status: "Pendente" },
    { id: 3, nome: "Ana Rodriguez", documento: "456.789.123-00", dataHora: "15/01/2024\n14:00", nacionalidade: "Peru", acompanhantes: 3, status: "Confirmado" },
];

// Componente para o Card de Resumo
const SummaryCard = ({ title, value, subtitle, type }) => (
    <div className={`summary-card card-${type}`}>
        <p className="card-title">{title}</p>
        <p className="card-value">{value}</p>
        <p className="card-subtitle">{subtitle}</p>
    </div>
);
const customStyles = {
    // 1. Control (O container principal)
    control: (provided, state) => ({
        ...provided,
        minHeight: '40px',
        height: '40px',
        padding: '0 5px',
        borderRadius: '6px',
        
        // 🔑 CORREÇÃO: No foco, a borda principal (border-color) deve ser a mesma
        // que a borda padrão do input (#ced4da), para que SÓ o box-shadow apareça.
        borderColor: state.isFocused ? '#ced4da' : '#ced4da', // 👈 MANTER A COR PADRÃO
        
        // Aplica o anel azul de foco como box-shadow
        boxShadow: state.isFocused 
            ? '0 0 0 3px rgba(0, 123, 255, 0.25)' // ANEL DE FOCO AZUL
            : 'inset 0 1px 2px rgba(0, 0, 0, 0.075)',

        backgroundColor: state.isFocused ? '#fff' : '#f8f9fa',
        '&:hover': {
             // 🔑 CORREÇÃO: Manter a borda padrão no hover
             borderColor: state.isFocused ? '#ced4da' : '#ced4da', 
        },
    }),

    // 2. Input de Busca (Interno, onde o texto é digitado)
    input: (provided) => ({
        ...provided,
        // 🔑 CORREÇÃO PRINCIPAL: Garante que o input interno não tem bordas de foco
        boxShadow: 'none !important',
        outline: 'none !important',
        border: 'none !important',
    }),
    
    // 3. Placeholder
    placeholder: (provided) => ({ ...provided, color: '#adb5bd' }),

    // 4. SingleValue (Texto selecionado)
    singleValue: (provided) => ({ ...provided, color: '#495057' }),

    // 5. Option (Itens da Lista Dropdown)
    option: (provided, state) => ({
        ...provided,
        color: '#343a40',
        backgroundColor: state.isFocused ? '#e9ecef' : 'white',
        '&:active': {
            backgroundColor: '#007bff',
            color: 'white',
        },
    }),

    // 6. Indicadores
    indicatorSeparator: (provided) => ({ ...provided, display: 'none' }),
    dropdownIndicator: (provided) => ({ ...provided, color: '#6c757d', padding: '8px' }),
    menu: (provided) => ({ ...provided, zIndex: 2000 }), 
};
// Componente para o Badge de Status
const StatusBadge = ({ status }) => {
    let className = 'status-badge';
    if (status === 'Confirmado') {
        className += ' status-confirmed';
    } else if (status === 'Pendente') {
        className += ' status-pending';
    }
    return <span className={className}>{status}</span>;
};
const handleNumericInput = (event) => {
    // Permite números, backspace, tab, delete e setas (para usabilidade)
    const allowedChars = /[0-9\(\)\-\s]|ArrowLeft|ArrowRight|Backspace|Tab|Delete/;
    if (!allowedChars.test(event.key)) {
        event.preventDefault();
    }
};
const Agendamentos = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Dados de resumo (fixos para o exemplo)
    const summaryData = [
        { title: "Agendamentos Hoje", value: "0", subtitle: "+2 desde ontem", type: 'default' },
        { title: "Total Agendados", value: "3", subtitle: "Próximos 7 dias", type: 'default' },
        { title: "Taxa Comparecimento", value: "87%", subtitle: "Últimos 30 dias", type: 'default' },
        { title: "Pendentes Confirmação", value: "12", subtitle: "aguardando contato", type: 'warning' },
    ];

    // Simular filtro (não implementado totalmente)
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        // Lógica de filtro real seria aplicada aqui
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    return (
        <div className="agendamentos-page">

            {/* 1. Título e Botão */}
            <header className="page-header">
                <div className="page-title-group">
                    <h1>Agendamentos</h1>
                    <p className="page-subtitle">Gestão de agendamentos e pré-cadastros</p>
                </div>
                <button className="btn btn-primary" onClick={openModal}>
                    <FiPlus size={16} /> Novo Agendamento
                </button>

            </header>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Novo Agendamento</h2>
                            <button className="close-btn" onClick={closeModal}>×</button>
                        </div>
                        <p>Preencha os dados para criar um novo agendamento</p>
                        <form className="modal-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Nome Completo *</label>
                                    <input type="text" placeholder="Nome completo do migrante" />
                                </div>
                                <div className="form-group">
                                    <label>Documento *</label>
                                    <input type="text" placeholder="CPF, RNE ou Passaporte" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Telefone</label>
                                    <input
                                        id="inputTelefone"
                                        onInput="formatarTelefone(event)"
                                        type="tel"
                                        placeholder="(11) 99999-9999"
                                        onKeyDown={handleNumericInput} // Usa onKeyDown para bloquear a tecla antes que o caractere seja adicionado
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Nacionalidade</label>
                                    {/* 🔑 CORREÇÃO: Substitua <select> por <Select> (o componente) */}
                                    <Select
                                        options={nacionalidadeOptions} // 🔑 Propriedade 'options' passada corretamente
                                        placeholder="Selecione ou busque..."
                                        isSearchable={true}
                                        styles={customStyles}
                                    // Adicione outras props como 'value' e 'onChange' para controlar o estado
                                    // e 'styles' para estilizar
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Data *</label>
                                    <input type="date" />
                                </div>
                                <div className="form-group">
                                    <label>Hora *</label>
                                    <input type="time" />
                                </div>
                                <div className="form-group">
                                    <label>Acompanhantes</label>
                                    <input type="number" min="0" defaultValue="0" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Observações</label>
                                <textarea placeholder="Informações adicionais..."></textarea>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancelar</button>
                                <button type="submit" className="btn btn-primary">Criar Agendamento</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {/* 2. Cards de Resumo */}
            <section className="summary-cards-container">
                {summaryData.map((data, index) => (
                    <SummaryCard key={index} {...data} />
                ))}
            </section>

            {/* 3. Lista de Agendamentos (Container Principal) */}
            <section className="appointments-list-container">
                <div className="list-header">
                    <div className="list-title-group">
                        <h2>Lista de Agendamentos</h2>
                        <p className="list-subtitle">Gerencie todos os agendamentos do sistema</p>
                    </div>

                    {/* Barra de Pesquisa e Filtros */}
                    <div className="list-actions">
                        <div className="search-input-group">
                            <FiSearch className="search-icon" size={18} />
                            <input
                                type="text"
                                placeholder="Buscar por nome ou documento."
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                        <button className="btn btn-secondary">
                            <FiFilter size={16} /> Filtros
                        </button>
                    </div>
                </div>

                {/* Tabela de Dados */}
                <div className="appointments-table-wrapper">
                    <table className="appointments-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Documento</th>
                                <th>Data/Hora</th>
                                <th>Nacionalidade</th>
                                <th>Acompanhantes</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointmentsData.map(item => (
                                <tr key={item.id}>
                                    <td>{item.nome}</td>
                                    <td>{item.documento}</td>
                                    {/* O CSS precisa lidar com quebras de linha no Data/Hora */}
                                    <td className="data-hora">{item.dataHora}</td>
                                    <td>{item.nacionalidade}</td>
                                    <td>{item.acompanhantes}</td>
                                    <td><StatusBadge status={item.status} /></td>
                                    <td>
                                        <button className="btn-actions" aria-label="Ações">
                                            <FiMoreHorizontal />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            </section>
        </div>
    );
};

export default Agendamentos;