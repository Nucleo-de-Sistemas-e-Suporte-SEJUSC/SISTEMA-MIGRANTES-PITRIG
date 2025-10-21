import React from 'react';
import { FiMenu, FiX, FiHome, FiCalendar, FiUsers, FiFileText, FiBarChart2, FiSettings } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import '../Css/Sidebar.css';

const Sidebar = ({ isOpen, onToggle }) => {
    const location = useLocation();


    const navItems = [
        { name: 'Dashboard', icon: FiHome, path: '/dashboard' },
        { name: 'Agendamento', icon: FiCalendar, path: '/agendamentos' },
        { name: 'Atendimento', icon: FiUsers, path: '/atendimento' },
        { name: 'Relatórios', icon: FiFileText, path: '/relatorios' },
        { name: 'Gestão BI', icon: FiBarChart2, path: '/gestaoBI' },
        { name: 'Administração', icon: FiSettings, path: '/administracao' },
    ];
    const sidebarClass = `sidebar ${isOpen ? '' : 'sidebar-closed'}`;

    return (
        <div className={sidebarClass}>
            <div className="sidebar-top">
                <button
                    className="toggle-sidebar-btn"
                    onClick={onToggle}
                    aria-label="Toggle Sidebar"
                >
                    {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                </button>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    {navItems.map((item) => (
                        <li
                            key={item.name}
                            className={`nav-item ${
                                location.pathname === item.path ? 'active' : ''
                            }`}
                        >
                            <Link to={item.path}>
                                <span className="nav-icon"><item.icon /></span>
                                <span className="nav-text">{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
