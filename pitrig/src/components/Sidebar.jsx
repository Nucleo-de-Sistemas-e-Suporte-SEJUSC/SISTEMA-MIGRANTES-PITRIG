import React, { useState } from 'react';
import '../css/sidebar.css'; 

// 1. ACEITAR A PROP 'isOpen'
const Sidebar = ({ isOpen }) => {
    const [activeItem, setActiveItem] = useState('Agendamento'); 
    
    // ... (restante do seu código navItems e handleItemClick) ...
    const navItems = [
        { name: 'Dashboard', icon: '🏠' }, 
        { name: 'Agendamento', icon: '📅' }, 
        { name: 'Atendimento', icon: '👥' }, 
        { name: 'Relatórios', icon: '📄' }, 
        { name: 'Gestão BI', icon: '📊' }, 
        { name: 'Administração', icon: '⚙️' },
    ];

    const handleItemClick = (name) => {
        setActiveItem(name); 
    };
    
    // 2. APLICAÇÃO DA CLASSE CONDICIONAL
    // Usamos a prop 'isOpen' para adicionar a classe 'sidebar-closed'
    const sidebarClass = `sidebar ${isOpen ? '' : 'sidebar-closed'}`;

    return (
        // 3. O elemento principal usa a classe condicional
        <div className={sidebarClass}> 
            <div className="sidebar-header">
                <span className="logo-name">PITRIG</span>
            </div>

            <nav className="sidebar-nav">
                <p className="sidebar-section-title">Sistema</p>
                <ul>
                    {navItems.map((item) => (
                        <li
                            key={item.name}
                            className={`nav-item ${item.name === activeItem ? 'active' : ''}`}
                        >
                            <a
                                href="#"
                                onClick={() => handleItemClick(item.name)}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                {/* INSERÇÃO NECESSÁRIA: Envolver o nome com a classe nav-text */}
                                <span className="nav-text">{item.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;