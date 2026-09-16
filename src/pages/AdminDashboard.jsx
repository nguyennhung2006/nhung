import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import DashboardLayout from '../components/DashboardLayout';

const AdminDashboard = () => {
  const { services, users, appointments, addService, updateService, deleteService, updateUser, formatCurrency } = useData();
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, users, services, reports

  // --- Reports State ---
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // --- Service Modal State ---
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({ name: '', price: '', duration: '', description: '', category: '' });

  // --- Calculate Stats ---
  const completedAppointments = appointments.filter(app => {
    if (app.status !== 'completed') return false;
    let match = true;
    const appDate = new Date(app.date);
    if (fromDate) match = match && appDate >= new Date(fromDate);
    if (toDate) match = match && appDate <= new Date(toDate);
    return match;
  });

  const totalRevenue = completedAppointments.reduce((sum, app) => sum + (app.price - (app.discount || 0)), 0);
  const newAppointmentsCount = appointments.filter(a => a.status === 'pending' || a.status === 'serving').length;

  // --- Service Handlers ---
  const handleOpenServiceModal = (service = null) => {
    if (service) {
      setEditingService(service.id);
      setServiceForm(service);
    } else {
      setEditingService(null);
      setServiceForm({ name: '', price: '', duration: '', description: '', category: '' });
    }
    setIsServiceModalOpen(true);
  };

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    if (editingService) {
      updateService(editingService, { ...serviceForm, price: Number(serviceForm.price) });
    } else {
      addService({ ...serviceForm, price: Number(serviceForm.price) });
    }
    setIsServiceModalOpen(false);
  };

  const handleDeleteService = (id) => {
    if(window.confirm('Xóa dịch vụ này?')) deleteService(id);
  };

  // --- User Handlers ---
  const toggleUserLock = (id, currentRole) => {
    if(currentRole === 'admin') return alert('Không thể khóa Admin');
    const newRole = currentRole === 'locked' ? 'customer' : 'locked';
    updateUser(id, { role: newRole });
  };

  const menuItems = [
    { id: 'dashboard', label: 'Tổng quan & Lịch Hẹn Khách Hàng' },
    { id: 'users', label: 'Quản lý tài khoản' },
    { id: 'services', label: `Danh mục 28 Dịch vụ Spa (${services.length})` },
    { id: 'reports', label: 'Báo cáo doanh thu' }
  ];

  return (
    <DashboardLayout title="Hệ thống Quản trị Cấp cao (Admin Panel)" menuItems={menuItems} activeTab={activeTab} setActiveTab={setActiveTab}>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--color-secondary)', fontSize: '1.8rem', margin: '0 0 0.5rem 0' }}>
          {menuItems.find(m => m.id === activeTab)?.label}
        </h2>
        <div style={{ width: '40px', height: '3px', background: 'var(--color-primary)' }}></div>
      </div>

      {/* Tab: Dashboard (Tổng quan & Bảng theo dõi Khách hàng - Staff) */}
      {activeTab === 'dashboard' && (
        <div className="animate-fade-in">
          {/* Thống kê doanh thu & lượt làm */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid var(--color-primary)' }}>
              <div className="text-muted" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Doanh Thu Hoàn Thành (Thực tế)</div>
              <div style={{ fontSize: '2.2rem', color: 'var(--color-primary)', fontWeight: 'bold' }}>{formatCurrency(totalRevenue)}</div>
            </div>
            <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid var(--color-success)' }}>
              <div className="text-muted" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Lượt Dịch Vụ Đã Làm Xong</div>
              <div style={{ fontSize: '2.2rem', color: '#2E7D32', fontWeight: 'bold' }}>{completedAppointments.length}</div>
            </div>
            <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid var(--color-warning)' }}>
              <div className="text-muted" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Lịch Hẹn Đang Chờ / Đang Làm</div>
              <div style={{ fontSize: '2.2rem', color: '#E65100', fontWeight: 'bold' }}>{newAppointmentsCount}</div>
            </div>
            <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid var(--color-info)' }}>
              <div className="text-muted" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Tổng Số Dịch Vụ Khả Dụng</div>
              <div style={{ fontSize: '2.2rem', color: '#1565C0', fontWeight: 'bold' }}>{services.length} Dịch Vụ</div>
            </div>
          </div>

          {/* Bảng theo dõi toàn bộ Khách Hàng và Staff làm dịch vụ cho họ */}
          <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem 2rem', background: '#fdfbf7', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, color: 'var(--color-secondary)', fontFamily: 'var(--font-serif)', fontSize: '1.3rem' }}>
                📋 Bảng Theo Dõi Khách Hàng & Staff Làm Dịch Vụ
              </h3>
              <span style={{ fontSize: '0.88rem', color: '#666', fontWeight: 500 }}>Tự động cập nhật doanh thu khi làm xong</span>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.03)', borderBottom: '1px solid #eee' }}>
                  <th style={{ padding: '1rem 1.5rem', color: '#555', fontWeight: 600 }}>Mã Lịch</th>
                  <th style={{ padding: '1rem 1.5rem', color: '#555', fontWeight: 600 }}>Tên Khách Hàng</th>
                  <th style={{ padding: '1rem 1.5rem', color: '#555', fontWeight: 600 }}>Tên Dịch Vụ Đầy Đủ</th>
                  <th style={{ padding: '1rem 1.5rem', color: '#555', fontWeight: 600 }}>Staff / KTV Phục Vụ</th>
                  <th style={{ padding: '1rem 1.5rem', color: '#555', fontWeight: 600 }}>Thời Gian Hẹn</th>
                  <th style={{ padding: '1rem 1.5rem', color: '#555', fontWeight: 600 }}>Trạng Thái</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'right', color: '#555', fontWeight: 600 }}>Doanh Thu (VNĐ)</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(app => (
                  <tr key={app.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '1rem 1.5rem', color: '#888' }}>#{app.id}</td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{app.customerName}</td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-secondary)' }}>{app.serviceName}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>👩‍🦰 <strong>{app.staffName}</strong></td>
                    <td style={{ padding: '1rem 1.5rem' }}>{app.date} <br/><span className="text-muted">{app.time}</span></td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      {app.status === 'pending' && <span className="badge badge-warning">Chờ xác nhận</span>}
                      {app.status === 'serving' && <span className="badge" style={{ background: '#E3F2FD', color: 'var(--color-info)' }}>Đang làm</span>}
                      {app.status === 'completed' && <span className="badge badge-success">✅ Đã hoàn thành (Cộng doanh thu)</span>}
                      {app.status === 'cancelled' && <span className="badge" style={{ background: '#FFEBEE', color: 'var(--color-error)' }}>Đã hủy</span>}
                    </td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right', fontWeight: 'bold', color: app.status === 'completed' ? '#2E7D32' : '#666' }}>
                      {formatCurrency(app.price - (app.discount || 0))}
                    </td>
                  </tr>
                ))}
                {appointments.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center text-muted" style={{ padding: '3rem' }}>
                      Chưa có đơn đặt lịch nào. Bạn hãy dùng tài khoản Khách hàng đăng ký mới để tiến hành Đặt lịch thử nghiệm!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Users */}
      {activeTab === 'users' && (
        <div className="glass-card animate-fade-in" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Danh Sách Tài Khoản Trong Hệ Thống</h3>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.02)' }}>
                <th style={{ padding: '1rem 1.5rem', color: '#555' }}>STT</th>
                <th style={{ padding: '1rem 1.5rem', color: '#555' }}>Họ Tên</th>
                <th style={{ padding: '1rem 1.5rem', color: '#555' }}>Tên Đăng Nhập / Email</th>
                <th style={{ padding: '1rem 1.5rem', color: '#555' }}>Chức Danh / Vai Trò</th>
                <th style={{ padding: '1rem 1.5rem', textAlign: 'right', color: '#555' }}>Trạng Thái</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem 1.5rem' }}>{index + 1}</td>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{u.name}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div><code>{u.username}</code></div>
                    <div className="text-muted" style={{ fontSize: '0.85rem' }}>{u.email}</div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span className={`badge ${u.role === 'admin' ? 'badge-success' : u.role === 'staff' ? 'badge-warning' : 'btn-outline'}`}>
                      {u.role === 'admin' ? 'ADMIN (Quản trị)' : u.role === 'staff' ? `STAFF (${u.title || 'Nhân viên'})` : 'KHÁCH HÀNG'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    {u.role !== 'admin' && (
                      <button 
                        onClick={() => toggleUserLock(u.id, u.role)} 
                        style={{ 
                          padding: '0.3rem 0.8rem', 
                          fontSize: '0.85rem', 
                          borderRadius: '4px',
                          border: `1px solid ${u.role === 'locked' ? 'var(--color-success)' : 'var(--color-error)'}`,
                          color: u.role === 'locked' ? 'var(--color-success)' : 'var(--color-error)',
                          background: 'transparent',
                          cursor: 'pointer'
                        }}
                      >
                        {u.role === 'locked' ? 'Mở khóa' : 'Khóa TK'}
                      </button>
                    )}
                    {u.role === 'admin' && <span className="text-muted" style={{ fontSize: '0.85rem' }}>Khả dụng</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Services */}
      {activeTab === 'services' && (
        <div className="glass-card animate-fade-in" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="flex justify-between items-center" style={{ padding: '1.5rem 2rem', background: '#fdfbf7', borderBottom: '1px solid #eee' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: 'var(--color-secondary)' }}>
              ✨ Danh Mục Đầy Đủ 28 Dịch Vụ Spa Visage
            </h3>
            <button className="btn btn-primary" onClick={() => handleOpenServiceModal()} style={{ padding: '0.4rem 1.2rem', borderRadius: '20px' }}>+ Thêm Dịch Vụ Mới</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.03)' }}>
                <th style={{ padding: '1rem 1.5rem', color: '#555' }}>STT</th>
                <th style={{ padding: '1rem 1.5rem', color: '#555' }}>Tên Dịch Vụ Đầy Đủ</th>
                <th style={{ padding: '1rem 1.5rem', color: '#555' }}>Hạng Mục</th>
                <th style={{ padding: '1rem 1.5rem', color: '#555' }}>Thời Gian</th>
                <th style={{ padding: '1rem 1.5rem', color: '#555' }}>Mức Giá Niêm Yết</th>
                <th style={{ padding: '1rem 1.5rem', textAlign: 'right', color: '#555' }}>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s, idx) => (
                <tr key={s.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem 1.5rem', color: '#888' }}>#{idx + 1}</td>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-secondary)' }}>{s.name}</td>
                  <td style={{ padding: '1rem 1.5rem' }}><span className="badge badge-warning">{s.category}</span></td>
                  <td style={{ padding: '1rem 1.5rem' }}>{s.duration}</td>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>{formatCurrency(s.price)}</td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <button onClick={() => handleOpenServiceModal(s)} className="text-info" style={{ marginRight: '1rem', fontWeight: 500, fontSize: '0.9rem', cursor: 'pointer' }}>Sửa</button>
                    <button onClick={() => handleDeleteService(s.id)} className="text-error" style={{ color: 'var(--color-error)', fontWeight: 500, fontSize: '0.9rem', cursor: 'pointer' }}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Reports */}
      {activeTab === 'reports' && (
        <div className="animate-fade-in">
          <div className="glass-card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Bộ Lọc Doanh Thu</h3>
            <div className="flex gap-md items-center">
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label text-muted" style={{ fontSize: '0.8rem' }}>Từ ngày</label>
                <input type="date" className="form-input" style={{ width: 'auto' }} value={fromDate} onChange={e => setFromDate(e.target.value)} />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label text-muted" style={{ fontSize: '0.8rem' }}>Đến ngày</label>
                <input type="date" className="form-input" style={{ width: 'auto' }} value={toDate} onChange={e => setToDate(e.target.value)} />
              </div>
              <div style={{ alignSelf: 'flex-end' }}>
                <button className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', height: '42px' }}>Xem Báo Cáo</button>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="text-muted" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Doanh Thu Đã Hoàn Thành</div>
                  <div style={{ fontSize: '2.2rem', color: 'var(--color-primary)', fontWeight: 'bold' }}>{formatCurrency(totalRevenue)}</div>
                </div>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#FCE4EC', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>💰</div>
              </div>
            </div>
            
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="text-muted" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Tổng Đơn Dịch Vụ Làm Xong</div>
                  <div style={{ fontSize: '2.2rem', color: 'var(--color-info)', fontWeight: 'bold' }}>{completedAppointments.length}</div>
                </div>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#E3F2FD', color: 'var(--color-info)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>👥</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal CRUD Dịch vụ */}
      {isServiceModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="glass-card animate-fade-in" style={{ width: '500px', background: 'white' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>{editingService ? 'Cập Nhật Dịch Vụ' : 'Thêm Dịch Vụ Mới'}</h3>
            <form onSubmit={handleServiceSubmit}>
              <div className="form-group">
                <label className="form-label">Tên dịch vụ đầy đủ</label>
                <input type="text" className="form-input" required value={serviceForm.name} onChange={e => setServiceForm({...serviceForm, name: e.target.value})} />
              </div>
              <div className="flex gap-md">
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Danh mục</label>
                  <input type="text" className="form-input" required value={serviceForm.category} onChange={e => setServiceForm({...serviceForm, category: e.target.value})} placeholder="VD: Tóc, Móng Tay..." />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Thời gian</label>
                  <input type="text" className="form-input" required value={serviceForm.duration} onChange={e => setServiceForm({...serviceForm, duration: e.target.value})} placeholder="VD: 60 phút" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Mức giá (VNĐ)</label>
                <input type="number" className="form-input" required value={serviceForm.price} onChange={e => setServiceForm({...serviceForm, price: e.target.value})} min="0" />
              </div>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Mô tả chi tiết</label>
                <textarea className="form-input" required rows="4" value={serviceForm.description} onChange={e => setServiceForm({...serviceForm, description: e.target.value})}></textarea>
              </div>
              <div className="flex justify-end gap-sm">
                <button type="button" className="btn btn-outline" onClick={() => setIsServiceModalOpen(false)}>Hủy bỏ</button>
                <button type="submit" className="btn btn-primary">Lưu Lại</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
};

export default AdminDashboard;
