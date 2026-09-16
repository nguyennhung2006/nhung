import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import AnimatedImage from '../components/AnimatedImage';

const Store = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { formatCurrency } = useData();
  const [claimedVouchers, setClaimedVouchers] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const vouchers = [
    {
      id: 'v1',
      code: 'VISAGE20K',
      title: 'Voucher Khách Hàng Mới',
      discount: 'Tặng ngay 20.000 VNĐ',
      desc: 'Áp dụng cho hóa đơn từ 50.000 VNĐ cho lần đầu trải nghiệm tại Visage Spa.',
      exp: 'HSD: 31/12/2026',
      badge: 'BÁN CHẠY NHẤT'
    },
    {
      id: 'v2',
      code: 'SINHNHAT50K',
      title: 'Voucher Sinh Nhật Ấm Cúm',
      discount: 'Tặng ngay 50.000 VNĐ',
      desc: 'Áp dụng cho hóa đơn từ 150.000 VNĐ trong tháng sinh nhật của bạn.',
      exp: 'HSD: Trong tháng sinh nhật',
      badge: 'ĐẶC QUYỀN VIP'
    },
    {
      id: 'v3',
      code: 'BANBE30',
      title: 'Voucher Đi 2 Tính 1 - Thư Giãn Bạn Bè',
      discount: 'Giảm 50% người thứ 2',
      desc: 'Khi đi cùng bạn bè trải nghiệm gói Massage Body đá nóng 90 phút.',
      exp: 'HSD: 30 ngày từ khi nhận',
      badge: 'ƯU ĐÃI NHÓM'
    },
    {
      id: 'v4',
      code: 'DA30K',
      title: 'Voucher Chăm Sóc Da & Triệt Lông',
      discount: 'Giảm 30.000 VNĐ',
      desc: 'Ưu đãi dành riêng cho các liệu trình Lấy nhân mụn & Triệt lông mát lạnh.',
      exp: 'HSD: 15/10/2026',
      badge: 'HOT DEAL'
    }
  ];

  const packages = [
    {
      id: 'pkg_01',
      name: 'Combo VIP Weekend Relaxation',
      subtitle: 'Thư giãn trọn vẹn giá bình dân',
      price: 220000,
      originalPrice: 310000,
      img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      items: [
        'Massage Body Đá Nóng 90 phút',
        'Gội Đầu Dưỡng Sinh Thảo Dược 60 phút',
        'Chăm Sóc Da Mặt Nạ Thảo Dược',
        'Thưởng thức trà dưỡng nhan miễn phí'
      ]
    },
    {
      id: 'pkg_02',
      name: 'Combo Cô Dâu Rạng Rỡ Hạt Dẻ',
      subtitle: 'Tỏa sáng rực rỡ trong ngày trọng đại',
      price: 550000,
      originalPrice: 800000,
      img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      items: [
        'Trang Điểm & Làm Tóc Cô Dâu Ngày Cưới',
        'Liệu Trình Chăm Sóc Da Mặt Căng Bóng',
        'Chăm Sóc & Vẽ Móng Nail Cô Dâu Đính Đá',
        'Tặng kèm 1 lần dặm phấn tận nơi'
      ]
    },
    {
      id: 'pkg_03',
      name: 'Combo Detox & Tái Tạo Toàn Thân',
      subtitle: 'Tái tạo năng lượng & Phục hồi sức khỏe',
      price: 350000,
      originalPrice: 520000,
      img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      items: [
        'Tẩy Tế Bào Chết Toàn Thân Thảo Mộc',
        'Triệt Lông VIP Toàn Thân Mát Lạnh',
        'Ủ Trắng Da Body Tinh Chất Ngọc Trai',
        'Ấn Huyệt Vai Gáy Thư Giãn'
      ]
    }
  ];

  const handleClaimVoucher = (code) => {
    if (claimedVouchers.includes(code)) return;
    setClaimedVouchers([...claimedVouchers, code]);
    alert(`🎉 Bạn đã lưu thành công Mã Voucher [ ${code} ] vào tài khoản!`);
  };

  const handleBookPackage = (pkgName) => {
    if (!user) {
      alert('Vui lòng Đăng nhập hoặc Đăng ký tài khoản để Đặt gói khuyến mãi!');
      navigate('/login');
    } else {
      navigate('/booking');
    }
  };

  return (
    <div className="animate-fade-in" style={{ background: '#fdfbf7', paddingBottom: '6rem' }}>
      
      {/* Header Banner */}
      <section style={{ 
        background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1549298240-0d8e60513026?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '6rem 2rem'
      }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem', color: 'var(--color-primary)', display: 'block', marginBottom: '1rem', fontWeight: 600 }}>
          Cửa Hàng Khuyến Mãi Visage
        </span>
        <h1 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-serif)', margin: '0 0 1rem 0' }}>
          Mã Voucher & Gói Combo Bình Dân
        </h1>
        <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.6 }}>
          Sưu tầm ngay các Mã Voucher tiết kiệm và đặt mua các gói Combo trải nghiệm trọn gói với mức giá hạt dẻ nhất!
        </p>
      </section>

      {/* 1. Section: Voucher List */}
      <section className="container" style={{ marginTop: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--color-secondary)' }}>
            🎁 Mã Voucher Tiết Kiệm
          </h2>
          <p className="text-muted">Lưu voucher và áp dụng ngay khi đặt lịch trực tuyến hoặc thanh toán tại Spa</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {vouchers.map(v => {
            const isClaimed = claimedVouchers.includes(v.code);
            return (
              <div 
                key={v.id} 
                style={{ 
                  background: 'linear-gradient(135deg, #ffffff 0%, #fffbf5 100%)', 
                  borderRadius: '12px', 
                  padding: '2rem',
                  border: '2px dashed var(--color-primary)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span style={{ position: 'absolute', top: '15px', right: '15px', background: 'var(--color-primary)', color: 'white', fontSize: '0.75rem', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                    {v.badge}
                  </span>
                  <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.5rem' }}>Mã: <strong style={{ color: 'var(--color-secondary)' }}>{v.code}</strong></div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', margin: '0 0 0.5rem 0', color: 'var(--color-secondary)' }}>{v.title}</h3>
                  <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.8rem' }}>{v.discount}</div>
                  <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>{v.desc}</p>
                </div>

                <div>
                  <div style={{ fontSize: '0.8rem', color: '#999', marginBottom: '1rem' }}>{v.exp}</div>
                  <button 
                    onClick={() => handleClaimVoucher(v.code)}
                    disabled={isClaimed}
                    className="btn"
                    style={{ 
                      width: '100%',
                      background: isClaimed ? '#28a745' : 'var(--color-secondary)',
                      color: 'white',
                      fontWeight: 600,
                      cursor: isClaimed ? 'default' : 'pointer'
                    }}
                  >
                    {isClaimed ? '✓ Đã Lưu Voucher' : 'Lưu Voucher Ngay'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Section: Exclusive Combo Packages */}
      <section style={{ background: '#f5efe6', padding: '6rem 0', marginTop: '6rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--color-secondary)', margin: 0 }}>
              🌟 Gói Combo Đa Dịch Vụ Giá Bình Dân
            </h2>
            <div style={{ width: '60px', height: '2px', background: 'var(--color-primary)', margin: '1.5rem auto' }}></div>
            <p className="text-muted">Các gói trải nghiệm đa dịch vụ được thiết kế tối ưu tiết kiệm cho mọi khách hàng</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
            {packages.map(pkg => (
              <div 
                key={pkg.id} 
                style={{ 
                  background: 'white', 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ height: '240px', overflow: 'hidden' }}>
                    <AnimatedImage 
                      src={pkg.img} 
                      alt={pkg.name} 
                      style={{ width: '100%', height: '240px', borderRadius: '0' }}
                      caption={pkg.name}
                    />
                  </div>

                  <div style={{ padding: '2rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', margin: '0 0 0.3rem 0', color: 'var(--color-secondary)' }}>
                      {pkg.name}
                    </h3>
                    <div style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                      {pkg.subtitle}
                    </div>

                    <div style={{ background: '#fdfbf7', padding: '1.2rem', borderRadius: '8px', border: '1px solid #eee', marginBottom: '1.5rem' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#444', marginBottom: '0.8rem' }}>Dịch vụ bao gồm trong gói:</div>
                      <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#555', fontSize: '0.9rem', lineHeight: 1.8 }}>
                        {pkg.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '0 2rem 2rem 2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.2rem' }}>
                    <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                      {formatCurrency(pkg.price)}
                    </span>
                    <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '1rem' }}>
                      {formatCurrency(pkg.originalPrice)}
                    </span>
                  </div>

                  <button 
                    onClick={() => handleBookPackage(pkg.name)}
                    className="btn btn-primary"
                    style={{ width: '100%', fontWeight: 600, padding: '0.8rem' }}
                  >
                    Đặt Mua Gói Ngay <span>›</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Store;
