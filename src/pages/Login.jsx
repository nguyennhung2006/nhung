import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const { users } = useData();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    const inputClean = username.trim().toLowerCase();
    const passClean = password.trim();

    // Tìm user trong context, hỗ trợ username, email hoặc phone (không phân biệt hoa thường)
    const foundUser = users.find(u => {
      const uName = (u.username || '').toLowerCase();
      const uEmail = (u.email || '').toLowerCase();
      const uPhone = (u.phone || '').trim();
      const uPass = (u.password || '').trim();

      return (uName === inputClean || uEmail === inputClean || uPhone === inputClean) && uPass === passClean;
    });
    
    if (foundUser) {
      login(foundUser.role, foundUser.name, foundUser.id);
      if (foundUser.role === 'admin') navigate('/admin');
      else if (foundUser.role === 'consultant') navigate('/consultant');
      else if (foundUser.role === 'staff') navigate('/staff');
      else navigate('/'); // customer
    } else {
      setError('Tài khoản hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại (Tài khoản Chuyên viên tư vấn là: tuvan / 123)');
    }
  };

  return (
    <div className="container flex justify-center items-center" style={{ minHeight: '80vh', padding: '2rem 0' }}>
      <div className="glass-card animate-fade-in" style={{ maxWidth: '450px', width: '100%', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
        <div className="text-center" style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: 'var(--color-secondary)', fontFamily: 'var(--font-serif)', fontSize: '1.8rem', margin: 0 }}>Đăng Nhập Visage Spa</h2>
          <p className="text-muted" style={{ marginTop: '0.4rem', fontSize: '0.95rem' }}>Quản lý hệ thống & Đặt lịch dịch vụ</p>
        </div>

        {error && (
          <div style={{ padding: '0.9rem 1.2rem', background: '#FFEBEE', color: 'var(--color-error)', borderRadius: '10px', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center', fontWeight: 500 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ marginBottom: '1.2rem' }}>
            <label className="form-label" style={{ fontWeight: 600, fontSize: '0.9rem' }}>Tên đăng nhập / Email / SĐT</label>
            <input 
              type="text" 
              className="form-input" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên đăng nhập hoặc Email..."
              style={{ borderRadius: '10px', padding: '0.8rem 1rem' }}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: '1.8rem' }}>
            <label className="form-label" style={{ fontWeight: 600, fontSize: '0.9rem' }}>Mật khẩu</label>
            <input 
              type="password" 
              className="form-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu..."
              style={{ borderRadius: '10px', padding: '0.8rem 1rem' }}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', borderRadius: '30px', fontSize: '1rem', fontWeight: 600, boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }}>
            Đăng Nhập
          </button>
        </form>

        <div className="text-center" style={{ marginTop: '1.8rem', fontSize: '0.9rem' }}>
          <span className="text-muted">Chưa có tài khoản khách hàng? </span>
          <Link to="/register" className="text-primary" style={{ fontWeight: 600 }}>Đăng ký ngay</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
