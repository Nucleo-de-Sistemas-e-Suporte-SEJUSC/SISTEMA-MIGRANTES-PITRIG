import React, { useState } from 'react';
import Select from 'react-select';
import { FiDownload, FiBarChart2, FiBookOpen, FiFileText } from 'react-icons/fi'; // Ícones para Download e as abas
import '../css/Relatorios.css'; 
import { nacionalidadeOptions } from '../data/paises';

const servicoOptions = [
    { value: 'Todos', label: 'Todos' },
    { value: 'Documentacao', label: 'Documentação' },
    { value: 'OrientacaoJuridica', label: 'Orientação Jurídica' },
    { value: 'CPF', label: 'Cadastro CPF' },
    { value: 'CarteiraTrabalho', label: 'Carteira de Trabalho' },
];

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        minHeight: '40px',
        height: '40px',
        padding: '0 5px',
        borderRadius: '6px',
        // 🔑 MANTÉM A BORDA PADRÃO
        borderColor: state.isFocused ? '#007bff' : '#ced4da', 
        
        // 🔑 REMOVE o BOX-SHADOW no estado normal (para evitar a borda dupla)
        boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0, 123, 255, 0.25)' : 'none', 
        
        backgroundColor: state.isFocused ? 'white' : '#f8f9fa', 
        
        '&:hover': {
            borderColor: state.isFocused ? '#007bff' : '#adb5bd', 
        },
    }),
    input: (provided) => ({
        ...provided,
        boxShadow: 'none !important',
        outline: 'none !important',
        border: 'none !important',
    }),
    placeholder: (provided) => ({ ...provided, color: '#adb5bd' }),
    singleValue: (provided) => ({ ...provided, color: '#495057' }),
    option: (provided, state) => ({
        ...provided,
        color: '#343a40',
        backgroundColor: state.isFocused ? '#e9ecef' : 'white',
        '&:active': {
            backgroundColor: '#007bff',
            color: 'white',
        },
    }),
    indicatorSeparator: (provided) => ({ ...provided, display: 'none' }),
    dropdownIndicator: (provided) => ({ ...provided, color: '#6c757d', padding: '8px' }),
    menu: (provided) => ({ ...provided, zIndex: 2000 }),
};

const situacaoOptions = [
    { value: 'Todas', label: 'Todas' },
    { value: 'Concluido', label: 'Concluído' },
    { value: 'Pendente', label: 'Pendente' },
];

// Reutilizando o SummaryCard e customStyles do seu exemplo
// (Idealmente, SummaryCard deveria ser um componente compartilhado, mas o incluirei aqui para completar o exemplo)
const SummaryCard = ({ title, value, subtitle, type }) => (
    <div className={`summary-card card-${type}`}>
        <p className="card-title">{title}</p>
        <p className="card-value">{value}</p>
        <p className="card-subtitle">{subtitle}</p>
    </div>
);
// Nota: Certifique-se de que `customStyles` seja importado ou definido, como no seu código de agendamentos.


// --- Componente 1: Analytics (Conteúdo da Aba "Analytics") ---
const AnalyticsContent = () => (
    <div className="analytics-content">
        {/* Atendimentos por Nacionalidade */}
        <div className="analytics-card chart-placeholder">
            <h3>Atendimentos por Nacionalidade</h3>
            <p className="chart-subtitle">Distribuição dos migrantes por país de origem</p>
            {/* Simulação de lista/gráfico, baseada na imagem */}
            <ul className="data-list">
                <li><span className="color-dot venezuela"></span>Venezuela <span className="value">1245 (43.7%)</span></li>
                <li><span className="color-dot colombia"></span>Colômbia <span className="value">567 (19.9%)</span></li>
                <li><span className="color-dot peru"></span>Peru <span className="value">398 (14%)</span></li>
                <li><span className="color-dot haiti"></span>Haiti <span className="value">287 (10.1%)</span></li>
                <li><span className="color-dot bolivia"></span>Bolívia <span className="value">189 (6.6%)</span></li>
                <li><span className="color-dot syria"></span>Síria <span className="value">161 (5.7%)</span></li>
            </ul>
        </div>

        {/* Serviços Mais Demandados */}
        <div className="analytics-card chart-placeholder">
            <h3>Serviços Mais Demandados</h3>
            <p className="chart-subtitle">Ranking dos serviços prestados</p>
            {/* Simulação de lista/gráfico, baseada na imagem */}
            <ul className="data-list">
                <li><span className="color-dot doc"></span>Documentação <span className="value">456 (36.3%)</span></li>
                <li><span className="color-dot juridica"></span>Orientação Jurídica <span className="value">298 (23.7%)</span></li>
                <li><span className="color-dot cpf"></span>Cadastro CPF <span className="value">267 (21.3%)</span></li>
                <li><span className="color-dot trabalho"></span>Carteira de Trabalho <span className="value">156 (12.4%)</span></li>
                <li><span className="color-dot auxilio"></span>Auxílio Emergencial <span className="value">79 (6.3%)</span></li>
            </ul>
        </div>
        
        {/* Tendências Mensais (Placeholder) */}
        <div className="full-width-section chart-placeholder">
            <h3>Tendências Mensais</h3>
            <p className="chart-subtitle">Evolução dos atendimentos ao longo do tempo</p>
            <div className="placeholder-chart">
                <p>Gráfico de Tendências Mensais</p>
            </div>
        </div>
    </div>
);

