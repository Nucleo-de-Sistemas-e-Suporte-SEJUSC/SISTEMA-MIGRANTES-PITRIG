import { useState } from 'react';
import { SummaryCard } from './SummaryCard-puro';
import { TabNavigation } from './TabNavigation-puro';
import UserTable from './UserTable';
import { PermissionsSection } from './PermissionsSection-puro';
import { ConfigurationSection } from './ConfigurationSection-puro';
import { SystemConfigurationSection } from './SystemConfigurationSection-puro';
import '../../css/Administration.css'; // ⬅️ import do CSS separado

export default function Administration() {
  const [activeTab, setActiveTab] = useState('Usuários');

  const tabs = ['Usuários', 'Perfis e Permissões', 'Configurações', 'Sistema'];

 <UserTable />


  const roles = [
    {
      role: 'Administrator',
      description: 'Acesso completo ao sistema',
      permissions: [
        { name: 'Gerenciar usuários e permissões' },
        { name: 'Configurar sistema' },
        { name: 'Acesso completo a todos os módulos' },
      ],
    },
    {
      role: 'Gestor',
      description: 'Acesso a relatórios e BI',
      permissions: [
        { name: 'Visualizar relatórios e BI' },
        { name: 'Gerenciar agendamentos' },
        { name: 'Cadastrar usuários atendentes' },
      ],
    },
    {
      role: 'Atendente',
      description: 'Cadastro e atendimento',
      permissions: [
        { name: 'Criar agendamentos' },
        { name: 'Realizar atendimentos' },
        { name: 'Visualizar relatórios básicos' },
      ],
    },
  ];

  const serviceTypes = [
    { name: 'Documentação' }, { name: 'Orientação Jurídica' },
    { name: 'Cadastro CPF' }, { name: 'Carteira de Trabalho' },
    { name: 'Auxílio Emergencial' }, { name: 'Encaminhamento Saúde' },
    { name: 'Encaminhamento Educação' }, { name: 'Orientação Trabalhista' },
  ];

  const nationalities = [
    { name: 'Venezuela' }, { name: 'Colômbia' }, { name: 'Peru' }, { name: 'Bolívia' },
  ];

  const systemOptions = [
    { name: 'Modo Manutenção', description: 'Ativar modo manutenção para todos os usuários', enabled: false },
    { name: 'Backup Automático', description: 'Realizar backup automático dos dados diariamente', enabled: true },
    { name: 'Notificações por E-mail', description: 'Enviar notificações importantes por e-mail', enabled: true },
    { name: 'Log de Auditoria', description: 'Manter registro detalhado de todas as ações', enabled: true },
  ];

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="admin-header-container">
          <div className="admin-header-text">
            <h1>Administração</h1>
            <p>Configuração e gerenciamento do sistema</p>
          </div>
          <button className="admin-button">➕ Novo Usuário</button>
        </div>
      </header>

      <main className="admin-main">
        <div className="admin-tab-container">
          <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="admin-content">
          {activeTab === 'Usuários' && (
            <>
              <div className="admin-summary-grid">
                <SummaryCard title="Total Usuários" value="3" subtitle="Cadastrados" />
                <SummaryCard title="Usuários Ativos" value="2" subtitle="Online" />
                <SummaryCard title="Gestores" value="1" subtitle="Com acesso BI" />
                <SummaryCard title="Atendentes" value="2" subtitle="Atendimento" />
              </div>

              <div className="admin-table-card">
                <div className="admin-table-header">
                  <h3>Usuários do Sistema</h3>
                  <p>Gerencie todos os usuários e suas permissões</p>
                </div>
                <div className="admin-table-content">
                  <UserTable users={users} />
                </div>
              </div>
            </>
          )}

          {activeTab === 'Perfis e Permissões' && <PermissionsSection roles={roles} />}

          {activeTab === 'Configurações' && (
            <div className="admin-config-grid">
              <ConfigurationSection
                title="Tipos de Serviço"
                description="Configure os tipos de serviço disponíveis"
                items={serviceTypes}
              />
              <ConfigurationSection
                title="Nacionalidades"
                description="Configure as nacionalidades disponíveis"
                items={nationalities}
              />
            </div>
          )}

          {activeTab === 'Sistema' && (
            <SystemConfigurationSection
              options={systemOptions}
              onToggle={(name, enabled) => console.log(`${name}: ${enabled}`)}
              onAction={(action) => console.log(`Action: ${action}`)}
            />
          )}
        </div>
      </main>
    </div>
  );
}
