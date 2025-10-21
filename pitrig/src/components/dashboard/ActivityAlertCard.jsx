import React from 'react';
import { FiClock, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

// Componente para uma única atividade
const ActivityItem = ({ type, description, user, time }) => {
    let badgeClass = '';
    if (type === 'Novo agendamento') badgeClass = 'activity-new';
    else if (type === 'Atendimento concluído') badgeClass = 'activity-success';
    else if (type === 'Relatório gerado') badgeClass = 'activity-info';
    else if (type === 'Cadastro atualizado') badgeClass = 'activity-update';

    return (
        <div className="activity-item">
            <div className="activity-details">
                <span className={`activity-badge ${badgeClass}`}>{type}</span>
                <p className="activity-description">
                    <span className="activity-user">{user}</span>
                </p>
            </div>
            <span className="activity-time">{time}</span>
        </div>
    );
};

// Componente para um único alerta
const AlertItem = ({ type, message, actionText }) => {
    let alertClass = '';
    let icon;
    if (type === 'Atenção') {
        alertClass = 'alert-warning';
        icon = <FiAlertTriangle size={18} />;
    } else if (type === 'Sucesso') {
        alertClass = 'alert-success';
        icon = <FiCheckCircle size={18} />;
    }

    return (
        <div className={`alert-item ${alertClass}`}>
            <div className="alert-content">
                <span className="alert-type">{type}</span>
                <p className="alert-message">{message}</p>
            </div>
        </div>
    );
};


const ActivityAlertCard = () => {
    // Dados Mockados
    const recentActivities = [
        { type: "Novo agendamento", user: "Maria Silva", time: "há 5 min" },
        { type: "Atendimento concluído", user: "João Santos", time: "há 12 min" },
        { type: "Relatório gerado", user: "Ana Costa", time: "há 20 min" },
        { type: "Cadastro atualizado", user: "Pedro Lima", time: "há 35 min" },
    ];

    const systemAlerts = [
        { type: "Atenção", message: "12 agendamentos sem confirmação" },
        { type: "Sucesso", message: "Backup realizado com sucesso" },
    ];

    return (
        <div className="bottom-row-cards">
            {/* Card de Atividades Recentes */}
            <div className="activities-card">
                <div className="card-header">
                    <FiClock size={20} color="#343a40" />
                    <h2>Atividades Recentes</h2>
                </div>
                <p className="subtitle">Últimas ações realizadas no sistema</p>
                <div className="activities-list">
                    {recentActivities.map((activity, index) => (
                        <ActivityItem key={index} {...activity} />
                    ))}
                </div>
                <button className="btn btn-secondary full-width">Ver Todas as Atividades</button>
            </div>

            {/* Card de Alertas do Sistema */}
            <div className="alerts-card">
                <div className="card-header">
                    <h2>Alertas do Sistema</h2>
                </div>
                <p className="subtitle">Notificações importantes</p>
                <div className="alerts-list">
                    {systemAlerts.map((alert, index) => (
                        <AlertItem key={index} {...alert} />
                    ))}
                </div>
                <button className="btn btn-secondary full-width action-bottom">Gerenciar Alertas</button>
            </div>
        </div>
    );
};

export default ActivityAlertCard;