import React, { useState, useMemo } from 'react';
import '../css/Agendamentos.css';
import {
  FiSearch,
  FiFilter,
  FiPlus,
  FiMoreHorizontal,
  FiX,
  FiCheck,
} from 'react-icons/fi';
import { nacionalidadeOptions } from '../data/paises';
import Select from 'react-select';

/* ================= DADOS ESTÁTICOS ================= */
const STATIC_APPOINTMENTS = [
  {
    id: 1,
    nome: 'Maria Silva Santos',
    documento: '123.456.789-00',
    dataHora: '14/01/2024\n09:00',
    dataUnix: '2024-01-14',
    nacionalidade: 'Venezuela',
    acompanhantes: 2,
    status: 'Confirmado',
  },
  {
    id: 2,
    nome: 'Carlos Mendoza',
    documento: '987.654.321-00',
    dataHora: '14/01/2024\n10:30',
    dataUnix: '2024-01-14',
    nacionalidade: 'Colombia',
    acompanhantes: 0,
    status: 'Pendente',
  },
];

/* ================= STATUS BADGE ================= */
const StatusBadge = ({ status }) => {
  let className = 'status-badge';
  if (status === 'Confirmado') className += ' status-confirmed';
  if (status === 'Pendente') className += ' status-pending';
  return <span className={className}>{status}</span>;
};

/* ================= SUMMARY CARD ================= */
const SummaryCard = ({ title, value, subtitle, type }) => (
  <div className={`summary-card card-${type}`}>
    <p className="card-title">{title}</p>
    <p className="card-value">{value}</p>
    <p className="card-subtitle">{subtitle}</p>
  </div>
);

const customStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: '40px',
    borderRadius: '6px',
  }),
  menu: (provided) => ({ ...provided, zIndex: 2000 }),
};

/* ================= COMPONENTE ================= */
export default function Agendamentos() {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    nome: '',
    documento: '',
    nacionalidade: null,
    data: '',
    hora: '',
    acompanhantes: 0,
  });

  /* ================= CRIAR AGENDAMENTO ================= */
  const handleCreate = (e) => {
    e.preventDefault();

    if (!form.nome || !form.documento || !form.data || !form.hora) {
      alert('Preencha os campos obrigatórios');
      return;
    }

    const novo = {
      id: Date.now(),
      nome: form.nome,
      documento: form.documento,
      nacionalidade: form.nacionalidade?.value || '',
      acompanhantes: Number(form.acompanhantes),
      status: 'Pendente',
      dataUnix: form.data,
      dataHora: `${form.data.split('-').reverse().join('/')}\n${form.hora}`,
    };

    setAppointments((prev) => [...prev, novo]);
    setIsModalOpen(false);
  };

  const allAppointments = [...STATIC_APPOINTMENTS, ...appointments];

  const filteredAppointments = useMemo(() => {
    if (!searchTerm) return allAppointments;
    const term = searchTerm.toLowerCase();
    return allAppointments.filter(
      (a) =>
        a.nome.toLowerCase().includes(term) ||
        a.documento.includes(searchTerm)
    );
  }, [allAppointments, searchTerm]);

  return (
    <div className="agendamentos-page">
      {/* ================= HEADER ================= */}
      <header className="page-header">
        <div className="page-title-group">
          <h1>Agendamentos</h1>
          <p className="page-subtitle">
            Gestão de agendamentos e pré-cadastros
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <FiPlus size={16} /> Novo Agendamento
        </button>
      </header>

      {/* ================= CARDS ================= */}
      <section className="summary-cards-container">
        <SummaryCard
          title="Agendamentos Hoje"
          value="0"
          subtitle="+2 desde ontem"
          type="default"
        />
        <SummaryCard
          title="Total Agendados"
          value={allAppointments.length}
          subtitle="Total no sistema"
          type="default"
        />
        <SummaryCard
          title="Taxa Comparecimento"
          value="87%"
          subtitle="Últimos 30 dias"
          type="default"
        />
        <SummaryCard
          title="Pendentes"
          value="12"
          subtitle="aguardando confirmação"
          type="warning"
        />
      </section>

      {/* ================= LISTA ================= */}
      <section className="appointments-list-container">
        <div className="list-header">
          <div className="list-title-group">
            <h2>Lista de Agendamentos</h2>
            <p className="list-subtitle">
              Gerencie todos os agendamentos do sistema
            </p>
          </div>

          <div className="list-actions">
            <div className="search-input-group">
              <FiSearch className="search-icon" />
              <input
                placeholder="Buscar por nome ou documento."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button className="btn btn-secondary">
              <FiFilter size={16} /> Filtros
            </button>
          </div>
        </div>

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
              {filteredAppointments.map((item) => (
                <tr key={item.id}>
                  <td>{item.nome}</td>
                  <td>{item.documento}</td>
                  <td className="data-hora">{item.dataHora}</td>
                  <td>{item.nacionalidade}</td>
                  <td>{item.acompanhantes}</td>
                  <td>
                    <StatusBadge status={item.status} />
                  </td>
                  <td>
                    <button className="btn-actions">
                      <FiMoreHorizontal />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= MODAL ================= */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Novo Agendamento</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <FiX />
              </button>
            </div>

            <form className="modal-form" onSubmit={handleCreate}>
              <div className="form-row">
                <div className="form-group">
                  <label>Nome *</label>
                  <input onChange={(e) => setForm({ ...form, nome: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Documento *</label>
                  <input onChange={(e) => setForm({ ...form, documento: e.target.value })} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Nacionalidade</label>
                  <Select
                    styles={customStyles}
                    options={nacionalidadeOptions}
                    onChange={(opt) => setForm({ ...form, nacionalidade: opt })}
                  />
                </div>
                <div className="form-group">
                  <label>Acompanhantes</label>
                  <input
                    type="number"
                    min="0"
                    defaultValue="0"
                    onChange={(e) =>
                      setForm({ ...form, acompanhantes: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Data *</label>
                  <input type="date" onChange={(e) => setForm({ ...form, data: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Hora *</label>
                  <input type="time" onChange={(e) => setForm({ ...form, hora: e.target.value })} />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Criar Agendamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
