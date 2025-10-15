import React, { useState } from 'react';
import '../css/Agendamentos.css';
import { FiSearch, FiFilter, FiPlus, FiMoreHorizontal } from 'react-icons/fi';

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

    return (
        <div className="agendamentos-page">
            
            {/* 1. Título e Botão */}
            <header className="page-header">
                <div className="page-title-group">
                    <h1>Agendamentos</h1>
                    <p className="page-subtitle">Gestão de agendamentos e pré-cadastros</p>
                </div>
                <button className="btn btn-primary">
                    <FiPlus size={16} /> Novo Agendamento
                </button>
            </header>

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
                
                {/* Rodapé da Tabela (Paginação, etc. - não implementado aqui) */}
                {/* <div className="table-footer">...</div> */}

            </section>
        </div>
    );
};

export default Agendamentos;