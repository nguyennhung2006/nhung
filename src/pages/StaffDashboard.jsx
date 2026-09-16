import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import DashboardLayout from '../components/DashboardLayout';

const StaffDashboard = () => {
  const { user, needsHumanAssistance, resolveHandoff } = useAuth();
  const { 
    appointments, 
    updateAppointment, 
    users, 
    formatCurrency,
    liveChatMessages,
    isHandoffActive,
    handoffCustomerName,
    sendStaffLiveMsg,
    endHandoff
  } = useData();

  const [activeTab, setActiveTab] = useState('appointments'); // appointments, status, billing, customers
  const [staffReplyInput, setStaffReplyInput] = useState('');

  // FILTER STRICTLY FOR LOGGED IN STAFF ONLY!
  const myStaffAppointments = appointments.filter(app => {
    if (!user) return true;
    if (app.staffId && user.id && app.staffId === user.id) return true;
    if (app.staffName && user.name && app.staffName.toLowerCase().includes(user.name.toLowerCase())) return true;
    return false;
  });

  const activeAppointments = myStaffAppointments.filter(app => app.status === 'pending' || app.status === 'serving');
  const billingAppointments = myStaffAppointments.filter(app => app.status === 'serving');
  const customers = users.filter(u => u.role === 'customer');

  // Billing Modal
  const [billingData, setBillingData] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  const handleUpdateStatus = (id, newStatus) => {
    updateAppointment(id, { status: newStatus });
  };

  const handleCompleteBilling = (e) => {
    e.preventDefault();
    updateAppointment(billingData.id, { status: 'completed', discount: Number(discountAmount) });
    setBillingData(null);
    setDiscountAmount(0);
    alert('Thanh toán thành công và Hóa đơn đã được lưu!');
  };

  const handleSendStaffReply = (e) => {
    e.preventDefault();
    if (!staffReplyInput.trim()) return;
    const currentStaffName = user ? `${user.name} (Chuyên viên tư vấn)` : 'Nguyễn Thị Hồng Nhung (Chuyên viên tư vấn)';
    sendStaffLiveMsg(staffReplyInput, currentStaffName);
    setStaffReplyInput('');
  };

  const menuItems = [
    { id: 'appointments', label: 'Quản lý lịch hẹn cá nhân' },
    { id: 'status', label: 'Cập nhật trạng thái' },
    { id: 'billing', label: 'Thanh toán & Hóa đơn' },
    { id: 'customers', label: 'Danh sách khách hàng' }
  ];

  return (
    <DashboardLayout title={`Khu vực Nhân viên: ${user ? user.name : 'Staff Portal'}`} menuItems={menuItems} activeTab={activeTab} setActiveTab={setActiveTab}>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--color-secondary)', fontSize: '1.8rem', margin: '0 0 0.5rem 0' }}>
          {menuItems.find(m => m.id === activeTab)?.label}
        </h2>
        <div style={{ width: '40px', height: '3px', background: 'var(--color-primary)' }}></div>
      </div>

      <div className="glass-card animate-fade-in" style={{ padding: 0, overflow: 'hidden' }}>
        
        {/* Tab 1: Quản lý lịch hẹn cá nhân */}
        {activeTab === 'appointments' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.03)', borderBottom: '1px solid #eee' }}>
                <th style={{ padding: '1rem 1.5rem', color: '#555', fontWeight: 600 }}>Mã lịch hẹn</th>
                <th style={{ padding: '1rem 1.5rem', color: '#555', fontWeight: 600 }}>Tên Khách Hàng (Đăng ký)</th>
                <th style={{ padding: '1rem 1.5rem', color: '#555', fontWeight: 600 }}>Dịch Vụ Đã Đặt</th>
                <th style={{ padding: '1rem 1.5rem', color: '#555', fontWeight: 600 }}>Thời Gian Hẹn</th>
                <th style={{ padding: '1rem 1.5rem', color: '#555', fontWeight: 600 }}>Trạng Thái</th>
                <th style={{ padding: '1rem 1.5rem', textAlign: 'right', color: '#555', fontWeight: 600 }}>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {myStaffAppointments.map(app => (
                <tr key={app.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem 1.5rem' }}>#{app.id}</td>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{app.customerName}</td>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-secondary)' }}>{app.serviceName}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>{app.date} <br/><span className="text-muted">{app.time}</span></td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    {app.status === 'pending' && <span className="badge badge-warning">Chờ xác nhận</span>}
                    {app.status === 'serving' && <span className="badge" style={{ background: '#E3F2FD', color: 'var(--color-info)' }}>Đang làm</span>}
                    {app.status === 'completed' && <span className="badge badge-success">Đã hoàn thành</span>}
                    {app.status === 'cancelled' && <span className="badge" style={{ background: '#FFEBEE', color: 'var(--color-error)' }}>Đã hủy</span>}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    {(app.status === 'pending' || app.status === 'serving') && (
                      <div className="flex gap-sm justify-end items-center">
                        {app.status === 'pending' && (
                          <button onClick={() => handleUpdateStatus(app.id, 'serving')} className="btn btn-outline" style={{ padding: '0.3rem 0.8rem', fontSize: '0.85rem' }}>Bắt đầu làm</button>
                        )}
                        <button 
                          onClick={() => {
                            if(window.confirm('Xác nhận bạn đã làm xong dịch vụ này cho khách hàng?')) {
                              handleUpdateStatus(app.id, 'completed');
                              alert('Đã cập nhật trạng thái làm xong! Doanh thu đã được cộng lên hệ thống Admin.');
                            }
                          }} 
                          className="btn" 
                          style={{ padding: '0.35rem 0.85rem', fontSize: '0.85rem', background: '#2E7D32', color: 'white', fontWeight: 600, borderRadius: '20px', cursor: 'pointer' }}
                        >
                          ✅ Xác nhận đã làm xong
                        </button>
                        {app.status === 'pending' && (
                          <button onClick={() => handleUpdateStatus(app.id, 'cancelled')} className="text-error" style={{ color: 'var(--color-error)', fontWeight: 500, fontSize: '0.85rem', cursor: 'pointer', background: 'none', border: 'none' }}>Hủy lịch</button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {myStaffAppointments.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted" style={{ padding: '3rem' }}>
                    Chưa có lịch hẹn nào phân công cho bạn ({user ? user.name : 'Chuyên viên'}). Lịch hẹn mới từ khách hàng thực tế sẽ xuất hiện tại đây.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* Tab 2: Cập nhật trạng thái dịch vụ */}
        {activeTab === 'status' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.03)', borderBottom: '1px solid #eee' }}>
                <th style={{ padding: '1rem 1.5rem', color: '#555', fontWeight: 600 }}>Tên Khách Hàng</th>
                <th style={{ padding: '1rem 1.5rem', color: '#555', fontWeight: 600 }}>Dịch Vụ Phục Vụ</th>
                <th style={{ padding: '1rem 1.5rem', color: '#555', fontWeight: 600 }}>Trạng thái hiện tại</th>
                <th style={{ padding: '1rem 1.5rem', textAlign: 'right', color: '#555', fontWeight: 600 }}>Cập nhật</th>
              </tr>
            </thead>
            <tbody>
              {activeAppointments.map(app => (
                <tr key={app.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{app.customerName}</td>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{app.serviceName}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    {app.status === 'pending' ? <span className="badge badge-warning">Đang chờ</span> : <span className="badge" style={{ background: '#E3F2FD', color: 'var(--color-info)' }}>Đang thực hiện</span>}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <div className="flex gap-sm justify-end items-center">
                      {app.status === 'pending' && (
                        <button onClick={() => handleUpdateStatus(app.id, 'serving')} className="btn btn-outline" style={{ padding: '0.3rem 0.8rem', fontSize: '0.85rem' }}>Bắt đầu làm</button>
                      )}
                      <button 
                        onClick={() => {
                          if(window.confirm('Xác nhận bạn đã làm xong dịch vụ này cho khách hàng?')) {
                            handleUpdateStatus(app.id, 'completed');
                            alert('Đã cập nhật trạng thái làm xong! Doanh thu đã được cộng lên hệ thống Admin.');
                          }
                        }} 
                        className="btn" 
                        style={{ padding: '0.35rem 0.85rem', fontSize: '0.85rem', background: '#2E7D32', color: 'white', fontWeight: 600, borderRadius: '20px', cursor: 'pointer' }}
                      >
                        ✅ Xác nhận đã làm xong
                      </button>
                      {app.status === 'serving' && (
                        <button onClick={() => { setActiveTab('billing'); setBillingData(app); }} className="btn btn-primary" style={{ padding: '0.3rem 0.8rem', fontSize: '0.85rem' }}>Lập Hóa Đơn</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {activeAppointments.length === 0 && <tr><td colSpan="4" className="text-center text-muted" style={{ padding: '2rem' }}>Không có ca dịch vụ nào đang chờ xử lý.</td></tr>}
            </tbody>
          </table>
        )}

        {/* Tab 3: Thanh toán & Hóa đơn */}
        {activeTab === 'billing' && (
          <div style={{ padding: '2rem' }}>
            {billingAppointments.length === 0 ? (
              <div className="text-center text-muted" style={{ padding: '2rem' }}>Không có ca dịch vụ nào đang chờ thanh toán.</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {billingAppointments.map(app => (
                  <div key={app.id} style={{ border: '1px solid #eee', borderRadius: 'var(--radius-md)', padding: '1.5rem', background: '#fafafa' }}>
                    <div className="flex justify-between" style={{ marginBottom: '1rem', borderBottom: '1px dashed #ccc', paddingBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '1.2rem' }}>{app.customerName}</strong>
                      <span className="text-muted">#{app.id}</span>
                    </div>
                    <div style={{ marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: 1.8 }}>
                      <div className="flex justify-between"><span>Dịch vụ:</span> <strong>{app.serviceName}</strong></div>
                      <div className="flex justify-between"><span>KTV:</span> <strong>{app.staffName}</strong></div>
                      <div className="flex justify-between" style={{ marginTop: '0.5rem' }}><span>Đơn giá:</span> <strong className="text-primary">{formatCurrency(app.price)}</strong></div>
                    </div>
                    <button onClick={() => setBillingData(app)} className="btn btn-primary" style={{ width: '100%' }}>Lập Hóa Đơn Thanh Toán</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Danh sách khách hàng */}
        {activeTab === 'customers' && (
          <div>
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
              <input type="text" className="form-input" placeholder="🔍 Tìm theo tên hoặc SĐT..." style={{ maxWidth: '300px' }} />
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <th style={{ padding: '1rem 1.5rem' }}>Họ Tên Khách Hàng (Tài khoản thực tế)</th>
                  <th style={{ padding: '1rem 1.5rem' }}>SĐT</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Email</th>
                </tr>
              </thead>
              <tbody>
                {customers.map(c => (
                  <tr key={c.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{c.name}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>{c.phone}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>{c.email}</td>
                  </tr>
                ))}
                {customers.length === 0 && (
                  <tr><td colSpan="3" className="text-center text-muted" style={{ padding: '2rem' }}>Chưa có tài khoản khách hàng nào đăng ký mới.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* Billing & Invoice Modal */}
      {billingData && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="glass-card animate-fade-in" style={{ width: '500px', background: 'white' }}>
            <h3 style={{ marginBottom: '1.5rem', textAlign: 'center', color: 'var(--color-secondary)' }}>Xác Nhận Thanh Toán</h3>
            
            <div style={{ background: '#fafafa', padding: '1.5rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', border: '1px solid #eee' }}>
              <div className="flex justify-between" style={{ marginBottom: '0.8rem' }}><span>Khách hàng:</span> <strong>{billingData.customerName}</strong></div>
              <div className="flex justify-between" style={{ marginBottom: '0.8rem' }}><span>Dịch vụ:</span> <strong>{billingData.serviceName}</strong></div>
              <div className="flex justify-between"><span>Giá gốc:</span> <strong>{formatCurrency(billingData.price)}</strong></div>
            </div>

            <form onSubmit={handleCompleteBilling}>
              <div className="form-group">
                <label className="form-label">Mã Giảm Giá / Khuyến mãi (VNĐ)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={discountAmount} 
                  onChange={e => setDiscountAmount(e.target.value)} 
                  min="0"
                  max={billingData.price}
                />
              </div>

              <div className="flex justify-between items-center" style={{ padding: '1.5rem 0', borderTop: '2px dashed #eee', marginBottom: '1.5rem', fontSize: '1.3rem', fontWeight: 'bold' }}>
                <span>Tổng phải trả:</span>
                <span className="text-primary">{formatCurrency(billingData.price - discountAmount)}</span>
              </div>

              <div className="form-group">
                <label className="form-label">Phương thức thanh toán</label>
                <select className="form-input">
                  <option>Chuyển khoản / Quẹt thẻ</option>
                  <option>Tiền mặt</option>
                </select>
              </div>

              <div className="flex justify-end gap-sm" style={{ marginTop: '2rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setBillingData(null)}>Hủy bỏ</button>
                <button type="submit" className="btn btn-primary">Xác Nhận & In Hóa Đơn</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
};

export default StaffDashboard;
