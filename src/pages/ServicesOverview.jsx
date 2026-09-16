import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import AnimatedImage from '../components/AnimatedImage';

const ServicesOverview = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const serviceKeys = Object.keys(servicesData);

  return (
    <div className="animate-fade-in" style={{ background: '#fdfbf7', paddingBottom: '6rem' }}>
      
      {/* Banner */}
      <section style={{ 
        background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '6rem 2rem'
      }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem', color: 'var(--color-primary)', display: 'block', marginBottom: '1rem', fontWeight: 600 }}>
          Dịch vụ làm đẹp & Thư giãn cao cấp
        </span>
        <h1 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-serif)', margin: '0 0 1rem 0' }}>
          Tất Cả Dịch Vụ Tại Visage Spa
        </h1>
        <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.6 }}>
          Khám phá không gian thư giãn đẳng cấp cùng các liệu trình chăm sóc tóc, móng, da mặt, trang điểm, massage và triệt lông chuyên nghiệp.
        </p>
      </section>

      {/* Services Grid */}
      <section className="container" style={{ marginTop: '4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
          {serviceKeys.map(key => {
            const service = servicesData[key];
            return (
              <div 
                key={key} 
                className="glass-card" 
                style={{ 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  background: 'white', 
                  border: '1px solid #eee',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div style={{ height: '220px', overflow: 'hidden' }}>
                  <AnimatedImage 
                    src={service.bannerImg} 
                    alt={service.title} 
                    style={{ width: '100%', height: '220px', borderRadius: '0' }}
                    caption={`Dịch vụ ${service.title}`}
                  />
                </div>
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', margin: '0 0 1rem 0', color: 'var(--color-secondary)' }}>
                      Dịch vụ {service.title}
                    </h2>
                    <p style={{ color: '#666', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                      {service.intro}
                    </p>
                    <div style={{ background: '#fcf8f2', padding: '0.8rem 1rem', borderRadius: '6px', marginBottom: '1.5rem', borderLeft: '3px solid var(--color-primary)' }}>
                      <span style={{ fontSize: '0.85rem', color: '#888', display: 'block' }}>Số lượng gói liệu trình:</span>
                      <strong style={{ color: 'var(--color-secondary)' }}>{service.packages.length} gói tùy chọn</strong>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate(`/services/${key}`)}
                    className="btn btn-primary"
                    style={{ 
                      width: '100%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '0.5rem',
                      padding: '0.8rem 1.5rem',
                      fontWeight: 600
                    }}
                  >
                    Xem chi tiết gói & Bảng giá <span>›</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default ServicesOverview;
