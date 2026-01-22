export function UserTable({ users, onEdit, onDelete }) {
  const styles = {
    container: {
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: '#ffffff',
    },
    thead: {
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: '#f9fafb',
    },
    th: {
      padding: '12px 16px',
      textAlign: 'left',
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151',
      borderBottom: '1px solid #e5e7eb',
    },
    tr: {
      borderBottom: '1px solid #f3f4f6',
    },
    trHover: {
      backgroundColor: '#f9fafb',
    },
    td: {
      padding: '12px 16px',
      fontSize: '14px',
      color: '#4b5563',
    },
    tdBold: {
      fontWeight: '500',
      color: '#111827',
    },
    badge: (color) => ({
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '500',
      backgroundColor: color === 'gestor' ? '#fef3c7' : color === 'ativo' ? '#d1fae5' : color === 'inativo' ? '#fee2e2' : '#e5e7eb',
      color: color === 'gestor' ? '#92400e' : color === 'ativo' ? '#065f46' : color === 'inativo' ? '#991b1b' : '#374151',
    }),
    actionBtn: {
      padding: '8px',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      color: '#4b5563',
      marginRight: '8px',
      transition: 'background-color 0.2s',
    },
  };

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr style={styles.tr}>
            <th style={styles.th}>Nome</th>
            <th style={styles.th}>E-mail</th>
            <th style={styles.th}>Perfil</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Último Acesso</th>
            <th style={styles.th}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              style={styles.tr}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9fafb')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <td style={{ ...styles.td, ...styles.tdBold }}>{user.name}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>
                <span style={styles.badge('gestor')}>{user.role}</span>
              </td>
              <td style={styles.td}>
                <span style={styles.badge(user.status === 'Ativo' ? 'ativo' : 'inativo')}>
                  {user.status}
                </span>
              </td>
              <td style={styles.td}>{user.lastAccess}</td>
              <td style={styles.td}>
                <button
                  onClick={() => onEdit?.(user)}
                  style={styles.actionBtn}
                  title="Editar"
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#f3f4f6')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
                >
                  ✏️
                </button>
                <button
                  onClick={() => onDelete?.(user)}
                  style={styles.actionBtn}
                  title="Deletar"
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#f3f4f6')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