// --- Componente 2: Novo Relatório (Conteúdo da Aba "Gerar Relatório") ---
const NewReportContent = () => {
    // 🔑 O erro 1 estava aqui, na inicialização.
    // Certifique-se de que a importação de 'nacionalidadeOptions' está correta e que ela contém elementos.
    const initialNacionalidade = nacionalidadeOptions && nacionalidadeOptions.length > 0
        ? nacionalidadeOptions[0]
        : { value: 'Todas', label: 'Todas' }; // Fallback se a importação falhar.

    const [reportFilters, setReportFilters] = useState({
        dataInicio: '',
        dataFim: '',
        nacionalidade: initialNacionalidade, // Usa a variável inicializada
        servico: servicoOptions[0],
        situacao: situacaoOptions[0],
    });

    const handleGenerateReport = () => {
        // Lógica para gerar o relatório com base nos filtros
        console.log("Gerar Relatório com filtros:", reportFilters);
        alert('Relatório será gerado! (Ver console para filtros)');
    };

    return (
        <div className="new-report-content">
            <h3 className="section-title">Novo Relatório</h3>
            <p className="section-subtitle">Configure os filtros para gerar um relatório personalizado</p>

            <div className="report-filters-grid">
                
                <div className="form-group">
                    <label htmlFor="dataInicio">Data Início</label>
                    <input 
                        type="date" 
                        id="dataInicio" 
                        value={reportFilters.dataInicio}
                        onChange={(e) => setReportFilters({...reportFilters, dataInicio: e.target.value})}
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="dataFim">Data Fim</label>
                    <input 
                        type="date" 
                        id="dataFim"
                        value={reportFilters.dataFim}
                        onChange={(e) => setReportFilters({...reportFilters, dataFim: e.target.value})}
                    />
                </div>
                
                {/* Nacionalidade - CORREÇÃO DE VARIÁVEL APLICADA AQUI */}
                <div className="form-group">
                    <label>Nacionalidade</label>
                    <Select
                        options={nacionalidadeOptions}
                        placeholder="Todas as nacionalidades..."
                        isSearchable={true}
                        styles={customStyles}
                        // 🔑 CORREÇÃO: Usar reportFilters.nacionalidade
                        value={reportFilters.nacionalidade} 
                        // 🔑 CORREÇÃO: Usar setReportFilters
                        onChange={(selectedOption) => setReportFilters({ ...reportFilters, nacionalidade: selectedOption })}
                        isClearable={true}
                    />
                </div>
                
                {/* Serviço */}
                <div className="form-group">
                    <label>Serviço</label>
                    <Select
                        options={servicoOptions}
                        placeholder="Todos"
                        isSearchable={true}
                        styles={customStyles}
                        value={reportFilters.servico}
                        onChange={(selectedOption) => setReportFilters({...reportFilters, servico: selectedOption})}
                    />
                </div>

                {/* Situação */}
                <div className="form-group">
                    <label>Situação</label>
                    <Select
                        options={situacaoOptions}
                        placeholder="Todas"
                        isSearchable={false}
                        styles={customStyles}
                        value={reportFilters.situacao}
                        onChange={(selectedOption) => setReportFilters({...reportFilters, situacao: selectedOption})}
                    />
                </div>
            </div>
        </div>
    );
};

