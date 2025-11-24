import React, { useState, useMemo } from 'react';
import '../css/Atendimento.css';
import { FiSearch, FiFilter, FiPlus, FiEye, FiX, FiCheck } from 'react-icons/fi';
import Select from 'react-select';
import NewAtendimentoModal from '../components/NewAtendimentoModal'; // Caminho presumido: '../components/'

// Dados simulados para o select de nacionalidade (simplificado para o exemplo)
const nacionalidadeOptions = [
    { value: 'Venezuela', label: 'Venezuela' },
    { value: 'Colombia', label: 'Colômbia' },
    { value: 'Peru', label: 'Peru' },
    { value: 'Brasil', label: 'Brasil' },
    { value: 'China', label: 'China' },
];

// Dados simulados da tabela (migrantes) - ADAPTADO DA IMAGEM
const atendimentoData = [
    { id: 1, nome: "Maria Silva Santos", documento: "123.456.789-00", nacionalidade: "Venezuela", dataAtendimento: "14/01/2024", situacao: "Documentado", atendente: "Ana Costa" },
    { id: 2, nome: "Carlos Mendoza", documento: "987.654.321-00", nacionalidade: "Colombia", dataAtendimento: "15/01/2024", situacao: "Em Processo", atendente: "João Santos" },
    { id: 3, nome: "Ana Rodriguez", documento: "456.789.123-00", nacionalidade: "Peru", dataAtendimento: "15/01/2024", situacao: "Em Processo", atendente: "Pedro Lima" },
    { id: 4, nome: "José Oliveira", documento: "111.222.333-44", nacionalidade: "Brasil", dataAtendimento: "16/01/2024", situacao: "Documentado", atendente: "Ana Costa" },
];

// Opções para o filtro de Situação
const situacaoOptions = [
    { value: 'Documentado', label: 'Documentado' },
    { value: 'Em Processo', label: 'Em Processo' },
    { value: 'Aguardando docs', label: 'Aguardando docs' },
];

// --- Estilos Customizados para React-Select ---
const customStyles = {
    control: (provided, state) => ({
        ...provided,
        minHeight: '40px',
        height: '40px',
        padding: '0 5px',
        borderRadius: '6px',
        borderColor: state.isFocused ? '#ced4da' : '#ced4da',
        boxShadow: state.isFocused ? '0 0 0 3px rgba(0, 123, 255, 0.25)' : 'inset 0 1px 2px rgba(0, 0, 0, 0.075)',
        backgroundColor: state.isFocused ? '#fff' : '#f8f9fa',
        '&:hover': { borderColor: state.isFocused ? '#ced4da' : '#ced4da' },
    }),
    input: (provided) => ({ ...provided, boxShadow: 'none !important', outline: 'none !important', border: 'none !important' }),
    placeholder: (provided) => ({ ...provided, color: '#adb5bd' }),
    singleValue: (provided) => ({ ...provided, color: '#495057' }),
    option: (provided, state) => ({
        ...provided,
        color: '#343a40',
        backgroundColor: state.isFocused ? '#e9ecef' : 'white',
        '&:active': { backgroundColor: '#007bff', color: 'white' },
    }),
    indicatorSeparator: (provided) => ({ ...provided, display: 'none' }),
    dropdownIndicator: (provided) => ({ ...provided, color: '#6c757d', padding: '8px' }),
    menu: (provided) => ({ ...provided, zIndex: 2000 }),
};

// --- Componente para o Badge de Situação (ADAPTADO) ---
const SituacaoBadge = ({ situacao }) => {
    let className = 'situacao-badge';
    if (situacao === 'Documentado') {
        className += ' situacao-documentado'; // Cor verde
    } else if (situacao === 'Em Processo') {
        className += ' situacao-processo'; // Cor laranja/amarela
    } else if (situacao === 'Aguardando docs') {
        className += ' situacao-aguardando'; // Outra cor se necessário
    }
    return <span className={className}>{situacao}</span>;
};

