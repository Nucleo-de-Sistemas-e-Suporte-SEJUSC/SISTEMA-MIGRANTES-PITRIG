import React from 'react';

// O ícone ⚙️ da segunda imagem foi removido no cabeçalho para seguir o visual da primeira imagem.
// O ícone ✏️ (lápis) é usado para simular o botão de edição.

export function ConfigurationSection({ title, description, items, onAddItem }) {
  const styles = {
    card: {
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      backgroundColor: '#ffffff',
      overflow: 'hidden',
    },
    header: {
      padding: '20px',
      borderBottom: '1px solid #e5e7eb',
    },
    headerContent: {
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-start',
    },
    icon: {
      fontSize: '24px',
      marginTop: '4px',
    },
    headerText: {
      flex: 1,
    },
    title: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#111827',
      margin: '0 0 4px 0',
    },
    description: {
      fontSize: '14px',
      color: '#6b7280',
      margin: '0',
    },
    content: {
      // Padding vertical é importante para o espaçamento do botão de adicionar
      padding: '20px', 
    },
    // Estilo para os itens da lista
    itemList: {
      display: 'flex',
      flexDirection: 'column',
    },
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: '1px solid #f3f4f6', // Linha separadora entre itens
    },
    itemText: {
      fontSize: '14px',
      fontWeight: '400',
      color: '#111827',
      margin: '0',
    },
    // Estilo para o ícone de edição
    editIcon: {
      fontSize: '16px',
      color: '#9ca3af', // Cor cinza clara
      cursor: 'pointer',
      marginLeft: '10px',
      // Estilo de hover simples (não funciona em todos os navegadores com style inline puro)
    },
    // Estilo para o botão de adicionar
    addButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '20px',
      padding: '10px 15px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      backgroundColor: '#f9fafb',
      color: '#111827',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      textAlign: 'center',
      width: '100%',
      boxSizing: 'border-box',
    },
    // Estilo para o último item da lista (sem a linha divisória)
    itemLast: {
      borderBottom: 'none',
    },
  };

  const renderEditIcon = (item) => (
    <span 
      style={styles.editIcon} 
      onClick={() => console.log(`Editando: ${item.name}`)}
    >
      {'✏️'} 
    </span>
  );
  
  const getButtonText = () => {
      if (title === "Tipos de Serviço") {
          return "Adicionar Novo Tipo";
      }
      if (title === "Nacionalidades") {
          return "Adicionar Nova Nacionalidade";
      }
      return "Adicionar Novo Item";
  };


  return (
    <div style={styles.card}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerText}>
            <h3 style={styles.title}>{title}</h3>
            <p style={styles.description}>{description}</p>
          </div>
        </div>
      </div>
      {/* CONTENT */}
      <div style={styles.content}>
        <div style={styles.itemList}>
          {items.map((item, index) => (
            <div
              key={item.name}
              style={{
                ...styles.listItem,
                ...(index === items.length - 1 ? styles.itemLast : {}),
              }}
            >
              <p style={styles.itemText}>{item.name}</p>
              {renderEditIcon(item)}
            </div>
          ))}
        </div>
        
        {/* BOTÃO "Adicionar Novo Tipo" */}
        <button 
          style={styles.addButton}
          onClick={onAddItem} 
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
}