import React from 'react';
import { FiTrendingUp, FiTrendingDown, FiUser, FiCalendar, FiCheckCircle } from 'react-icons/fi';

const SummaryCard = ({ title, value, detail, trend, type }) => {
    let trendIcon = null;
    let trendClass = '';

    if (trend) {
        if (trend.includes('+')) {
            trendIcon = <FiTrendingUp size={14} />;
            trendClass = 'trend-up';
        } else if (trend.includes('-')) {
            trendIcon = <FiTrendingDown size={14} />;
            trendClass = 'trend-down';
        }
    }

    // Ícones simulados para melhor visualização
    let icon = null;
    if (title.includes("Migrantes")) icon = <FiUser size={24} color="#007bff" />;
    else if (title.includes("Agendamentos")) icon = <FiCalendar size={24} color="#28a745" />;
    else if (title.includes("Concluídos")) icon = <FiCheckCircle size={24} color="#17a2b8" />;

    return (
        <div className="summary-card">
            <div className="card-header">
                <span className="card-icon">{icon}</span>
                <p className="card-title">{title}</p>
            </div>
            <div className="card-body">
                <span className="card-value">{value}</span>
                {trend && (
                    <span className={`card-trend ${trendClass}`}>
                        {trendIcon} {trend}
                    </span>
                )}
            </div>
            <p className="card-detail">{detail}</p>
        </div>
    );
};

export default SummaryCard;