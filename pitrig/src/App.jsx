import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './App.css';

const App = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="app-container">
            {/* Header fixo no topo */}
            <Header 
                onMenuClick={toggleSidebar} 
                isSidebarOpen={isSidebarOpen} 
            />

            {/* Layout principal (Sidebar + Conteúdo) */}
            <div className="main-layout">
                <Sidebar isOpen={isSidebarOpen} />
                
                <main className={`content ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
                    <h1>Conteúdo Principal do Sistema</h1>
                    <p>O cabeçalho e a barra lateral estão funcionando juntos!</p>
                </main>
            </div>
        </div>
    );
};

export default App;
