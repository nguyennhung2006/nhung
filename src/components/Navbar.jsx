import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const handleServiceClick = (id) => {
    setIsServicesOpen(false);
    navigate(`/services/${id}`);
  };

  const handleBookingClick = () => {
    if (!user) {
      alert('Bạn cần Đăng nhập hoặc Đăng ký tài khoản để tiến hành Đặt lịch!');
      navigate('/login');
    } else {
      navigate('/booking');
    }
  };

  const handleHistoryClick = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Bạn cần Đăng nhập tài khoản để xem Lịch sử đặt lịch!');
      navigate('/login');
    } else if (user.role === 'customer') {
      navigate('/history');
    } else if (user.role === 'staff') {
      navigate('/staff');
    } else if (user.role === 'admin') {
      navigate('/admin');
    }
  };

  return (
    <nav style={{ background: '#fdfbf7', padding: '1.2rem 0', borderBottom: '1px solid #eaeaea', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <Link to="/" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-secondary)', letterSpacing: '-1px', fontFamily: 'var(--font-serif)' }}>
          VISAGE <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '2px', color: 'var(--color-primary)', display: 'block' }}>SALON & DAY SPA</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-lg items-center" style={{ fontSize: '0.95rem', fontWeight: 500, color: '#333' }}>
          <Link to="/" className="nav-link">Trang chủ</Link>
          
          {/* Services Dropdown */}
          <div 
            style={{ position: 'relative' }} 
            onMouseEnter={() => setIsServicesOpen(true)} 
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <Link to="/services" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              Dịch vụ ▾
            </Link>
            
            {isServicesOpen && (
              <div style={{ 
                position: 'absolute', 
                top: '100%', 
                left: 0, 
                background: 'white', 
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)', 
                borderRadius: '8px', 
                minWidth: '220px', 
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                border: '1px solid #eee'
              }}>
                <button onClick={() => handleServiceClick('toc')} style={{ padding: '0.8rem 1.2rem', textAlign: 'left', background: 'transparent', border: 'none', borderBottom: '1px solid #f5f5f5', cursor: 'pointer', fontSize: '0.9rem', color: '#333' }} onMouseOver={e => e.currentTarget.style.background = '#fbf7f0'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>✂️ Tóc</button>
                <button onClick={() => handleServiceClick('mong-tay')} style={{ padding: '0.8rem 1.2rem', textAlign: 'left', background: 'transparent', border: 'none', borderBottom: '1px solid #f5f5f5', cursor: 'pointer', fontSize: '0.9rem', color: '#333' }} onMouseOver={e => e.currentTarget.style.background = '#fbf7f0'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>💅 Móng Tay</button>
                <button onClick={() => handleServiceClick('trang-diem')} style={{ padding: '0.8rem 1.2rem', textAlign: 'left', background: 'transparent', border: 'none', borderBottom: '1px solid #f5f5f5', cursor: 'pointer', fontSize: '0.9rem', color: '#333' }} onMouseOver={e => e.currentTarget.style.background = '#fbf7f0'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>💄 Trang Điểm</button>
                <button onClick={() => handleServiceClick('da-va-mat')} style={{ padding: '0.8rem 1.2rem', textAlign: 'left', background: 'transparent', border: 'none', borderBottom: '1px solid #f5f5f5', cursor: 'pointer', fontSize: '0.9rem', color: '#333' }} onMouseOver={e => e.currentTarget.style.background = '#fbf7f0'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>✨ Da & Mặt</button>
                <button onClick={() => handleServiceClick('massage')} style={{ padding: '0.8rem 1.2rem', textAlign: 'left', background: 'transparent', border: 'none', borderBottom: '1px solid #f5f5f5', cursor: 'pointer', fontSize: '0.9rem', color: '#333' }} onMouseOver={e => e.currentTarget.style.background = '#fbf7f0'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>🌿 Massage & Cơ Thể</button>
                <button onClick={() => handleServiceClick('tay-long')} style={{ padding: '0.8rem 1.2rem', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.9rem', color: '#333' }} onMouseOver={e => e.currentTarget.style.background = '#fbf7f0'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>🌸 Tẩy Lông</button>
              </div>
            )}
          </div>

          {/* About Us Dropdown */}
          <div 
            style={{ position: 'relative' }} 
            onMouseEnter={() => setIsAboutOpen(true)} 
            onMouseLeave={() => setIsAboutOpen(false)}
          >
            <Link to="/about" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              Về chúng tôi ▾
            </Link>
            
            {isAboutOpen && (
              <div style={{ 
                position: 'absolute', 
                top: '100%', 
                left: 0, 
                background: 'white', 
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)', 
                borderRadius: '8px', 
                minWidth: '220px', 
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                border: '1px solid #eee'
              }}>
                <button onClick={() => { setIsAboutOpen(false); navigate('/about'); }} style={{ padding: '0.8rem 1.2rem', textAlign: 'left', background: 'transparent', border: 'none', borderBottom: '1px solid #f5f5f5', cursor: 'pointer', fontSize: '0.9rem', color: '#333' }} onMouseOver={e => e.currentTarget.style.background = '#fbf7f0'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>👥 Đội Ngũ Nhân Viên</button>
                <button onClick={() => { setIsAboutOpen(false); navigate('/about'); }} style={{ padding: '0.8rem 1.2rem', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.9rem', color: '#333' }} onMouseOver={e => e.currentTarget.style.background = '#fbf7f0'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>📜 Chính Sách Spa</button>
              </div>
            )}
          </div>

          {/* Store */}
          <Link to="/store" className="nav-link">Cửa hàng</Link>

          {/* Chatbot AI */}
          <Link to="/ai-assistant" className="nav-link" style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            🤖 Bé Mèo AI
          </Link>

          {/* Lịch sử đặt lịch (Direct Menu Link) */}
          <a href="/history" onClick={handleHistoryClick} className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            📋 Lịch sử đặt lịch
          </a>

          {/* Book Now Button */}
          <button 
            onClick={handleBookingClick} 
            className="btn btn-primary"
            style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem', borderRadius: '20px' }}
          >
            Đặt lịch ngay
          </button>
          
          {/* User Auth Portal */}
          {user ? (
            <div className="flex items-center gap-md" style={{ marginLeft: '0.5rem', borderLeft: '1px solid #ccc', paddingLeft: '1.2rem' }}>
              {user.role === 'customer' && <Link to="/history" className="text-primary" style={{ fontWeight: 600 }}>👤 {user.name}</Link>}
              {user.role === 'consultant' && <Link to="/consultant" className="text-primary" style={{ fontWeight: 600 }}>🎧 Portal Tư Vấn</Link>}
              {user.role === 'staff' && <Link to="/staff" className="text-primary" style={{ fontWeight: 600 }}>💼 Staff Portal</Link>}
              {user.role === 'admin' && <Link to="/admin" className="text-primary" style={{ fontWeight: 600 }}>👑 Admin Panel</Link>}
              <button onClick={() => { logout(); navigate('/'); }} className="text-muted" style={{ fontSize: '0.85rem' }}>Đăng xuất</button>
            </div>
          ) : (
            <div className="flex items-center gap-sm" style={{ marginLeft: '0.5rem' }}>
              <Link to="/login" className="btn btn-outline" style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem', borderRadius: '4px' }}>Đăng nhập</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
