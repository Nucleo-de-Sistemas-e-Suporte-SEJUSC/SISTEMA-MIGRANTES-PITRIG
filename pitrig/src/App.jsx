import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Agendamentos from './Pages/Agendamentos';
import Relatorios from './Pages/Relatorios';
import Atendimento from './Pages/Atendimento'; 
import './App.css';

const App = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <Router>
            <div className="app-container">
                {/* Header fixo */}
                <Header isSidebarOpen={isSidebarOpen} />

                {/* Layout principal */}
                <div className="main-layout">
                    {/* Sidebar: Passa o estado e a função de toggle */}
                    <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

                    {/* Conteúdo principal com rotas */}
                    <main className={`content ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
                        <Routes>
                            {/* Rota para a página de Agendamentos (home page) */}
                            <Route path="/" element={<Agendamentos />} />
                            <Route path="/agendamentos" element={<Agendamentos />} />
                            <Route path="/atendimento" element={<Atendimento />} />
                            <Route path="/relatorios" element={<Relatorios />} />
                        </Routes>
                    </main>

                </div>
            </div>
        </Router>
    );
};

export default App;