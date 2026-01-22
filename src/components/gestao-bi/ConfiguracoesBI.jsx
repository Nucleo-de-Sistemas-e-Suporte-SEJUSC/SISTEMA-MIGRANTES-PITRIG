import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

const ConfiguracoesBI = () => {
    return (
        <div className="tab-content configurations-content">
            <div className="card-container">
                <h2>Configurações dos Dashboards</h2>
                <p className="card-subtitle">Gerencie a configuração dos indicadores e dashboards</p>

                {/* Seção 1: Atualização Automática */}
                <div className="bi-section">
                    <h3>Atualização Automática</h3>
                    <p>Configure a frequência de atualização dos dados</p>
                    <div className="form-group">
                        <select className="bi-dropdown">
                            <option value="diaria">Diária</option>
                            <option value="semanal">Semanal</option>
                            <option value="mensal">Mensal</option>
                        </select>
                    </div>
                </div>

                {/* Seção 2: Integração SISMIGRA */}
                <div className="bi-section">
                    <h3>Integração SISMIGRA</h3>
                    <p>Status da integração com o sistema SISMIGRA</p>
                    <div className="integration-status">
                        <span className="status-badge connected">Conectado</span>
                        <span className="status-detail">Última sincronização: há 2 horas</span>
                    </div>
                </div>

                {/* Seção 3: Notificações */}
                <div className="bi-section">
                    <h3>Notificações</h3>
                    <p>Configure alertas para indicadores críticos</p>
                    <div className="checkbox-group">
                        <label className="bi-checkbox">
                            <input type="checkbox" defaultChecked />
                            Alertar quando taxa de comparecimento {"<"} 80%
                        </label>
                        <label className="bi-checkbox">
                            <input type="checkbox" defaultChecked />
                            Alertar quando há mais de 50 agendamentos pendentes
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfiguracoesBI;