import React from 'react';
import { FiCalendar, FiUser, FiFileText, FiBarChart2, FiPlus, FiArrowRight, FiActivity } from 'react-icons/fi';

const ActionCard = ({ title, subtitle, iconType, infoCount, actions }) => {
    let icon;
    let infoLabel;

    switch (iconType) {
        case 'agendamento':
            icon = <FiCalendar size={24} color="#007bff" />;
            infoLabel = "Agendamentos Hoje";
            break;
        case 'atendimento':
            icon = <FiUser size={24} color="#007bff" />;
            infoLabel = "Atendimentos Pendentes";
            break;
        case 'relatorios':
            icon = <FiFileText size={24} color="#007bff" />;
            infoLabel = "Relatórios Gerados";
            break;
        case 'bi':
            icon = <FiBarChart2 size={24} color="#007bff" />;
            infoLabel = "Dashboards Ativos";
            break;
        default:
            icon = <FiActivity size={24} color="#007bff" />;
    }

    return (
        <div className="action-card">
            <div className="card-info-header">
                {icon}
                <div className="text-group">
                    <h3>{title}</h3>
                    <p>{subtitle}</p>
                </div>
            </div>

            <div className="card-info-body">
                {infoCount && (
                    <div className="info-badge-group">
                        <p>{infoLabel}</p>
                        <span className="info-badge">{infoCount}</span>
                    </div>
                )}
            </div>

            <div className="card-actions">
                {actions.map((action, index) => (
                    <button 
                        key={index} 
                        className={`btn btn-${action.type}`} 
                        onClick={action.handler}
                    >
                        {action.type === 'primary' && <FiPlus size={16} />}
                        {action.type === 'secondary' && <FiArrowRight size={16} />}
                        {action.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ActionCard;