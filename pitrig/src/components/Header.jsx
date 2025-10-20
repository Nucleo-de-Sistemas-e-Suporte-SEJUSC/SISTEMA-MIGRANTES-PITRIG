import React, { useState } from 'react';
import { FiSearch, FiBell, FiUser, FiSettings, FiLogOut } from 'react-icons/fi'; // Adicionei ícones para o menu
import '../Css/Header.css';

// Componente: Dropdown de Usuário (Admin)
const UserDropdown = ({ onClose }) => (
    <div className="dropdown-menu user-dropdown">
        <ul>
            <li>
                <FiUser size={16} /> Meu Perfil
            </li>
            <li>
                <FiSettings size={16} /> Configurações
            </li>
            <li className="separator"></li>
            <li className="logout" onClick={onClose}>
                <FiLogOut size={16} /> Sair
            </li>
        </ul>
    </div>
);

// Componente: Dropdown de Notificações
const NotificationDropdown = ({ notifications }) => (
    <div className="dropdown-menu notification-dropdown">
        <div className="dropdown-header">Notificações ({notifications.length})</div>
        {notifications.length > 0 ? (
            <ul>
                {notifications.map((notif, index) => (
                    <li key={index} className={notif.read ? 'read' : 'unread'}>
                        <span className="notif-dot"></span>
                        {notif.message}
                        <span className="notif-time">{notif.time}</span>
                    </li>
                ))}
                <li className="view-all">Ver todas</li>
            </ul>
        ) : (
            <div className="no-notifications">
                Nenhuma notificação nova.
            </div>
        )}
    </div>
);


const Header = ({ isSidebarOpen }) => {
    // 🔑 Estados para controlar a abertura dos Dropdowns
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);

    // Dados de Notificação Simulado
    const notifications = [
        { message: 'Novo agendamento confirmado.', time: '10 min', read: false },
        { message: '2 Agendamento Pendentes.', time: '1 hr', read: true },
        // ... mais notificações
    ];
    const notificationCount = notifications.filter(n => !n.read).length;

    // Lógica para alternar o dropdown do Usuário
    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(prev => !prev);
        // Fecha o outro dropdown ao abrir este
        setIsNotificationDropdownOpen(false);
    };

    // Lógica para alternar o dropdown de Notificações
    const toggleNotificationDropdown = () => {
        setIsNotificationDropdownOpen(prev => !prev);
        // Fecha o outro dropdown ao abrir este
        setIsUserDropdownOpen(false);
    };

    return (
        <header className={`header-container ${!isSidebarOpen ? 'header-compact' : ''}`}>
            
            {/* ... Bloco header-left (PITRIG) */}
            <div className="header-left">
                <h1 className="header-logo">PITRIG</h1>
            </div>

            {/* ... Bloco header-search (Barra de Pesquisa) */}
            <div className="header-search">
                <div className="search-bar">
                    <FiSearch className="search-icon" size={20} />
                    <input type="text" placeholder="Buscar migrante por nome, documento..." />
                </div>
            </div>

            {/* 🔹 Direita: notificação e admin (ATUALIZADO) */}
            <div className="header-right">
                {/* Container de Notificação */}
                <div className="notification-wrapper">
                    <div 
                        className="notification-icon-container clickable"
                        onClick={toggleNotificationDropdown} // 🔑 Ação de clique
                    >
                        <FiBell size={24} />
                        {notificationCount > 0 && (
                            <span className="notification-badge">{notificationCount}</span>
                        )}
                    </div>
                    {/* 🔑 Renderiza o dropdown se o estado for true */}
                    {isNotificationDropdownOpen && <NotificationDropdown notifications={notifications} />}
                </div>

                {/* Container de Perfil do Usuário */}
                <div className="user-profile-wrapper">
                    <div 
                        className="user-profile clickable"
                        onClick={toggleUserDropdown} // 🔑 Ação de clique
                    >
                        <FiUser size={24} />
                        <span className="user-name">Admin</span>
                    </div>
                    {/* 🔑 Renderiza o dropdown se o estado for true */}
                    {isUserDropdownOpen && <UserDropdown onClose={toggleUserDropdown} />}
                </div>
            </div>
        </header>
    );
};

export default Header;