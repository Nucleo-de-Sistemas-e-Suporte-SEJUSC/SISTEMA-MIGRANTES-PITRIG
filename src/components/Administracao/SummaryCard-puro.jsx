export function SummaryCard({ title, value, subtitle }) {
  const styles = {
    container: {
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '24px',
      backgroundColor: '#ffffff',
    },
    title: {
      fontSize: '14px',
      color: '#4b5563',
      marginBottom: '8px',
    },
    value: {
      fontSize: '30px',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '8px',
    },
    subtitle: {
      fontSize: '12px',
      color: '#6b7280',
    },
  };

  return (
    <div style={styles.container}>
      <p style={styles.title}>{title}</p>
      <p style={styles.value}>{value}</p>
      <p style={styles.subtitle}>{subtitle}</p>
    </div>
  );
}
