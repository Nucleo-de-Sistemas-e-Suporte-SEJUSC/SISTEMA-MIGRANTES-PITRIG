import React from 'react';
import { FiUsers, FiCalendar, FiFileText, FiArrowUp } from 'react-icons/fi';

// Componente auxiliar para renderizar Perfis Demográficos
const DemographicTable = ({ title, data }) => (
    <div className="demographic-table">
        <h5 className="demographic-title">{title}</h5>
        {Object.entries(data).map(([key, value]) => (
            <div key={key} className="table-row">
                <span className="key">{key}</span>
                <span className="value">{value}</span>
            </div>
        ))}
    </div>
);

const IndicadoresACNUR = () => {
    // Dados Mockados
    const demographicData = {
        gender: {
            "Masculino": "1489 (52.3%)",
            "Feminino": "1289 (45.3%)",
            "Outro": "69 (2.4%)"
        },
        age: {
            "0-17 anos": "892 (31.3%)",
            "18-35 anos": "1245 (43.7%)",
            "36-59 anos": "567 (19.9%)",
            "60+ anos": "143 (5.0%)"
        },
        nationality: {
            "Venezuela": "1245 (43.7%)",
            "Colômbia": "567 (19.9%)",
            "Peru": "398 (14%)",
            "Haiti": "287 (10.1%)",
            // ... mais países
        }
    };

    return (
        <div className="tab-content indicadores-acnur-content">
            {/* Seção 1: Perfil Demográfico */}
            <div className="bi-card full-width">
                <div className="card-header-icon">
                    <FiUsers size={20} />
                    <h3>Perfil Demográfico</h3>
                </div>
                <p className="card-subtitle">Distribuição por gênero, idade e nacionalidade</p>
                <div className="demographic-data-container">
                    <DemographicTable title="Por Gênero" data={demographicData.gender} />
                    <DemographicTable title="Por Faixa Etária" data={demographicData.age} />
                    <DemographicTable title="Por Nacionalidade" data={demographicData.nationality} />
                </div>
            </div>

            {/* Seção 2: Volume de Atendimentos e Taxa de Documentação */}
            <div className="bi-card-row">
                {/* Card Volume de Atendimentos */}
                <div className="bi-card half-width">
                    <div className="card-header-icon">
                        <FiCalendar size={20} />
                        <h3>Volume de Atendimentos</h3>
                    </div>
                    <p className="card-subtitle">Métricas de atendimento no período</p>
                    <div className="volume-metrics">
                        <div className="metric-box">
                            <span className="metric-value">156</span>
                            <span className="metric-label">Total no Mês</span>
                            <div className="metric-trend success-text">
                                Crescimento <FiArrowUp size={12} /> +12%
                            </div>
                        </div>
                        <div className="metric-box">
                            <span className="metric-value">5.2</span>
                            <span className="metric-label">Média Diária</span>
                        </div>
                        <div className="metric-box">
                            <span className="metric-value">87%</span>
                            <span className="metric-label">Taxa Comparecimento</span>
                        </div>
                    </div>
                </div>

                {/* Card Taxa de Documentação */}
                <div className="bi-card half-width">
                    <div className="card-header-icon">
                        <FiFileText size={20} />
                        <h3>Taxa de Documentação</h3>
                    </div>
                    <p className="card-subtitle">Status dos processos de documentação</p>
                    <div className="documentation-metrics">
                        <div className="doc-rate">
                            <span className="rate-value success-text">87%</span>
                            <span className="rate-label">Processos Concluídos</span>
                        </div>
                        <div className="doc-status-list">
                            <div className="status-item">
                                <span className="status-label">Documentados</span>
                                <span className="status-count success-bg">2478</span>
                            </div>
                            <div className="status-item">
                                <span className="status-label">Em Processo</span>
                                <span className="status-count warning-bg">269</span>
                            </div>
                            <div className="status-item">
                                <span className="status-label">Pendentes</span>
                                <span className="status-count danger-bg">90</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndicadoresACNUR;