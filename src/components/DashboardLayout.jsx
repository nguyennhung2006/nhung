import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = ({ title, menuItems, activeTab, setActiveTab, children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f7fa' }}>
      {/* Sidebar */}
      <aside style={{ width: '280px', background: '#2C3E50', color: 'white', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Link to="/" style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'white', fontFamily: 'var(--font-serif)', display: 'block', marginBottom: '0.5rem' }}>
            VISAGE
          </Link>
          <div style={{ fontSize: '0.85rem', color: '#9fb3c8', fontWeight: 500 }}>
            {title}
          </div>
        </div>

        <nav style={{ flex: 1, padding: '1.5rem 0' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {menuItems.map(item => (
              <li key={item.id}>
                <button 
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '1rem 1.5rem',
                    background: activeTab === item.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                    color: activeTab === item.id ? 'white' : '#9fb3c8',
                    borderLeft: activeTab === item.id ? '4px solid var(--color-primary)' : '4px solid transparent',
                    fontSize: '0.95rem',
                    fontWeight: activeTab === item.id ? 600 : 400,
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                  onMouseOver={(e) => {
                    if(activeTab !== item.id) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onMouseOut={(e) => {
                    if(activeTab !== item.id) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#9fb3c8';
                    }
                  }}
                >
                  {item.icon && <span>{item.icon}</span>}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Topbar */}
        <header style={{ background: 'white', padding: '1rem 2rem', borderBottom: '1px solid #eaeaea', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 600, color: '#333' }}>{user?.name}</div>
              <div style={{ fontSize: '0.8rem', color: '#888' }}>{user?.role === 'admin' ? 'Quản trị viên' : 'Nhân viên'}</div>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div style={{ borderLeft: '1px solid #ddd', height: '30px', margin: '0 0.5rem' }}></div>
            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>Đăng xuất</button>
          </div>
        </header>

        {/* Content Area */}
        <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
