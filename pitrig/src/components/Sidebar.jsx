import React, { useState } from 'react'; // Importamos useState
import '../sidebar.css'; 
// Observação: Na imagem da sidebar você não tem o logo "PT" separado, apenas "PITRIG"

const Sidebar = () => {
    
    // Usamos useState para armazenar o item ativo.
    // Inicializamos com 'Agendamento', que é o item ativo na imagem.
    const [activeItem, setActiveItem] = useState('Agendamento'); 

    // Dados de navegação (melhorados com ícones Font Awesome ou similar, se for usar)
    // Para simplificar, vou usar ícones unicode ou nomes de classes comuns
    const navItems = [
        { name: 'Dashboard', icon: '🏠' }, 
        { name: 'Agendamento', icon: '📅' }, 
        { name: 'Atendimento', icon: '👥' }, 
        { name: 'Relatórios', icon: '📄' }, 
        { name: 'Gestão BI', icon: '📊' }, 
        { name: 'Administração', icon: '⚙️' },
    ];

    // Função que será chamada ao clicar em um item
    const handleItemClick = (name) => {
        setActiveItem(name); // Define o novo item ativo
        // Aqui você adicionaria a lógica de navegação real (ex: usando react-router-dom)
        // Exemplo: navigate(`/${name.toLowerCase().replace(' ', '-')}`);
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                {/* Você pode reintroduzir a logo PT aqui se quiser */}
                <span className="logo-name">PITRIG</span>
            </div>

            <nav className="sidebar-nav">
                <p className="sidebar-section-title">Sistema</p>
                <ul>
                    {navItems.map((item) => (
                        <li 
                            key={item.name} 
                            // Comparamos o nome do item com o estado ativo
                            className={`nav-item ${item.name === activeItem ? 'active' : ''}`}
                        >
                            {/* O evento onClick chama a função handleItemClick */}
                            <a 
                                href="#" // Mantemos o href="#" para que pareça um link, mas a lógica está no onClick
                                onClick={() => handleItemClick(item.name)}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;