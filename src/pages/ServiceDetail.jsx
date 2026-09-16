import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import AnimatedImage from '../components/AnimatedImage';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formatCurrency } = useData();
  const { user } = useAuth();
  
  const service = servicesData[id];

  useEffect(() => {
    // Cuộn lên đầu trang mỗi khi vào một trang dịch vụ mới
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--color-secondary)' }}>Không tìm thấy dịch vụ</h2>
        <p style={{ color: '#666', marginTop: '1rem', marginBottom: '2rem' }}>Xin lỗi, dịch vụ bạn tìm kiếm không tồn tại hoặc đã bị thay đổi.</p>
        <Link to="/services" className="btn btn-primary" style={{ padding: '0.8rem 2rem' }}>Xem tất cả Dịch vụ</Link>
      </div>
    );
  }

  const handleBookNow = (pkgName) => {
    if (!user) {
      alert('Bạn cần Đăng nhập hoặc Đăng ký tài khoản để tiến hành Đặt lịch!');
      navigate('/login');
    } else {
      navigate('/booking');
    }
  };

  return (
    <div className="animate-fade-in" style={{ background: '#fdfbf7', paddingBottom: '6rem' }}>
      
      {/* 1. Header Banner */}
      <section style={{ 
        position: 'relative', 
        height: '50vh', 
        minHeight: '400px',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url("${service.bannerImg}")`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center'
      }}>
        <div>
          <span style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary)', display: 'block', marginBottom: '1rem' }}>
            Dịch vụ Chuyên nghiệp của Visage
          </span>
          <h1 style={{ fontSize: '4rem', margin: 0, fontFamily: 'var(--font-serif)' }}>{service.title}</h1>
        </div>
      </section>

      {/* 2. Giới thiệu (Intro) */}
      <section className="container" style={{ maxWidth: '850px', marginTop: '-4rem', position: 'relative', zIndex: 10 }}>
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', background: 'white', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ width: '50px', height: '2px', background: 'var(--color-primary)', margin: '0 auto 1.5rem auto' }}></div>
          <p style={{ fontSize: '1.2rem', color: '#555', lineHeight: 1.8, margin: 0, fontStyle: 'italic' }}>
            "{service.intro}"
          </p>
        </div>
      </section>

      {/* Interactive Image Showcase */}
      <section className="container" style={{ marginTop: '4rem', textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--color-secondary)', marginBottom: '1.5rem' }}>Hình ảnh Không gian & Thực tế Dịch vụ</h3>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <AnimatedImage 
            src={service.bannerImg} 
            alt={`Hình ảnh dịch vụ ${service.title}`}
            style={{ width: '100%', height: '380px', borderRadius: '12px' }}
            caption={`Trải nghiệm dịch vụ ${service.title} đẳng cấp tại Visage Spa`}
          />
        </div>
      </section>

      {/* 3. Đánh giá của khách hàng (Reviews) */}
      <section className="container" style={{ marginTop: '5rem', marginBottom: '5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-secondary)' }}>Khách hàng nói gì về Dịch vụ {service.title}?</h2>
          <p className="text-muted">Những đánh giá chân thực từ khách hàng đã trải nghiệm dịch vụ tại Visage</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {service.reviews && service.reviews.map((review, index) => (
            <div key={index} style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', border: '1px solid #eee' }}>
              <div style={{ color: '#FFD700', fontSize: '1.2rem', marginBottom: '1rem' }}>
                {'★'.repeat(review.rating || 5)}
              </div>
              <p style={{ color: '#555', lineHeight: 1.6, marginBottom: '1.5rem' }}>"{review.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-secondary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {review.name ? review.name.charAt(0) : 'K'}
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: '#333' }}>{review.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#888' }}>Khách hàng đã dùng dịch vụ</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Các Gói Dịch Vụ (Packages) */}
      <section style={{ background: '#f5efe6', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', margin: 0, color: 'var(--color-secondary)' }}>Bảng Giá Các Gói Dịch Vụ {service.title}</h2>
            <div style={{ width: '50px', height: '2px', background: 'var(--color-primary)', margin: '1.5rem auto' }}></div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
            {service.packages && service.packages.map(pkg => (
              <div key={pkg.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '1.5rem 1.8rem', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', flexWrap: 'wrap', gap: '1.5rem', border: '1px solid #efe6da' }}>
                <div style={{ width: '100px', height: '80px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                  <AnimatedImage 
                    src={pkg.img || service.bannerImg} 
                    alt={pkg.name} 
                    style={{ width: '100px', height: '80px', borderRadius: '8px', objectFit: 'cover' }}
                    caption={pkg.name}
                  />
                </div>
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.4rem 0', color: 'var(--color-secondary)', fontFamily: 'var(--font-serif)' }}>{pkg.name}</h3>
                  <p style={{ margin: 0, color: '#666', fontSize: '0.92rem', lineHeight: 1.5 }}>{pkg.desc}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ fontSize: '1.35rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                    {formatCurrency(pkg.price)}
                  </div>
                  <button onClick={() => handleBookNow(pkg.name)} className="btn btn-primary" style={{ padding: '0.6rem 1.4rem' }}>
                    Đặt lịch ngay
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

export default ServiceDetail;
