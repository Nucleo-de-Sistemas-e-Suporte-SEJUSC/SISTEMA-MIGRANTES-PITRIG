import React from 'react';
import { FiMenu, FiSearch, FiBell, FiUser } from 'react-icons/fi';
import '../Css/Header.css';

const Header = ({ onMenuClick, isSidebarOpen }) => {
    const notificationCount = 1;

    return (
        // 👇 adicionamos uma classe condicional baseada na sidebar
        <header className={`header-container ${!isSidebarOpen ? 'header-compact' : ''}`}>
            
            {/* 1. Bloco Esquerdo: Menu e Título */}
            <div className="header-left">
                <button className="menu-toggle" onClick={onMenuClick} aria-label="Toggle Menu">
                    <FiMenu size={24} />
                </button>
            </div>

            {/* 2. Bloco Central: Barra de Pesquisa */}
            <div className="header-search">
                <div className="search-bar">
                    <FiSearch className="search-icon" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar migrante por nome, documento..."
                    />
                </div>
            </div>

            {/* 3. Bloco Direito: Notificações e Admin */}
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
