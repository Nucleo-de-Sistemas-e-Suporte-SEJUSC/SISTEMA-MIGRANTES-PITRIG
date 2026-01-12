import React, { useState, useMemo } from 'react';
import '../css/Atendimento.css'; 
import { FiSearch, FiFilter, FiPlus, FiEye, FiX, FiCheck } from 'react-icons/fi';
import Select from 'react-select';
import NewAtendimentoModal from '../components/NewAtendimentoModal'; 

// --- DADOS MOCKADOS ---
const nacionalidadeOptions = [
    { value: 'Venezuela', label: 'Venezuela' },
    { value: 'Colombia', label: 'Colômbia' },
    { value: 'Peru', label: 'Peru' },
    { value: 'Brasil', label: 'Brasil' },
    { value: 'China', label: 'China' },
];

const atendimentoData = [
    { 
        id: 1, 
        nome: "Maria Silva Santos", 
        documento: "123.456.789-00", 
        nacionalidade: "Venezuela", 
        dataAtendimento: "14/01/2024", 
        situacao: "Documentado", 
        atendente: "Ana Costa",
        idade: 32,
        genero: "Feminino",
        telefone: "(92) 99123-4567",
        endereco: "Rua das Flores, 123 - Centro",
        servicos: ["Regularização Migratória", "Emissão de CPF"]
    },
    { 
        id: 2, 
        nome: "Carlos Mendoza", 
        documento: "987.654.321-00", 
        nacionalidade: "Colombia", 
        dataAtendimento: "15/01/2024", 
        situacao: "Em Processo", 
        atendente: "João Santos",
        idade: 28,
        genero: "Masculino",
        telefone: "(92) 98888-1111",
        endereco: "Av. Eduardo Ribeiro, 400",
        servicos: ["Solicitação de Refúgio"]
    },
];

const situacaoOptions = [
    { value: 'Documentado', label: 'Documentado' },
    { value: 'Em Processo', label: 'Em Processo' },
    { value: 'Aguardando docs', label: 'Aguardando docs' },
];

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        minHeight: '40px',
        height: '40px',
        borderRadius: '6px',
        backgroundColor: state.isFocused ? '#fff' : '#f8f9fa',
    }),
    dropdownIndicator: (provided) => ({ ...provided, color: '#6c757d', padding: '8px' }),
    menu: (provided) => ({ ...provided, zIndex: 2000 }),
};

// --- COMPONENTES VISUAIS ---
const SituacaoBadge = ({ situacao }) => {
    let className = 'situacao-badge';
    if (situacao === 'Documentado') className += ' situacao-documentado';
    else if (situacao === 'Em Processo') className += ' situacao-processo';
    else if (situacao === 'Aguardando docs') className += ' situacao-aguardando';
    return <span className={className}>{situacao}</span>;
};

const SummaryCard = ({ title, value, subtitle, type }) => (
    <div className={`summary-card card-${type}`}>
        <p className="card-title">{title}</p>
        <p className="card-value">{value}</p>
        <p className="card-subtitle">{subtitle}</p>
    </div>
);