// --- Componente para o Card de Resumo (ADAPTADO) ---
const SummaryCard = ({ title, value, subtitle, type }) => (
    <div className={`summary-card card-${type}`}>
        <p className="card-title">{title}</p>
        <p className="card-value">{value}</p>
        <p className="card-subtitle">{subtitle}</p>
    </div>
);


// --- Componente Modal de Filtro (ADAPTADO) ---
const FilterModal = ({ isOpen, onClose, filters, setFilters, applyFilters, clearFilters }) => {
    if (!isOpen) return null;

    const [tempFilters, setTempFilters] = useState(filters);

    const handleApply = () => {
        applyFilters(tempFilters);
        onClose();
    };

    const handleClear = () => {
        const clearedFilters = {
            dataAtendimento: '',
            nacionalidade: null,
            situacao: null,
        };
        setTempFilters(clearedFilters);
        clearFilters(clearedFilters);
        onClose();
    };


    return (
        <div className="modal-overlay">
            <div className="filter-modal-content">
                <div className="modal-header">
                    <h2>Filtros</h2>
                    <button className="close-btn" onClick={onClose}><FiX size={24} /></button>
                </div>

                <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
                    {/* Filtro por Data */}
                    <div className="form-group">
                        <label>Data de Atendimento</label>
                        <input
                            type="date"
                            value={tempFilters.dataAtendimento}
                            onChange={(e) => setTempFilters({ ...tempFilters, dataAtendimento: e.target.value })}
                        />
                    </div>

                    {/* Filtro por Nacionalidade */}
                    <div className="form-group">
                        <label>Nacionalidade</label>
                        <Select
                            options={nacionalidadeOptions}
                            placeholder="Todas as nacionalidades..."
                            isSearchable={true}
                            styles={customStyles}
                            value={tempFilters.nacionalidade}
                            onChange={(selectedOption) => setTempFilters({ ...tempFilters, nacionalidade: selectedOption })}
                            isClearable={true}
                        />
                    </div>

                    {/* Filtro por Situação */}
                    <div className="form-group">
                        <label>Situação</label>
                        <Select
                            options={situacaoOptions}
                            placeholder="Todas as situações..."
                            isSearchable={false}
                            styles={customStyles}
                            value={tempFilters.situacao}
                            onChange={(selectedOption) => setTempFilters({ ...tempFilters, situacao: selectedOption })}
                            isClearable={true}
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn btn-secondary" onClick={handleClear}>
                            Limpar Filtros
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleApply}>
                            <FiCheck size={16} /> Aplicar Filtros
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// --- Componente Principal ATENDIMENTO ---
const Atendimento = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    // Estado para o Novo Atendimento Modal
    const [isNewAtendimentoModalOpen, setIsNewAtendimentoModalOpen] = useState(false); 

    const [filters, setFilters] = useState({
        dataAtendimento: '', // string YYYY-MM-DD
        nacionalidade: null, // objeto { value, label }
        situacao: null, // objeto { value, label }
    });

    const openFilterModal = () => setIsFilterModalOpen(true);
    const closeFilterModal = () => setIsFilterModalOpen(false);
    
    // Funções para controlar o Novo Atendimento Modal
    const openNewAtendimentoModal = () => setIsNewAtendimentoModalOpen(true);
    const closeNewAtendimentoModal = () => setIsNewAtendimentoModalOpen(false);


    const applyFilters = (newFilters) => {
        setFilters(newFilters);
    };

    const clearFilters = (clearedFilters) => {
        setFilters(clearedFilters);
    };

    // Lógica de Filtragem e Pesquisa combinada
    const filteredAtendimento = useMemo(() => {
        let list = atendimentoData;

        // 1. Filtrar por Pesquisa (Nome ou Documento)
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            list = list.filter(item =>
                item.nome.toLowerCase().includes(lowerCaseSearchTerm) ||
                item.documento.includes(searchTerm)
            );
        }

        // 2. Filtrar por Data de Atendimento
        if (filters.dataAtendimento) {
            // Converte YYYY-MM-DD para DD/MM/YYYY para a simulação
            const filteredDate = filters.dataAtendimento.split('-').reverse().join('/'); 
            list = list.filter(item => item.dataAtendimento === filteredDate);
        }

        // 3. Filtrar por Nacionalidade
        if (filters.nacionalidade) {
            list = list.filter(item => item.nacionalidade === filters.nacionalidade.value);
        }

        // 4. Filtrar por Situação
        if (filters.situacao) {
            list = list.filter(item => item.situacao === filters.situacao.value);
        }

        return list;
    }, [searchTerm, filters]);


    // Dados de resumo (ADAPTADOS DA IMAGEM)
    const summaryData = [
        { title: "Total Atendimentos", value: "2", subtitle: "Este mês", type: 'default' },
        { title: "Documentados", value: "1", subtitle: "Processo concluído", type: 'default' },
        { title: "Em Processo", value: "1", subtitle: "Aguardando docs", type: 'default' },
        { title: "Nacionalidades", value: "2", subtitle: "Países diferentes", type: 'default' },
    ];

    // Verifica se algum filtro (além da pesquisa) está ativo para destacar o botão
    const areFiltersActive = filters.dataAtendimento || filters.nacionalidade || filters.situacao;


    return (
        <div className="atendimento-page">

            {/* 1. Título e Botão */}
            <header className="page-header">
                <div className="page-title-group">
                    <h1>Atendimento</h1>
                    <p className="page-subtitle">Cadastro completo e registro de atendimentos</p>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={openNewAtendimentoModal} // Chama a função para abrir o modal
                >
                    <FiPlus size={16} /> Novo Atendimento
                </button>
            </header>

            {/* Modal de Filtros */}
            <FilterModal
                isOpen={isFilterModalOpen}
                onClose={closeFilterModal}
                filters={filters}
                setFilters={setFilters}
                applyFilters={applyFilters}
                clearFilters={clearFilters}
            />
            
            {/* NOVO MODAL DE ATENDIMENTO INTEGRADO */}
            <NewAtendimentoModal
                isOpen={isNewAtendimentoModalOpen}
                onClose={closeNewAtendimentoModal}
            />


            {/* 2. Cards de Resumo */}
            <section className="summary-cards-container">
                {summaryData.map((data, index) => (
                    <SummaryCard key={index} {...data} />
                ))}
            </section>

            {/* Linha horizontal para separar visualmente as seções */}
            <hr className="divider" />

            {/* 3. Lista de Migrantes (Container Principal) */}
            <section className="atendimento-list-container">

                {/* Título e Ações */}
                <div className="list-header">
                    <div className="list-title-group">
                        <h2>Migrantes Cadastrados</h2>
                        <p className="list-subtitle">Histórico completo de atendimentos realizados</p>
                    </div>

                    {/* Barra de Pesquisa e Filtros */}
                    <div className="list-actions">
                        <div className="search-input-group">
                            <FiSearch className="search-icon" size={18} />
                            <input
                                type="text"
                                placeholder="Buscar por nome ou documento."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <button
                            className={`btn ${areFiltersActive ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={openFilterModal}
                        >
                            <FiFilter size={16} /> Filtros {areFiltersActive && <FiCheck size={16} />}
                        </button>
                    </div>
                </div>

                {/* Tabela de Dados */}
                <div className="atendimento-table-wrapper">
                    <table className="atendimento-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Documento</th>
                                <th>Nacionalidade</th>
                                <th>Data Atendimento</th>
                                <th>Situação</th>
                                <th>Atendente</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Mapeia os dados FILTRADOS */}
                            {filteredAtendimento.length > 0 ? (
                                filteredAtendimento.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.nome}</td>
                                        <td>{item.documento}</td>
                                        <td>{item.nacionalidade}</td>
                                        <td>{item.dataAtendimento}</td>
                                        <td><SituacaoBadge situacao={item.situacao} /></td>
                                        <td>{item.atendente}</td>
                                        <td>
                                            <button className="btn-actions" aria-label="Ver Detalhes">
                                                <FiEye size={18} /> 
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center', padding: '30px' }}>
                                        Nenhum atendimento encontrado com os filtros e termos de pesquisa atuais.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default Atendimento;