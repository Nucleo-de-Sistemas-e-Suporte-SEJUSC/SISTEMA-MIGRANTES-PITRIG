import React from 'react';
import SummaryCard from './SummaryCard';
import ActionCard from './ActionCard';
import ActivityAlertCard from './ActivityAlertCard';
import '../../css/Dashboard.css';

const Dashboard = () => {
    // Dados Mockados para os cards de resumo
    const summaryData = [
        { title: "Total de Migrantes", value: "2,847", detail: "vs mês anterior", trend: "+12%" },
        { title: "Agendamentos Hoje", value: "23", detail: "vs ontem", trend: "-8%" },
        { title: "Atendimentos Concluídos", value: "156", detail: "vs semana anterior", trend: "-5%" },
        { title: "Taxa de Comparecimento", value: "87%", detail: "vs média histórica", trend: "+2%" },
    ];

    // Simulação de handlers de ações
    const handleAction = (card, action) => {
        console.log(`Ação: ${action} no card: ${card}`);
    };

    return (
        <div className="dashboard-page">
            <header className="dashboard-header">
                <h1>Bem-vindo ao Sistema PITRIG</h1>
                <p className="header-subtitle">Plataforma integrada para gestão e atendimento a migrantes e refugiados</p>
            </header>

            {/* 1. Linha de Cards de Resumo */}
            <section className="summary-cards-container">
                {summaryData.map((data, index) => (
                    <SummaryCard key={index} {...data} />
                ))}
            </section>

            {/* 2. Linha de Cards de Ação (Agendamento e Atendimento) */}
            <section className="action-cards-row">
                {/* Card Agendamento */}
                <ActionCard
                    title="Agendamento"
                    subtitle="Gerenciar agendamentos e pré-cadastros de migrantes"
                    iconType="agendamento"
                    infoCount="23"
                    actions={[
                        { label: "Novo Agendamento", type: 'primary', handler: () => handleAction('Agendamento', 'Novo Agendamento') },
                        { label: "Ver Calendário", type: 'secondary', handler: () => handleAction('Agendamento', 'Ver Calendário') },
                    ]}
                />

                {/* Card Atendimento */}
                <ActionCard
                    title="Atendimento"
                    subtitle="Cadastro completo e registro de atendimentos realizados"
                    iconType="atendimento"
                    infoCount="12"
                    actions={[
                        { label: "Iniciar Atendimento", type: 'primary', handler: () => handleAction('Atendimento', 'Iniciar Atendimento') },
                        { label: "Buscar Migrante", type: 'secondary', handler: () => handleAction('Atendimento', 'Buscar Migrante') },
                    ]}
                />
            </section>

            {/* 3. Linha de Cards de Informação (Relatórios e Gestão BI) */}
            <section className="action-cards-row">
                {/* Card Relatórios */}
                <ActionCard
                    title="Relatórios"
                    subtitle="Geração e exportação de relatórios customizáveis"
                    iconType="relatorios"
                    infoCount="8"
                    actions={[
                        { label: "Novo Relatório", type: 'primary', handler: () => handleAction('Relatórios', 'Novo Relatório') },
                        { label: "Relatórios Salvos", type: 'secondary', handler: () => handleAction('Relatórios', 'Relatórios Salvos') },
                    ]}
                />

                {/* Card Gestão BI */}
                <ActionCard
                    title="Gestão BI"
                    subtitle="Dashboards e indicadores estratégicos (Power BI)"
                    iconType="bi"
                    infoCount="5"
                    actions={[
                        { label: "Abrir Power BI", type: 'primary', handler: () => handleAction('BI', 'Abrir Power BI') },
                        { label: "Configurar Indicadores", type: 'secondary', handler: () => handleAction('BI', 'Configurar Indicadores') },
                    ]}
                />
            </section>

            {/* 4. Linha de Cards Inferiores (Atividades e Alertas) */}
            <ActivityAlertCard />
        </div>
    );
};

export default Dashboard;