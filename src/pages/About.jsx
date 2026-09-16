import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const About = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('team'); // 'team' or 'policies'

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Staff members with simple titles & simple work duties
  const staffList = [
    {
      id: 12,
      name: 'Trần Khánh Linh',
      role: 'Chuyên Viên Tư Vấn Trực Tuyến',
      initials: 'KL',
      icon: '🎧',
      color: '#E65100',
      duties: ['Chuyên viên tư vấn 1-1', 'Tư vấn Da liễu & Đặt lịch']
    },
    {
      id: 2,
      name: 'Nguyễn Thị Hồng Nhung',
      role: 'Nhà tạo mẫu tóc',
      initials: 'HN',
      icon: '✂️',
      color: '#7c3a3a',
      duties: ['Nhà tạo mẫu tóc', 'Thợ làm tóc']
    },
    {
      id: 4,
      name: 'Lường Thị Giang',
      role: 'Thợ làm móng',
      initials: 'LG',
      icon: '💅',
      color: '#c25975',
      duties: ['Thợ làm móng', 'Chuyên viên massage']
    },
    {
      id: 5,
      name: 'Bế Thị Thu Uyên',
      role: 'Chuyên viên trang điểm',
      initials: 'TU',
      icon: '💄',
      color: '#9c4176',
      duties: ['Chuyên viên trang điểm', 'Chuyên viên chăm sóc da mặt']
    },
    {
      id: 6,
      name: 'Trần Văn Nam',
      role: 'Chuyên viên massage',
      initials: 'VN',
      icon: '💆‍♂️',
      color: '#2e6b56',
      duties: ['Chuyên viên massage', 'Thợ làm tóc']
    },
    {
      id: 7,
      name: 'Hoàng Thùy Linh',
      role: 'Chuyên viên chăm sóc da mặt',
      initials: 'TL',
      icon: '✨',
      color: '#b87532',
      duties: ['Chuyên viên chăm sóc da mặt', 'Thợ làm móng']
    },
    {
      id: 8,
      name: 'Đặng Minh Châu',
      role: 'Thợ làm tóc',
      initials: 'MC',
      icon: '✂️',
      color: '#4a7c59',
      duties: ['Thợ làm tóc', 'Nhà tạo mẫu tóc']
    },
    {
      id: 9,
      name: 'Vũ Thị Mai',
      role: 'Thợ làm móng',
      initials: 'TM',
      icon: '💅',
      color: '#a84370',
      duties: ['Thợ làm móng', 'Chuyên viên trang điểm']
    },
    {
      id: 10,
      name: 'Phạm Quốc Tuấn',
      role: 'Chuyên viên massage',
      initials: 'QT',
      icon: '💆‍♂️',
      color: '#345e7d',
      duties: ['Chuyên viên massage', 'Chuyên viên chăm sóc da mặt']
    },
    {
      id: 11,
      name: 'Đỗ Phương Thảo',
      role: 'Chuyên viên trang điểm',
      initials: 'PT',
      icon: '💄',
      color: '#8b4a7d',
      duties: ['Chuyên viên trang điểm', 'Thợ làm móng']
    }
  ];

  const policies = [
    {
      title: '1. Chính sách Giá cả Bình dân & Minh bạch',
      icon: '🏷️',
      content: 'VISAGE cam kết mang đến dịch vụ chất lượng cao với mức giá bình dân phù hợp với tất cả khách hàng (học sinh, sinh viên, người đi làm). Bảng giá công khai minh bạch 100%, không phát sinh phụ phí ngoài tư vấn.'
    },
    {
      title: '2. Chính sách Bảo hành Dịch vụ',
      icon: '🛡️',
      content: 'Bảo hành 7 ngày đối với dịch vụ Sơn Gel / Đắp móng (nhận dặm lại miễn phí nếu bong tróc) và bảo hành 14 ngày cho các dịch vụ uốn / nhuộm tóc nếu màu sắc không đúng tư vấn ban đầu.'
    },
    {
      title: '3. Quy định Đặt lịch & Chọn Nhân viên',
      icon: '📅',
      content: 'Quý khách hoàn toàn tự do lựa chọn Nhân viên yêu thích khi đặt lịch trực tuyến. Vui lòng đến đúng giờ hẹn hoặc báo trước 1 tiếng nếu cần đổi thời gian để nhân viên giữ chỗ cho bạn.'
    },
    {
      title: '4. Cam kết Bảo mật & An toàn Y khoa',
      icon: '🔒',
      content: 'Mọi dụng cụ nhặt da, lấy nhân mụn, khăn lau đều được khử trùng chuẩn y khoa trước khi dùng cho từng khách hàng. Thông tin cá nhân khách hàng được bảo mật tuyệt đối.'
    }
  ];

  const handleBookWithStaff = (staffId, staffName) => {
    if (!user) {
      alert(`Bạn cần Đăng nhập hoặc Đăng ký tài khoản để Đặt lịch với ${staffName}!`);
      navigate('/login');
    } else {
      navigate(`/booking?staffId=${staffId}`);
    }
  };

  return (
    <div className="animate-fade-in" style={{ background: '#fdfbf7', paddingBottom: '6rem' }}>
      
      {/* Banner */}
      <section style={{ 
        background: 'linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75)), url("https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '6rem 2rem'
      }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem', color: 'var(--color-primary)', display: 'block', marginBottom: '1rem', fontWeight: 600 }}>
          Về Chúng Tôi - Visage Salon & Spa
        </span>
        <h1 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-serif)', margin: '0 0 1rem 0' }}>
          Đội Ngũ Nhân Viên & Chính Sách Dịch Vụ
        </h1>
        <p style={{ maxWidth: '750px', margin: '0 auto', fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.6 }}>
          Đội ngũ Nhà tạo mẫu tóc, Thợ làm tóc, Chuyên viên trang điểm, Thợ làm móng, Chuyên viên massage và Chuyên viên chăm sóc da mặt lành nghề.
        </p>
      </section>

      {/* Tabs Control */}
      <div className="container" style={{ marginTop: '3rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', background: '#eae3d9', padding: '6px', borderRadius: '30px', gap: '8px' }}>
          <button 
            onClick={() => setActiveTab('team')}
            style={{ 
              padding: '0.8rem 2rem', 
              borderRadius: '25px', 
              border: 'none', 
              cursor: 'pointer', 
              fontWeight: 600,
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              background: activeTab === 'team' ? 'var(--color-secondary)' : 'transparent',
              color: activeTab === 'team' ? 'white' : '#555'
            }}
          >
            👥 Đội Ngũ Nhân Viên ({staffList.length})
          </button>
          <button 
            onClick={() => setActiveTab('policies')}
            style={{ 
              padding: '0.8rem 2rem', 
              borderRadius: '25px', 
              border: 'none', 
              cursor: 'pointer', 
              fontWeight: 600,
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              background: activeTab === 'policies' ? 'var(--color-secondary)' : 'transparent',
              color: activeTab === 'policies' ? 'white' : '#555'
            }}
          >
            📜 Chính Sách Spa
          </button>
        </div>
      </div>

      {/* Tab 1: Staff Team (Short job titles & simple work tasks) */}
      {activeTab === 'team' && (
        <section className="container" style={{ marginTop: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--color-secondary)' }}>
              Danh Sách Nhân Viên Trực Ca ({staffList.length} nhân viên)
            </h2>
            <p className="text-muted">Được phân chia công việc rõ ràng - Chọn nhân viên yêu thích và đặt lịch hẹn dễ dàng</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {staffList.map(staff => (
              <div 
                key={staff.id} 
                style={{ 
                  background: 'white', 
                  borderRadius: '16px', 
                  padding: '1.8rem',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
                  border: '1px solid #f0e6d8',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  {/* Header Avatar Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.2rem' }}>
                    <div style={{ 
                      width: '56px', 
                      height: '56px', 
                      borderRadius: '50%', 
                      background: `linear-gradient(135deg, ${staff.color} 0%, #333 100%)`, 
                      color: 'white', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontSize: '1.3rem', 
                      fontWeight: 'bold',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      position: 'relative',
                      flexShrink: 0
                    }}>
                      {staff.initials}
                      <span style={{ position: 'absolute', bottom: '-2px', right: '-2px', fontSize: '0.85rem', background: 'white', borderRadius: '50%', padding: '2px' }}>
                        {staff.icon}
                      </span>
                    </div>

                    <div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', margin: '0 0 0.2rem 0', color: 'var(--color-secondary)' }}>
                        {staff.name}
                      </h3>
                      {/* Simple Title */}
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                        {staff.role}
                      </div>
                    </div>
                  </div>

                  {/* Simple Duty Tags */}
                  <div style={{ background: '#fcfaf7', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #efe6da', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#555', marginBottom: '0.5rem' }}>
                      Công việc làm:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {staff.duties.map((duty, index) => (
                        <span key={index} style={{ background: '#f5efe6', color: 'var(--color-secondary)', padding: '3px 10px', borderRadius: '12px', fontSize: '0.82rem', fontWeight: 600 }}>
                          ✓ {duty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Booking Button */}
                <button 
                  onClick={() => handleBookWithStaff(staff.id, staff.name)}
                  className="btn btn-primary"
                  style={{ 
                    width: '100%', 
                    fontWeight: 600, 
                    padding: '0.65rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    borderRadius: '8px',
                    fontSize: '0.9rem'
                  }}
                >
                  <span>📅</span> Đặt lịch với {staff.name.split(' ').slice(-1).join(' ')}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tab 2: Policies */}
      {activeTab === 'policies' && (
        <section className="container" style={{ marginTop: '4rem', maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--color-secondary)' }}>
              Chính Sách Cam Kết Dịch Vụ
            </h2>
            <p className="text-muted">Chất lượng dịch vụ tốt - Giá thành bình dân - Phục vụ tận tâm</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
            {policies.map((p, index) => (
              <div 
                key={index} 
                style={{ 
                  background: 'white', 
                  padding: '2rem', 
                  borderRadius: '12px', 
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                  border: '1px solid #efe6da'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '2rem' }}>{p.icon}</span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', margin: 0, color: 'var(--color-secondary)' }}>
                    {p.title}
                  </h3>
                </div>
                <p style={{ color: '#555', lineHeight: 1.8, fontSize: '1rem', margin: 0, paddingLeft: '3rem' }}>
                  {p.content}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default About;
