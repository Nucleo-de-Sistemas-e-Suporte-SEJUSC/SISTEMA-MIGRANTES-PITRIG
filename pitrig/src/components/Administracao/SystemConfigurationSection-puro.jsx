export function SystemConfigurationSection({ options, onToggle, onAction }) {
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
      padding: '20px',
    },
    optionsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      marginBottom: '24px',
    },
    optionItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      backgroundColor: '#ffffff',
    },
    optionText: {
      flex: 1,
    },
    optionName: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#111827',
      margin: '0 0 4px 0',
    },
    optionDesc: {
      fontSize: '12px',
      color: '#6b7280',
      margin: '0',
    },
    checkbox: {
      width: '20px',
      height: '20px',
      cursor: 'pointer',
      accentColor: '#2563eb',
    },
    actionSection: {
      paddingTop: '16px',
      borderTop: '1px solid #e5e7eb',
    },
    actionTitle: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#111827',
      margin: '0 0 12px 0',
    },
    actionButtons: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
    },
    button: (variant) => ({
      padding: '10px 16px',
      fontSize: '14px',
      fontWeight: '500',
      border: variant === 'destructive' ? 'none' : '1px solid #d1d5db',
      borderRadius: '6px',
      cursor: 'pointer',
      backgroundColor: variant === 'destructive' ? '#dc2626' : '#ffffff',
      color: variant === 'destructive' ? '#ffffff' : '#111827',
      transition: 'all 0.2s',
    }),
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.icon}>⚙️</div>
          <div style={styles.headerText}>
            <h3 style={styles.title}>Configurações do Sistema</h3>
            <p style={styles.description}>Configurações gerais e manutenção do sistema</p>
          </div>
        </div>
      </div>
      <div style={styles.content}>
        {/* Configuration Options */}
        <div style={styles.optionsList}>
          {options.map((option) => (
            <div key={option.name} style={styles.optionItem}>
              <div style={styles.optionText}>
                <p style={styles.optionName}>{option.name}</p>
                <p style={styles.optionDesc}>{option.description}</p>
              </div>
              <input
                type="checkbox"
                checked={option.enabled}
                onChange={(e) => onToggle?.(option.name, e.target.checked)}
                style={styles.checkbox}
              />
            </div>
          ))}
        </div>

        {/* System Actions */}
        <div style={styles.actionSection}>
          <p style={styles.actionTitle}>Ações do Sistema</p>
          <div style={styles.actionButtons}>
            <button
              onClick={() => onAction?.('backup')}
              style={styles.button('outline')}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#f3f4f6')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#ffffff')}
            >
              Executar Backup Manual
            </button>
            <button
              onClick={() => onAction?.('logs')}
              style={styles.button('outline')}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#f3f4f6')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#ffffff')}
            >
              Limpar Logs Antigos
            </button>
            <button
              onClick={() => onAction?.('restart')}
              style={styles.button('destructive')}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#b91c1c')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#dc2626')}
            >
              Reiniciar Sistema
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
