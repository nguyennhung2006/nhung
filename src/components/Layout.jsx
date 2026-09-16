import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;

  // Hide default Navbar for Admin and Staff (they will have Sidebar)
  const hideNavbar = path.startsWith('/admin') || path.startsWith('/staff');
  
  // Hide default Footer for Admin, Staff, and AI Assistant
  const hideFooter = path.startsWith('/admin') || path.startsWith('/staff') || path.startsWith('/ai-assistant');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!hideNavbar && <Navbar />}
      
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>
      
      {!hideFooter && (
        <footer style={{ background: 'var(--color-secondary)', color: 'white', padding: '2rem 0', textAlign: 'center', marginTop: 'auto' }}>
          <div className="container">
            <p>&copy; 2026 VISAGE. Tất cả các quyền được bảo lưu.</p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
