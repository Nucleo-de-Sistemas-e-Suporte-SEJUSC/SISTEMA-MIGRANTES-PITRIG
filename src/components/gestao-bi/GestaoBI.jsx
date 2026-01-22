import React, { useState } from 'react';
import IndicadoresACNUR from './IndicadoresACNUR';
import DashboardsPowerBI from './DashboardsPowerBI';
import ConfiguracoesBI from './ConfiguracoesBI';
import '../../css/GestaoBI.css'; // Importa o CSS

const GestaoBI = () => {
    const [activeTab, setActiveTab] = useState('indicadores'); // Estado para a aba ativa

    const renderTabContent = () => {
        switch (activeTab) {
            case 'indicadores':
                return <IndicadoresACNUR />;
            case 'powerbi':
                return <DashboardsPowerBI />;
            case 'configuracoes':
                return <ConfiguracoesBI />;
            default:
                return <IndicadoresACNUR />;
        }
    };

    return (
        <div className="gestao-bi-page">
            <div className="bi-header">
                <div className="bi-title-group">
                    <h1>Gestão e Business Intelligence</h1>
                    <p>Dashboards e indicadores estratégicos definidos pela ACNUR</p>
                </div>
                
                <div className="bi-actions">
                    <select className="bi-dropdown period-select">
                        <option>Último Mês</option>
                        <option>Últimos 3 Meses</option>
                        <option>Último Ano</option>
                    </select>
                    <button className="btn-primary">Ver Relatórios</button>
                </div>
            </div>

            <div className="bi-tabs">
                <button 
                    className={`bi-tab-button ${activeTab === 'indicadores' ? 'active' : ''}`}
                    onClick={() => setActiveTab('indicadores')}
                >
                    Indicadores ACNUR
                </button>
                <button 
                    className={`bi-tab-button ${activeTab === 'powerbi' ? 'active' : ''}`}
                    onClick={() => setActiveTab('powerbi')}
                >
                    Dashboards Power BI
                </button>
                <button 
                    className={`bi-tab-button ${activeTab === 'configuracoes' ? 'active' : ''}`}
                    onClick={() => setActiveTab('configuracoes')}
                >
                    Configurações
                </button>
            </div>

            <div className="bi-content-area">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default GestaoBI;