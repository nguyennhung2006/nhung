import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const CustomerHistory = () => {
  const { user } = useAuth();
  const { appointments, updateAppointment, formatCurrency } = useData();

  // Filter appointments for current customer
  const myAppointments = user ? appointments.filter(app => app.customerId === user.id || (app.customerName && user.name && app.customerName.toLowerCase().includes(user.name.toLowerCase()))) : [];

  // Tabs: 'upcoming' | 'history'
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Date filters for history
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Modal state
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [rescheduleData, setRescheduleData] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  const handleCancel = (id) => {
    if(window.confirm('Bạn có chắc chắn muốn hủy lịch hẹn này?')) {
      updateAppointment(id, { status: 'cancelled' });
    }
  };

  const handleConfirmCompleted = (id) => {
    if(window.confirm('Xác nhận bạn đã làm xong dịch vụ này? Hệ thống sẽ ghi nhận hoàn thành và cập nhật doanh thu.')) {
      updateAppointment(id, { status: 'completed' });
      alert('Cảm ơn bạn! Đơn dịch vụ đã được xác nhận hoàn thành.');
    }
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    if(newDate && newTime) {
      updateAppointment(rescheduleData.id, { date: newDate, time: newTime });
      setRescheduleData(null);
      alert('Đổi giờ thành công!');
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed': return <span className="badge badge-success">Đã hoàn thành</span>;
      case 'cancelled': return <span className="badge" style={{ background: '#FFEBEE', color: 'var(--color-error)' }}>Đã hủy</span>;
      case 'serving': return <span className="badge" style={{ background: '#E3F2FD', color: 'var(--color-info)' }}>Đang làm</span>;
      case 'pending': default: return <span className="badge badge-warning">Đang chờ</span>;
    }
  };

  // Filter Data
  const upcomingList = myAppointments.filter(app => app.status === 'pending' || app.status === 'serving');
  const historyList = myAppointments.filter(app => {
    if (app.status === 'pending' || app.status === 'serving') return false;
    
    let match = true;
    const appDate = new Date(app.date);
    if (fromDate) match = match && appDate >= new Date(fromDate);
    if (toDate) match = match && appDate <= new Date(toDate);
    return match;
  });

  return (
    <div className="container animate-fade-in" style={{ padding: 'var(--spacing-xl) 0' }}>
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h2 style={{ color: 'var(--color-secondary)' }}>Quản Lý Lịch Hẹn Cá Nhân</h2>
        <p className="text-muted">Theo dõi lịch trình, xác nhận dịch vụ đã làm xong và xem hóa đơn</p>
      </div>

      {/* Tabs */}
      <div className="flex" style={{ borderBottom: '2px solid #eee', marginBottom: 'var(--spacing-xl)' }}>
        <button 
          className="btn" 
          onClick={() => setActiveTab('upcoming')}
          style={{ 
            borderRadius: 0, 
            borderBottom: activeTab === 'upcoming' ? '2px solid var(--color-primary)' : '2px solid transparent',
            color: activeTab === 'upcoming' ? 'var(--color-primary)' : 'var(--color-text-muted)',
            marginBottom: '-2px',
            padding: '1rem 2rem',
            fontWeight: 600
          }}
        >
          Lịch Hẹn Hiện Tại ({upcomingList.length})
        </button>
        <button 
          className="btn" 
          onClick={() => setActiveTab('history')}
          style={{ 
            borderRadius: 0, 
            borderBottom: activeTab === 'history' ? '2px solid var(--color-primary)' : '2px solid transparent',
            color: activeTab === 'history' ? 'var(--color-primary)' : 'var(--color-text-muted)',
            marginBottom: '-2px',
            padding: '1rem 2rem',
            fontWeight: 600
          }}
        >
          Lịch Sử Dịch Vụ ({historyList.length})
        </button>
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        
        {/* Tab: Upcoming */}
        {activeTab === 'upcoming' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.03)', borderBottom: '1px solid #eee' }}>
                <th style={{ padding: '1rem' }}>Mã Lịch</th>
                <th style={{ padding: '1rem' }}>Dịch Vụ Đã Chọn</th>
                <th style={{ padding: '1rem' }}>Kỹ Thuật Viên Phục Vụ</th>
                <th style={{ padding: '1rem' }}>Thời Gian Hẹn</th>
                <th style={{ padding: '1rem' }}>Trạng Thái</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Thao Tác Xác Nhận</th>
              </tr>
            </thead>
            <tbody>
              {upcomingList.length === 0 ? (
                <tr><td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: '#888' }}>Bạn chưa có lịch hẹn nào sắp tới. Nhấn Đặt Lịch Ngay trên menu để tạo hẹn mới!</td></tr>
              ) : upcomingList.map(app => (
                <tr key={app.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem', fontWeight: 500 }}>#{app.id}</td>
                  <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-secondary)' }}>{app.serviceName}</td>
                  <td style={{ padding: '1rem', fontWeight: 500 }}>👩‍🦰 {app.staffName || 'Chưa chọn'}</td>
                  <td style={{ padding: '1rem' }}>
                    <div>{app.date}</div>
                    <div className="text-muted" style={{ fontSize: '0.875rem' }}>{app.time}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>{getStatusBadge(app.status)}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div className="flex gap-sm justify-end items-center">
                      <button 
                        onClick={() => handleConfirmCompleted(app.id)}
                        className="btn" 
                        style={{ padding: '0.35rem 0.85rem', fontSize: '0.85rem', background: '#2E7D32', color: 'white', fontWeight: 600, borderRadius: '20px', cursor: 'pointer' }}
                      >
                        ✅ Xác nhận đã làm xong
                      </button>
                      {app.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => setRescheduleData(app)}
                            className="btn btn-outline" 
                            style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
                          >
                            Đổi giờ
                          </button>
                          <button 
                            onClick={() => handleCancel(app.id)}
                            className="btn btn-outline" 
                            style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', color: 'var(--color-error)', borderColor: 'var(--color-error)' }}
                          >
                            Hủy lịch
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Tab: History */}
        {activeTab === 'history' && (
          <div>
            <div className="flex gap-md items-center" style={{ padding: '1rem', background: '#fafafa', borderBottom: '1px solid #eee' }}>
              <span className="text-muted" style={{ fontSize: '0.9rem' }}>Lọc theo ngày:</span>
              <input type="date" className="form-input" style={{ width: 'auto', padding: '0.25rem 0.5rem' }} value={fromDate} onChange={e => setFromDate(e.target.value)} />
              <span className="text-muted">-</span>
              <input type="date" className="form-input" style={{ width: 'auto', padding: '0.25rem 0.5rem' }} value={toDate} onChange={e => setToDate(e.target.value)} />
              <button className="btn btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }} onClick={() => {setFromDate(''); setToDate('');}}>Xóa lọc</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.03)', borderBottom: '1px solid #eee' }}>
                  <th style={{ padding: '1rem' }}>Mã Lịch</th>
                  <th style={{ padding: '1rem' }}>Dịch vụ</th>
                  <th style={{ padding: '1rem' }}>KTV Phục vụ</th>
                  <th style={{ padding: '1rem' }}>Ngày hoàn thành</th>
                  <th style={{ padding: '1rem' }}>Trạng thái</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {historyList.length === 0 ? (
                  <tr><td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: '#888' }}>Chưa có lịch sử dịch vụ đã hoàn thành.</td></tr>
                ) : historyList.map(app => (
                  <tr key={app.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '1rem', fontWeight: 500 }}>#{app.id}</td>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{app.serviceName}</td>
                    <td style={{ padding: '1rem' }}>{app.staffName}</td>
                    <td style={{ padding: '1rem' }}>{app.date}</td>
                    <td style={{ padding: '1rem' }}>{getStatusBadge(app.status)}</td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      {app.status === 'completed' && (
                        <button 
                          onClick={() => setSelectedInvoice(app)}
                          className="btn btn-primary" 
                          style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
                        >
                          Xem Hóa đơn
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reschedule Modal */}
      {rescheduleData && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="glass-card animate-fade-in" style={{ width: '400px', background: 'white' }}>
            <h3 style={{ marginBottom: '1rem' }}>Đổi giờ cho lịch #{rescheduleData.id}</h3>
            <form onSubmit={handleRescheduleSubmit}>
              <div className="form-group">
                <label className="form-label">Ngày mới</label>
                <input type="date" className="form-input" required value={newDate} onChange={e => setNewDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
              </div>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Giờ mới</label>
                <select className="form-input" required value={newTime} onChange={e => setNewTime(e.target.value)}>
                  <option value="">-- Chọn giờ --</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                </select>
              </div>
              <div className="flex justify-end gap-sm">
                <button type="button" className="btn btn-outline" onClick={() => setRescheduleData(null)}>Hủy bỏ</button>
                <button type="submit" className="btn btn-primary">Xác nhận</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {selectedInvoice && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="glass-card animate-fade-in" style={{ width: '400px', background: '#fff' }}>
            <div className="text-center" style={{ borderBottom: '2px dashed #eee', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <h2 style={{ color: 'var(--color-primary)', margin: 0 }}>Visage Spa</h2>
              <div className="text-muted" style={{ fontSize: '0.875rem' }}>HÓA ĐƠN DỊCH VỤ HOÀN THÀNH</div>
            </div>
            
            <div style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              <div className="flex justify-between" style={{ marginBottom: '0.5rem' }}><span>Mã HĐ:</span> <strong>#{selectedInvoice.id}</strong></div>
              <div className="flex justify-between" style={{ marginBottom: '0.5rem' }}><span>Ngày:</span> <strong>{selectedInvoice.date}</strong></div>
              <div className="flex justify-between" style={{ marginBottom: '0.5rem' }}><span>Khách hàng:</span> <strong>{selectedInvoice.customerName}</strong></div>
              <div className="flex justify-between" style={{ marginBottom: '0.5rem' }}><span>KTV thực hiện:</span> <strong>{selectedInvoice.staffName}</strong></div>
            </div>

            <div style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
              <div className="flex justify-between" style={{ fontWeight: 500 }}>
                <span>{selectedInvoice.serviceName}</span>
                <span>{formatCurrency(selectedInvoice.price)}</span>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              {selectedInvoice.discount > 0 && (
                <div className="flex justify-between" style={{ color: 'var(--color-success)', marginBottom: '0.5rem' }}>
                  <span>Khuyến mãi:</span>
                  <span>-{formatCurrency(selectedInvoice.discount)}</span>
                </div>
              )}
              <div className="flex justify-between" style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '1rem' }}>
                <span>Tổng tiền:</span>
                <span className="text-primary">{formatCurrency(selectedInvoice.price - (selectedInvoice.discount || 0))}</span>
              </div>
            </div>

            <div className="text-center" style={{ marginTop: '2rem' }}>
              <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => setSelectedInvoice(null)}>Đóng</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CustomerHistory;
