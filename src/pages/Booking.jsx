import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { servicesData } from '../data/servicesData';

const Booking = () => {
  const { user } = useAuth();
  const { users, appointments, addAppointment, formatCurrency } = useData();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const initialStaffId = searchParams.get('staffId') || '';
  const initialPackageId = searchParams.get('packageId') || '';
  
  const [selectedPkgId, setSelectedPkgId] = useState(initialPackageId);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [staffId, setStaffId] = useState(initialStaffId);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (initialStaffId) setStaffId(initialStaffId);
    if (initialPackageId) setSelectedPkgId(initialPackageId);
  }, [initialStaffId, initialPackageId]);

  // Flatten all services from servicesData into a list for quick lookup
  const allPackages = [];
  Object.keys(servicesData).forEach(catKey => {
    const cat = servicesData[catKey];
    cat.packages.forEach(pkg => {
      allPackages.push({
        ...pkg,
        categoryKey: catKey,
        categoryTitle: cat.title
      });
    });
  });

  // Explicit list of 9 staff members with clean names and their qualified categories
  const all9Staff = [
    { id: 2, name: 'Nguyễn Thị Hồng Nhung', categories: ['toc'] },
    { id: 4, name: 'Lường Thị Giang', categories: ['mong-tay', 'massage'] },
    { id: 5, name: 'Bế Thị Thu Uyên', categories: ['trang-diem', 'da-va-mat', 'tay-long'] },
    { id: 6, name: 'Trần Văn Nam', categories: ['massage', 'toc'] },
    { id: 7, name: 'Hoàng Thùy Linh', categories: ['da-va-mat', 'mong-tay', 'tay-long'] },
    { id: 8, name: 'Đặng Minh Châu', categories: ['toc'] },
    { id: 9, name: 'Vũ Thị Mai', categories: ['mong-tay', 'trang-diem'] },
    { id: 10, name: 'Phạm Quốc Tuấn', categories: ['massage', 'da-va-mat', 'tay-long'] },
    { id: 11, name: 'Đỗ Phương Thảo', categories: ['trang-diem', 'mong-tay'] }
  ];

  // Currently selected staff object
  const selectedStaffObj = all9Staff.find(s => s.id === Number(staffId));
  
  // Currently selected package object
  const selectedPkg = allPackages.find(p => p.id === selectedPkgId);

  // 1. FILTER PACKAGES BY SELECTED STAFF (If staff is selected, filter services)
  const filteredPackages = selectedStaffObj
    ? allPackages.filter(p => selectedStaffObj.categories.includes(p.categoryKey))
    : allPackages;

  // 2. FILTER STAFF BY SELECTED PACKAGE (If package is selected, filter staff)
  const filteredStaff = selectedPkg
    ? all9Staff.filter(s => s.categories.includes(selectedPkg.categoryKey))
    : all9Staff;

  // Two-way auto reset logic
  useEffect(() => {
    if (staffId && selectedPkg) {
      const isQualified = selectedStaffObj && selectedStaffObj.categories.includes(selectedPkg.categoryKey);
      if (!isQualified) {
        setStaffId('');
      }
    }
  }, [selectedPkgId]);

  useEffect(() => {
    if (selectedPkgId && selectedStaffObj) {
      const isAvailable = filteredPackages.some(p => p.id === selectedPkgId);
      if (!isAvailable) {
        setSelectedPkgId('');
      }
    }
  }, [staffId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!selectedPkgId || !date || !time) {
      setError('Vui lòng chọn đầy đủ Dịch vụ, Ngày và Giờ.');
      return;
    }

    if (!selectedPkg) {
      setError('Dịch vụ đã chọn không hợp lệ.');
      return;
    }

    // Mock Conflict Check for staff
    if (staffId) {
      const isConflict = appointments.some(app => 
        app.staffId === Number(staffId) && 
        app.date === date && 
        app.time === time &&
        app.status !== 'cancelled'
      );

      if (isConflict) {
        setError('Nhân viên này đã có lịch ở khung giờ bạn chọn. Vui lòng chọn giờ khác hoặc chọn nhân viên khác.');
        return;
      }
    }

    const selectedStaff = staffId ? (all9Staff.find(s => s.id === Number(staffId)) || users.find(u => u.id === Number(staffId))) : null;

    // Create new appointment record
    const newAppointment = {
      customerId: user ? user.id : 1,
      customerName: user ? user.name : 'Khách vãng lai',
      serviceId: selectedPkg.id,
      serviceName: `[${selectedPkg.categoryTitle}] ${selectedPkg.name}`,
      staffId: selectedStaff ? selectedStaff.id : null,
      staffName: selectedStaff ? selectedStaff.name : 'Chưa xếp nhân viên',
      date: date,
      time: time,
      status: 'pending',
      price: selectedPkg.price,
      discount: 0
    };

    // Simulate API delay
    setTimeout(() => {
      addAppointment(newAppointment);
      setSuccess(true);
      setTimeout(() => {
        navigate('/history');
      }, 2000);
    }, 800);
  };

  if (success) {
    return (
      <div className="container text-center animate-fade-in" style={{ padding: 'var(--spacing-2xl) 0', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
        <h2 style={{ color: 'var(--color-success)', marginBottom: '1rem' }}>Đặt Lịch Thành Công!</h2>
        <p className="text-muted">Cảm ơn {user ? user.name : 'bạn'}. Hệ thống đang chuyển hướng sang trang Lịch sử đặt lịch...</p>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: 'var(--spacing-xl) 0', maxWidth: '650px' }}>
      <div className="glass-card" style={{ padding: '2.5rem', background: 'white', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
        <div className="text-center" style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: 'var(--color-secondary)', fontFamily: 'var(--font-serif)', fontSize: '2.2rem' }}>Đặt Lịch Hẹn Visage Spa</h2>
          <p className="text-muted">Bảng giá dịch vụ bình dân - Lọc thông minh 2 chiều giữa Dịch vụ và Nhân viên</p>
        </div>

        {error && (
          <div style={{ padding: '1rem', background: '#FFEBEE', color: 'var(--color-error)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* 1. Chọn 1 Dịch Vụ (Tự động lọc nếu đã chọn Nhân viên) */}
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label className="form-label" style={{ fontWeight: 600, color: '#333', margin: 0 }}>
                1. Chọn Dịch Vụ / Gói Liệu Trình (*)
              </label>
              {selectedStaffObj && (
                <span style={{ fontSize: '0.8rem', background: '#e8f5e9', color: '#2e7d32', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
                  ✓ Lọc {filteredPackages.length} dịch vụ của nhân viên {selectedStaffObj.name}
                </span>
              )}
            </div>

            <select 
              className="form-input" 
              value={selectedPkgId} 
              onChange={(e) => setSelectedPkgId(e.target.value)}
              required
              style={{ padding: '0.75rem', fontSize: '0.95rem', border: selectedStaffObj ? '2px solid var(--color-primary)' : '1px solid #ccc' }}
            >
              <option value="" disabled>-- Vui lòng chọn dịch vụ ({filteredPackages.length} gói tùy chọn) --</option>
              {Object.keys(servicesData).map(catKey => {
                const cat = servicesData[catKey];
                const catPackages = filteredPackages.filter(p => p.categoryKey === catKey);
                if (catPackages.length === 0) return null;
                return (
                  <optgroup key={catKey} label={`--- DỊCH VỤ ${cat.title.toUpperCase()} ---`}>
                    {catPackages.map(pkg => (
                      <option key={pkg.id} value={pkg.id}>
                        [{cat.title}] {pkg.name} - {formatCurrency(pkg.price)}
                      </option>
                    ))}
                  </optgroup>
                );
              })}
            </select>
          </div>

          {/* 2. Chọn Nhân Viên (Chỉ hiển thị tên nhân viên sạch đẹp, tự động lọc nếu đã chọn Dịch vụ) */}
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label className="form-label" style={{ fontWeight: 600, color: '#333', margin: 0 }}>
                2. Chọn Nhân Viên Phục Vụ
              </label>
              {selectedPkg && (
                <span style={{ fontSize: '0.8rem', background: '#e8f5e9', color: '#2e7d32', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
                  ✓ Lọc {filteredStaff.length} nhân viên làm dịch vụ {selectedPkg.categoryTitle}
                </span>
              )}
            </div>

            <select 
              className="form-input" 
              value={staffId} 
              onChange={(e) => setStaffId(e.target.value)}
              style={{ padding: '0.75rem', fontSize: '0.95rem', border: selectedPkg ? '2px solid var(--color-primary)' : '1px solid #ccc' }}
            >
              <option value="">
                {selectedPkg ? `-- Để Spa tự xếp ngẫu nhiên (hoặc chọn 1 trong ${filteredStaff.length} nhân viên) --` : '-- Để Spa tự xếp ngẫu nhiên --'}
              </option>
              {filteredStaff.map(s => (
                <option key={s.id} value={s.id}>
                  👩‍🦰 {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Ngày và Giờ */}
          <div className="flex gap-md" style={{ marginBottom: '1.8rem' }}>
            <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
              <label className="form-label" style={{ fontWeight: 600, color: '#333' }}>3. Ngày hẹn (*)</label>
              <input 
                type="date" 
                className="form-input" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
                style={{ padding: '0.75rem' }}
              />
            </div>
            <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
              <label className="form-label" style={{ fontWeight: 600, color: '#333' }}>Giờ hẹn (*)</label>
              <select 
                className="form-input" 
                value={time} 
                onChange={(e) => setTime(e.target.value)}
                required
                style={{ padding: '0.75rem' }}
              >
                <option value="" disabled>-- Chọn khung giờ --</option>
                <option value="08:30">08:30 AM</option>
                <option value="09:30">09:30 AM</option>
                <option value="10:30">10:30 AM</option>
                <option value="13:30">01:30 PM</option>
                <option value="14:30">02:30 PM</option>
                <option value="15:30">03:30 PM</option>
                <option value="16:30">04:30 PM</option>
                <option value="18:30">06:30 PM</option>
                <option value="19:30">07:30 PM</option>
              </select>
            </div>
          </div>

          <div style={{ padding: '1.2rem', background: '#fcf8f2', borderRadius: '10px', marginBottom: '1.8rem', border: '1px solid #efe6da' }}>
            <h4 style={{ color: 'var(--color-secondary)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>💡 Cam kết dịch vụ từ Visage Spa:</h4>
            <ul style={{ fontSize: '0.88rem', color: '#555', paddingLeft: '1.2rem', margin: 0, lineHeight: 1.7 }}>
              <li>Giá dịch vụ đúng chuẩn bình dân niêm yết, không chèo kéo, không phụ phí.</li>
              <li>Hệ thống tự động lọc 2 chiều giúp chọn đúng dịch vụ và nhân viên phù hợp.</li>
              <li>Bạn có thể xem lại hoặc hủy/đổi lịch tại mục <strong>Lịch sử đặt lịch</strong> trên thanh menu.</li>
            </ul>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '0.9rem', fontWeight: 600, borderRadius: '8px' }}>
            Xác Nhận Đặt Lịch Ngay
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
