import React from 'react';
import { FiExternalLink } from 'react-icons/fi';

// Componente auxiliar para cada Dashboard listado
const DashboardItem = ({ title, subtitle, views, updated, status, metrics }) => {
    const statusClass = status === 'Ativo' ? 'status-active' : 'status-maintenance';

    return (
        <div className="dashboard-item-card">
            <div className="card-header-bi">
                <h4>{title}</h4>
                <span className={`status-badge ${statusClass}`}>{status}</span>
            </div>
            <p className="subtitle">{subtitle}</p>

            <div className="details-row">
                <p className="detail-info">{views} visualizações</p>
                <p className="detail-info">Atualizado em {updated}</p>
                <button className="btn-open-bi">
                    Abrir Power BI <FiExternalLink size={14} />
                </button>
            </div>

            <div className="metrics-section">
                <p>Métricas Incluídas:</p>
                <div className="metric-tags">
                    {metrics.map(metric => (
                        <span key={metric} className="metric-tag">{metric}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const DashboardsPowerBI = () => {
    // Dados Mockados
    const dashboards = [
        {
            title: "Dashboard Principal ACNUR",
            subtitle: "Indicadores principais definidos pela ACNUR",
            views: 1247,
            updated: "15/01/2024, 10:30:00",
            status: "Ativo",
            metrics: ["Perfil Demográfico", "Volume de Atendimentos", "Taxa de Documentação"]
        },
        {
            title: "Análise Demográfica",
            subtitle: "Distribuição por gênero, idade e nacionalidade",
            views: 892,
            updated: "15/01/2024, 09:15:00",
            status: "Ativo",
            metrics: ["Gênero", "Faixa Etária", "Nacionalidades", "Composição Familiar"]
        },
        {
            title: "Eficiência Operacional",
            subtitle: "Métricas de desempenho e produtividade",
            views: 634,
            updated: "14/01/2024, 16:45:00",
            status: "Manutenção",
            metrics: ["Tempo Médio Atendimento", "Taxa Comparecimento", "Produtividade"]
        },
    ];

    return (
        <div className="tab-content dashboards-power-bi-content">
            {dashboards.map((dashboard, index) => (
                <DashboardItem key={index} {...dashboard} />
            ))}
        </div>
    );
};

export default DashboardsPowerBI;