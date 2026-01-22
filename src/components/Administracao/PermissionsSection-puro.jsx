export function PermissionsSection({ roles }) {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },
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
    permissionList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    permission: {
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-start',
      cursor: 'pointer',
    },
    checkbox: {
      width: '16px',
      height: '16px',
      marginTop: '2px',
      cursor: 'pointer',
      accentColor: '#2563eb',
    },
    permissionText: {
      flex: 1,
    },
    permissionName: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#111827',
      margin: '0 0 2px 0',
    },
    permissionDesc: {
      fontSize: '12px',
      color: '#6b7280',
      margin: '0',
    },
  };

  return (
    <div style={styles.container}>
      {roles.map((role) => (
        <div key={role.role} style={styles.card}>
          <div style={styles.header}>
            <div style={styles.headerContent}>
              <div style={styles.icon}>🛡️</div>
              <div style={styles.headerText}>
                <h3 style={styles.title}>{role.role}</h3>
                <p style={styles.description}>{role.description}</p>
              </div>
            </div>
          </div>
          <div style={styles.content}>
            <div style={styles.permissionList}>
              {role.permissions.map((permission) => (
                <label key={permission.name} style={styles.permission}>
                  <input
                    type="checkbox"
                    defaultChecked
                    style={styles.checkbox}
                    readOnly
                  />
                  <div style={styles.permissionText}>
                    <p style={styles.permissionName}>{permission.name}</p>
                    <p style={styles.permissionDesc}>{permission.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
