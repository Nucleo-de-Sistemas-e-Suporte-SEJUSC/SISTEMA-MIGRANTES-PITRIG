import React, { useState } from 'react';
// useLocation movido para a importação principal
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; 
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Agendamentos from './Pages/Agendamentos';
import Relatorios from './Pages/Relatorios';
import Atendimento from './Pages/Atendimento';
import Dashboard from './components/dashboard/Dashboard';
import GestaoBI from './components/gestao-bi/GestaoBI';  
import Administration from './components/Administracao/Administration-puro';
import { LoginScreen } from './components/LoginScreen'; 
import './App.css';

// NOVO COMPONENTE: Contém a lógica de roteamento e renderização condicional
const AppContent = () => {
    const location = useLocation(); // Agora funciona, pois está dentro do Router
    const isLoginPage = location.pathname === '/login';
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="app-container">
            {/* Header fixo - Renderizado APENAS se NÃO for a página de login */}
            {!isLoginPage && <Header isSidebarOpen={isSidebarOpen} />}

            {/* Layout principal */}
            <div className="main-layout">
                {/* Sidebar - Renderizado APENAS se NÃO for a página de login */}
                {!isLoginPage && <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />}

                {/* Conteúdo principal com rotas */}
                {/* Ajuste de classe para ocupar 100% da largura na tela de login */}
                <main className={`content ${!isSidebarOpen && !isLoginPage ? 'sidebar-closed' : isLoginPage ? 'full-width' : ''}`}>
                    <Routes>
                        {/* Rota para a página de Agendamentos (home page) */}
                        <Route path="/" element={<Agendamentos />} />
                        <Route path="/agendamentos" element={<Agendamentos />} />
                        <Route path="/atendimento" element={<Atendimento />} />
                        <Route path="/relatorios" element={<Relatorios />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/gestaoBI" element={<GestaoBI />} />
                        <Route path="/administracao" element={<Administration />} />
                        <Route path="/login" element={<LoginScreen />} />
                    </Routes>
                </main>

            </div>
        </div>
    );
};

// Componente App principal, apenas envolve o AppContent com o Router
const App = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

export default App;
