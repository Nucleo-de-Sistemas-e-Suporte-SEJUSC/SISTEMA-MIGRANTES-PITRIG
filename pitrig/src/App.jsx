import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Agendamentos from './Pages/Agendamentos';
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
                    <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

                    <main className={`content ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
                        <Agendamentos /> {/* Mostra a página de agendamentos */}
                    </main>

                </div>
            </div>
        </Router>
    );
};

export default App;