// --- Componente 3: Histórico (Conteúdo da Aba "Histórico") ---
const HistoryContent = () => {
    // Dados simulados do histórico de relatórios
    const historyData = [
        { id: 1, type: "Mensal", title: "Relatório Mensal - Janeiro 2024", count: 156, generatedBy: "Ana Costa", date: "31/01/2024" },
        { id: 2, type: "Demográfico", title: "Atendimentos por Nacionalidade", count: 423, generatedBy: "João Santos", date: "14/01/2024" },
        { id: 3, type: "Serviços", title: "Serviços Mais Demandados", count: 789, generatedBy: "Maria Silva", date: "09/01/2024" },
    ];

    const handleDownload = (reportTitle) => {
        alert(`Baixando o relatório: ${reportTitle}`);
    };

    return (
        <div className="history-content">
            <h3 className="section-title">Relatórios Anteriores</h3>
            <p className="section-subtitle">Histórico de relatórios gerados no sistema</p>

            <div className="report-history-list">
                {historyData.map(report => (
                    <div className="history-item" key={report.id}>
                        <div className="report-info">
                            <FiFileText size={24} className="report-icon" />
                            <div className="report-details">
                                <span className="report-title">{report.title}</span>
                                <span className="report-meta">
                                    <span className="report-type">{report.type}</span> 
                                    • {report.count} registros 
                                    • por {report.generatedBy}
                                    <br/>
                                    Gerado em {report.date}
                                </span>
                            </div>
                        </div>
                        <button className="btn btn-secondary" onClick={() => handleDownload(report.title)}>
                            <FiDownload size={16} /> Baixar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- Componente Principal Relatórios ---
const Relatorios = () => {
    const [activeTab, setActiveTab] = useState('Analytics'); // 'Gerar Relatório', 'Historico', 'Analytics'

    // Dados de resumo (fixos e baseados na imagem Analytics)
    const summaryData = [
        { title: "Total Migrantes", value: "2.847", subtitle: "Cadastrados no sistema", type: 'default' },
        { title: "Nacionalidades", value: "12", subtitle: "Países diferentes", type: 'default' },
        { title: "Serviços Prestados", value: "1.256", subtitle: "Este ano", type: 'default' },
        { title: "Taxa Documentação", value: "87%", subtitle: "Processos concluídos", type: 'default' },
    ];
    
    // Função para renderizar o conteúdo da aba ativa
    const renderContent = () => {
        switch (activeTab) {
            case 'Gerar Relatório':
                return <NewReportContent />;
            case 'Historico':
                return <HistoryContent />;
            case 'Analytics':
            default:
                return <AnalyticsContent />;
        }
    };

    return (
        <div className="relatorios-page">
            
            {/* 1. Header (Título e Ações Globais) */}
            <header className="page-header">
                <div className="page-title-group">
                    <h1>Relatórios</h1>
                    <p className="page-subtitle">Geração e análise de relatórios customizáveis</p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-secondary open-powerbi-btn">
                        <FiBarChart2 size={16} /> Abrir Power BI
                    </button>
                    <button 
                        className="btn btn-primary" 
                        onClick={() => setActiveTab('Gerar Relatório')} // Força a navegação para a aba de geração
                    >
                        <FiFileText size={16} /> Gerar Relatório
                    </button>
                </div>
            </header>

            {/* 2. Cards de Resumo */}
            <section className="summary-cards-container">
                {summaryData.map((data, index) => (
                    <SummaryCard key={index} {...data} />
                ))}
            </section>

            {/* 3. Navegação por Abas e Conteúdo */}
            <section className="report-content-container">
                
                {/* Navegação por Abas */}
                <div className="tabs-navigation">
                    <button 
                        className={`tab-btn ${activeTab === 'Gerar Relatório' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('Gerar Relatório')}
                    >
                        Gerar Relatório
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'Historico' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('Historico')}
                    >
                        Histórico
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'Analytics' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('Analytics')}
                    >
                        Analytics
                    </button>
                </div>

                {/* Conteúdo da Aba Ativa */}
                <div className="tab-content">
                    {renderContent()}
                </div>

            </section>
        </div>
    );
};

export default Relatorios;