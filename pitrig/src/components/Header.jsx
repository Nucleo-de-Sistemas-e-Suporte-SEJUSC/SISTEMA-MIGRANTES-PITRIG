import React from 'react';
import { FiSearch, FiBell, FiUser } from 'react-icons/fi';
import '../Css/Header.css';

const Header = ({ isSidebarOpen }) => {
    const notificationCount = 1;

    return (
        <header className={`header-container ${!isSidebarOpen ? 'header-compact' : ''}`}>
            
            {/* 🔹 Esquerda: agora apenas o título PITRIG */}
            <div className="header-left">
                <h1 className="header-logo">PITRIG</h1>
            </div>

            {/* 🔹 Centro: barra de pesquisa */}
            <div className="header-search">
                <div className="search-bar">
                    <FiSearch className="search-icon" size={20} />
                    <input type="text" placeholder="Buscar migrante por nome, documento..." />
                </div>
            </div>

            {/* 🔹 Direita: notificação e admin */}
            <div className="header-right">
                <div className="notification-icon-container">
                    <FiBell size={24} />
                    {notificationCount > 0 && (
                        <span className="notification-badge">{notificationCount}</span>
                    )}
                </div>

                <div className="user-profile">
                    <FiUser size={24} />
                    <span className="user-name">Admin</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