// --- MODAL DE FILTROS (Mantido) ---
const FilterModal = ({ isOpen, onClose, filters, setFilters, applyFilters, clearFilters }) => {
    if (!isOpen) return null;
    const [tempFilters, setTempFilters] = useState(filters);

    const handleApply = () => { applyFilters(tempFilters); onClose(); };
    const handleClear = () => {
        const clearedFilters = { dataAtendimento: '', nacionalidade: null, situacao: null };
        setTempFilters(clearedFilters); clearFilters(clearedFilters); onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="filter-modal-content">
                <div className="modal-header">
                    <h2>Filtros</h2>
                    <button className="close-btn" onClick={onClose}><FiX size={24} /></button>
                </div>
                <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label>Data de Atendimento</label>
                        <input type="date" value={tempFilters.dataAtendimento} onChange={(e) => setTempFilters({ ...tempFilters, dataAtendimento: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Nacionalidade</label>
                        <Select options={nacionalidadeOptions} styles={customStyles} value={tempFilters.nacionalidade} onChange={(opt) => setTempFilters({ ...tempFilters, nacionalidade: opt })} isClearable />
                    </div>
                    <div className="form-group">
                        <label>Situação</label>
                        <Select options={situacaoOptions} styles={customStyles} value={tempFilters.situacao} onChange={(opt) => setTempFilters({ ...tempFilters, situacao: opt })} isClearable />
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="btn btn-secondary" onClick={handleClear}>Limpar</button>
                        <button type="button" className="btn btn-primary" onClick={handleApply}><FiCheck size={16} /> Aplicar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// =================================================================
// MODAL DE DETALHES (COM ESTILOS INLINE PARA FORÇAR VISIBILIDADE)
// =================================================================
const AtendimentoDetailsModal = ({ isOpen, data, onClose }) => {
    // Log para depuração: Abra o console do navegador (F12) para ver se isso aparece
    console.log("Tentando renderizar modal. IsOpen:", isOpen, "Data:", data);

    if (!isOpen || !data) return null;

    // Estilos inline para garantir que o modal apareça acima de tudo
    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fundo escuro transparente
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999999, // Z-index altíssimo para ficar na frente
        backdropFilter: 'blur(2px)' // Efeito de desfoque opcional
    };

    const contentStyle = {
        backgroundColor: '#ffffff',
        padding: '30px',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '600px',
        position: 'relative',
        boxShadow: '0 5px 30px rgba(0,0,0,0.3)',
        zIndex: 1000000, // Maior que o overlay
        animation: 'none' // Remove animações que podem estar travando
    };

    return (
        <div style={overlayStyle} onClick={onClose}>
            {/* stopPropagation evita que clicar no modal feche ele */}
            <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
                
                {/* Cabeçalho */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#333' }}>Detalhes do Atendimento</h2>
                        <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '0.9rem' }}>Informações completas do migrante</p>
                    </div>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>
                        <FiX />
                    </button>
                </div>

                {/* Grid de Informações */}
                <div className="details-grid"> {/* Mantemos a classe para o Grid, mas se falhar, o conteúdo ainda aparece */}
                    <InfoRow label="Nome" value={data.nome} />
                    <InfoRow label="Documento" value={data.documento} />
                    <InfoRow label="Nacionalidade" value={data.nacionalidade} />
                    <InfoRow label="Idade" value={data.idade ? `${data.idade} anos` : '—'} />
                    <InfoRow label="Gênero" value={data.genero} />
                    <InfoRow label="Situação" value={data.situacao} />
                </div>

                {/* Serviços */}
                <div style={{ marginTop: '20px', borderTop: '1px dashed #eee', paddingTop: '15px' }}>
                    <strong style={{ display: 'block', fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', marginBottom: '10px' }}>Serviços Prestados</strong>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {data.servicos && data.servicos.length > 0 ? (
                            data.servicos.map((servico, index) => (
                                <span key={index} style={{ background: '#e9ecef', padding: '5px 12px', borderRadius: '15px', fontSize: '0.85rem', color: '#495057' }}>
                                    {servico}
                                </span>
                            ))
                        ) : (<span>Nenhum serviço registrado.</span>)}
                    </div>
                </div>

                {/* Contato e Endereço */}
                <div style={{ marginTop: '20px' }}>
                    <InfoRow label="Contato" value={data.telefone} />
                    <div style={{ height: '10px' }}></div>
                    <InfoRow label="Endereço" value={data.endereco} />
                </div>

                {/* Botão Fechar */}
                <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button 
                        onClick={onClose}
                        className="btn btn-secondary"
                        style={{ padding: '8px 20px' }}
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};

// Componente auxiliar simples para linha de informação
const InfoRow = ({ label, value }) => (
    <div style={{ marginBottom: '10px' }}>
        <strong style={{ display: 'block', fontSize: '0.75rem', color: '#888', textTransform: 'uppercase' }}>{label}</strong>
        <p style={{ margin: 0, fontWeight: '500', color: '#333' }}>{value || '—'}</p>
    </div>
);


// --- COMPONENTE PRINCIPAL ---
const Atendimento = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isNewAtendimentoModalOpen, setIsNewAtendimentoModalOpen] = useState(false);
    
    // Estados do Modal de Detalhes
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedAtendimento, setSelectedAtendimento] = useState(null);

    const [filters, setFilters] = useState({ dataAtendimento: '', nacionalidade: null, situacao: null });

    // Função chamada ao clicar no OLHO
    const openDetailsModal = (item) => {
        console.log("Clicou no olho para:", item.nome); // Log de Debug
        setSelectedAtendimento(item);
        setIsDetailsModalOpen(true);
    };

    const filteredAtendimento = useMemo(() => {
        let list = atendimentoData;
        if (searchTerm) {
            const t = searchTerm.toLowerCase();
            list = list.filter(i => i.nome.toLowerCase().includes(t) || i.documento.includes(searchTerm));
        }
        if (filters.dataAtendimento) {
            const d = filters.dataAtendimento.split('-').reverse().join('/');
            list = list.filter(i => i.dataAtendimento === d);
        }
        if (filters.nacionalidade) list = list.filter(i => i.nacionalidade === filters.nacionalidade.value);
        if (filters.situacao) list = list.filter(i => i.situacao === filters.situacao.value);
        return list;
    }, [searchTerm, filters]);

    const areFiltersActive = filters.dataAtendimento || filters.nacionalidade || filters.situacao;

    return (
        <div className="atendimento-page">
            <header className="page-header">
                <div className="page-title-group">
                    <h1>Atendimento</h1>
                    <p className="page-subtitle">Cadastro completo e registro de atendimentos</p>
                </div>
                <button className="btn btn-primary" onClick={() => setIsNewAtendimentoModalOpen(true)}>
                    <FiPlus size={16} /> Novo Atendimento
                </button>
            </header>

            {/* MODAIS */}
            <FilterModal 
                isOpen={isFilterModalOpen} 
                onClose={() => setIsFilterModalOpen(false)} 
                filters={filters} setFilters={setFilters} 
                applyFilters={setFilters} clearFilters={setFilters} 
            />
            
            <NewAtendimentoModal 
                isOpen={isNewAtendimentoModalOpen} 
                onClose={() => setIsNewAtendimentoModalOpen(false)} 
            />

            {/* INSERINDO O MODAL DE DETALHES AQUI */}
            <AtendimentoDetailsModal 
                isOpen={isDetailsModalOpen}
                data={selectedAtendimento}
                onClose={() => {
                    console.log("Fechando modal");
                    setIsDetailsModalOpen(false);
                    setSelectedAtendimento(null);
                }}
            />

            <section className="summary-cards-container">
                <SummaryCard title="Total Atendimentos" value="2" subtitle="Este mês" type="default" />
                <SummaryCard title="Documentados" value="1" subtitle="Processo concluído" type="default" />
                <SummaryCard title="Em Processo" value="1" subtitle="Aguardando docs" type="default" />
                <SummaryCard title="Nacionalidades" value="2" subtitle="Países diferentes" type="default" />
            </section>

            <hr className="divider" />

            <section className="atendimento-list-container">
                <div className="list-header">
                    <div className="list-title-group">
                        <h2>Migrantes Cadastrados</h2>
                        <p className="list-subtitle">Histórico completo</p>
                    </div>
                    <div className="list-actions">
                        <div className="search-input-group">
                            <FiSearch className="search-icon" size={18} />
                            <input type="text" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                        <button className={`btn ${areFiltersActive ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setIsFilterModalOpen(true)}>
                            <FiFilter size={16} /> Filtros {areFiltersActive && <FiCheck size={16} />}
                        </button>
                    </div>
                </div>

                <div className="atendimento-table-wrapper">
                    <table className="atendimento-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Documento</th>
                                <th>Nacionalidade</th>
                                <th>Situação</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAtendimento.length > 0 ? (
                                filteredAtendimento.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.nome}</td>
                                        <td>{item.documento}</td>
                                        <td>{item.nacionalidade}</td>
                                        <td><SituacaoBadge situacao={item.situacao} /></td>
                                        <td>
                                            <button 
                                                className="btn-actions" 
                                                title="Ver Detalhes"
                                                onClick={() => openDetailsModal(item)}
                                                style={{ cursor: 'pointer' }} // Forçando cursor
                                            >
                                                <FiEye size={18} /> 
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>Nenhum registro.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default Atendimento;