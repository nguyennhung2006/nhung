import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: ''
  });
  const [error, setError] = useState('');
  
  const { users, addUser } = useData();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    // 1. Validate không bỏ trống
    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.address) {
      setError('Vui lòng điền đầy đủ thông tin, bao gồm cả địa chỉ.');
      return;
    }

    // 2. Validate định dạng Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Email không đúng định dạng.');
      return;
    }

    // 3. Validate định dạng SĐT (10 số)
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Số điện thoại không đúng định dạng (Ví dụ: 0901234567).');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    // 4. Kiểm tra tồn tại
    const userExists = users.find(u => u.email === formData.email || u.phone === formData.phone);
    if (userExists) {
      setError('Email hoặc Số điện thoại đã được đăng ký.');
      return;
    }

    // 5. Thành công -> Lưu
    const newUser = {
      username: formData.email.split('@')[0], // Tạo username từ email
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: 'customer',
      name: formData.name,
      address: formData.address
    };

    addUser(newUser);
    alert('Đăng ký thành công! Vui lòng đăng nhập.');
    navigate('/login');
  };

  return (
    <div className="container flex justify-center items-center" style={{ minHeight: '80vh', padding: 'var(--spacing-xl) 0' }}>
      <div className="glass-card animate-fade-in" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="text-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h2 style={{ color: 'var(--color-secondary)' }}>Tạo Tài Khoản</h2>
          <p className="text-muted">Đăng ký để sử dụng các dịch vụ của VISAGE</p>
        </div>

        {error && (
          <div style={{ padding: '1rem', background: '#FFEBEE', color: 'var(--color-error)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label">Họ và tên</label>
            <input 
              type="text" 
              name="name"
              className="form-input" 
              value={formData.name}
              onChange={handleChange}
              placeholder="Nguyễn Văn A"
            />
          </div>
          
          <div className="flex gap-md" style={{ marginBottom: 'var(--spacing-md)' }}>
            <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
              <label className="form-label">Email</label>
              <input 
                type="email" 
                name="email"
                className="form-input" 
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
              />
            </div>
            <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
              <label className="form-label">Số điện thoại</label>
              <input 
                type="text" 
                name="phone"
                className="form-input" 
                value={formData.phone}
                onChange={handleChange}
                placeholder="09..."
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 'var(--spacing-md)' }}>
            <label className="form-label">Địa chỉ</label>
            <input 
              type="text" 
              name="address"
              className="form-input" 
              value={formData.address}
              onChange={handleChange}
              placeholder="Nhập địa chỉ của bạn"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mật khẩu</label>
            <input 
              type="password" 
              name="password"
              className="form-input" 
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Xác nhận Mật khẩu</label>
            <input 
              type="password" 
              name="confirmPassword"
              className="form-input" 
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Đăng Ký
          </button>
        </form>
        
        <div className="text-center" style={{ marginTop: '1.5rem', fontSize: '0.9rem' }}>
          <span className="text-muted">Đã có tài khoản? </span>
          <Link to="/login" className="text-primary" style={{ fontWeight: 500 }}>Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
