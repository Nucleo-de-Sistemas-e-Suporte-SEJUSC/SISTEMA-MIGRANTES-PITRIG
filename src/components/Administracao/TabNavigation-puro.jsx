export function TabNavigation({ tabs, activeTab, onTabChange }) {
  const styles = {
    container: {
      display: 'flex',
      gap: '24px',
      borderBottom: '1px solid #e5e7eb',
    },
    button: (isActive) => ({
      padding: '12px 4px',
      fontSize: '14px',
      fontWeight: '500',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      color: isActive ? '#2563eb' : '#4b5563',
      borderBottom: isActive ? '2px solid #2563eb' : 'none',
      transition: 'color 0.2s',
    }),
  };

  return (
    <div style={styles.container}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          style={styles.button(activeTab === tab)}
          onMouseEnter={(e) => {
            if (activeTab !== tab) e.target.style.color = '#111827';
          }}
          onMouseLeave={(e) => {
            if (activeTab !== tab) e.target.style.color = '#4b5563';
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
