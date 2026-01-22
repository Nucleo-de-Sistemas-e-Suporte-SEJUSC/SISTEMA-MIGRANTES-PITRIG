import React, { useState } from 'react';
import { FiClock, FiAlertTriangle, FiCheckCircle, FiX } from 'react-icons/fi';

// ------------------- MODAL GENÉRICO -------------------
const Modal = ({ title, children, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <div className="modal-header">
                    <h3>{title}</h3>
                    <button className="modal-close" onClick={onClose}>
                        <FiX size={20} />
                    </button>
                </div>
                <div className="modal-content">{children}</div>
            </div>
        </div>
    );
};

// ------------------- COMPONENTES EXISTENTES -------------------
const ActivityItem = ({ type, user, time }) => {
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

const AlertItem = ({ type, message }) => {
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

// ------------------- COMPONENTE PRINCIPAL -------------------
const ActivityAlertCard = () => {
    const [showActivitiesModal, setShowActivitiesModal] = useState(false);
    const [showAlertsModal, setShowAlertsModal] = useState(false);

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
        <>
            <div className="bottom-row-cards">
                {/* Card Atividades */}
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

                    <button
                        className="btn btn-secondary full-width"
                        onClick={() => setShowActivitiesModal(true)}
                    >
                        Ver Todas as Atividades
                    </button>
                </div>

                {/* Card Alertas */}
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

                    <button
                        className="btn btn-secondary full-width action-bottom"
                        onClick={() => setShowAlertsModal(true)}
                    >
                        Gerenciar Alertas
                    </button>
                </div>
            </div>

            {/* ---------------- Modais ------------------- */}

            {showActivitiesModal && (
                <Modal title="Todas as Atividades" onClose={() => setShowActivitiesModal(false)}>
                    {recentActivities.map((a, i) => (
                        <ActivityItem key={i} {...a} />
                    ))}
                </Modal>
            )}

            {showAlertsModal && (
                <Modal title="Gerenciar Alertas" onClose={() => setShowAlertsModal(false)}>
                    {systemAlerts.map((alert, i) => (
                        <div key={i} className="alert-manage-row">
                            <AlertItem {...alert} />
                            <button className="btn-small">Excluir</button>
                        </div>
                    ))}
                </Modal>
            )}
        </>
    );
};

export default ActivityAlertCard;
