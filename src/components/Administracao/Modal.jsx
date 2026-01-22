import React from 'react';

// Componente simples de Modal
export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    content: {
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '8px',
      width: '400px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      position: 'relative',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #eee',
      paddingBottom: '10px',
      marginBottom: '20px',
    },
    title: {
      margin: 0,
      fontSize: '20px',
      fontWeight: '600',
    },
    closeButton: {
      border: 'none',
      background: 'transparent',
      fontSize: '24px',
      cursor: 'pointer',
      lineHeight: 1,
    }
  };

  return (
    // Fechar ao clicar no overlay
    <div style={modalStyles.overlay} onClick={onClose}>
      {/* Prevenir o fechamento ao clicar no conteúdo do modal */}
      <div style={modalStyles.content} onClick={e => e.stopPropagation()}>
        <div style={modalStyles.header}>
          <h3 style={modalStyles.title}>{title}</h3>
          <button onClick={onClose} style={modalStyles.closeButton}>&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
};