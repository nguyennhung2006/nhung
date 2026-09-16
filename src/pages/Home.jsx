import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AnimatedImage from '../components/AnimatedImage';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBookNow = () => {
    if (!user) {
      alert('Bạn cần Đăng nhập hoặc Đăng ký tài khoản để tiến hành Đặt lịch!');
      navigate('/login');
    } else {
      navigate('/booking');
    }
  };

  const handleNavigateService = (serviceId) => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <div className="animate-fade-in" style={{ background: '#fdfbf7' }}>
      
      {/* 1. Hero Section (Split Layout) */}
      <section style={{ display: 'flex', minHeight: '80vh', borderBottom: '1px solid #eaeaea', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '320px', padding: '8% 6%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '40px', height: '2px', background: 'var(--color-secondary)' }}></div>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-primary)' }}>Salon & Day Spa Visage</span>
          </div>
          <h1 style={{ fontSize: '4rem', lineHeight: 1.1, marginBottom: '2rem', letterSpacing: '-1px', fontFamily: 'var(--font-serif)', color: 'var(--color-secondary)' }}>
            Salon làm đẹp & <br/> Spa chăm sóc cao cấp
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#555', marginBottom: '2.5rem', maxWidth: '450px', lineHeight: 1.7 }}>
            Hãy thư giãn cơ thể, nạp lại năng lượng cho tinh thần và làm mới bản thân với quy trình trị liệu chuẩn y khoa tại Visage Spa.
          </p>
          <div>
            <button 
              onClick={handleBookNow} 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-secondary)' }}
            >
              <span style={{ width: '45px', height: '45px', borderRadius: '50%', border: '2px solid var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', fontSize: '1.2rem', transition: 'all 0.3s ease' }}>›</span>
              Đặt lịch trực tuyến ngay
            </button>
          </div>
        </div>

        <div style={{ flex: 1, minWidth: '320px', position: 'relative', overflow: 'hidden' }}>
          <AnimatedImage 
            src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Visage Spa Interior"
            style={{ width: '100%', height: '100%', minHeight: '450px', borderRadius: '0' }}
            caption="Không gian làm đẹp thư thái đẳng cấp tại Visage Salon & Spa"
          />
        </div>
      </section>

      {/* 2. Announcement Banner */}
      <section style={{ padding: '5rem 2rem', background: '#fdfbf7' }}>
        <div className="container" style={{ maxWidth: '1050px' }}>
          <div style={{ background: 'linear-gradient(rgba(60,30,30,0.85), rgba(40,20,20,0.9)), url("https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', padding: '4rem', borderRadius: '16px', color: 'white', display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap', boxShadow: '0 12px 30px rgba(0,0,0,0.15)' }}>
            <h2 style={{ flex: 1, fontSize: '2.5rem', fontWeight: 400, color: 'white', fontFamily: 'var(--font-serif)', margin: 0 }}>Cửa hàng mới của chúng tôi đã chính thức mở cửa!</h2>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ width: '50px', height: '2px', background: 'var(--color-primary)', marginBottom: '1.5rem' }}></div>
              <p style={{ opacity: 0.9, lineHeight: 1.8, fontSize: '1rem', marginBottom: '1.5rem' }}>
                Visage vui mừng chào đón bạn đến trải nghiệm cơ sở làm đẹp sang trọng hàng đầu. Để đảm bảo chất lượng phục vụ tốt nhất, quý khách vui lòng đặt lịch trước trực tuyến.
              </p>
              <button onClick={() => navigate('/store')} className="btn btn-primary" style={{ padding: '0.6rem 1.4rem' }}>
                Khám Phá Cửa Hàng & Voucher <span>›</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. About Section (Image Left, Text Right) */}
      <section style={{ padding: '5rem 2rem', background: '#fdfbf7', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '30%', height: '100%', background: '#f5efe6', zIndex: 0 }}></div>
        <div className="container flex items-center" style={{ gap: '4rem', position: 'relative', zIndex: 1, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <AnimatedImage 
              src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Spa Reception" 
              style={{ width: '100%', borderRadius: '12px', border: '4px solid white', boxShadow: 'var(--shadow-lg)' }} 
              caption="Khu vực đón tiếp khách hàng sang trọng tại Visage Spa"
            />
          </div>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-primary)' }}>Giới thiệu về Visage</span>
              <div style={{ width: '40px', height: '2px', background: 'var(--color-secondary)' }}></div>
            </div>
            <h2 style={{ fontSize: '3rem', textAlign: 'right', marginBottom: '2rem', lineHeight: 1.1, fontFamily: 'var(--font-serif)', color: 'var(--color-secondary)' }}>Salon & Spa <br/> Trọn Gói Đẳng Cấp</h2>
            <p style={{ color: '#555', marginBottom: '2rem', textAlign: 'justify', lineHeight: 1.8 }}>
              Chào mừng đến với Visage Salon & Day Spa, một chốn nghỉ dưỡng sang trọng giúp bạn tạm quên đi những căng thẳng thường nhật. Các liệu trình chăm sóc cơ thể thư giãn cùng đội ngũ 6 chuyên gia tận tâm (Hồng Nhung, Lường Giang, Thu Uyên, Văn Nam, Thùy Linh, Minh Châu) sẽ giúp bạn cảm thấy tuyệt vời và rạng rỡ nhất.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => navigate('/about')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 600, color: 'var(--color-secondary)' }}
              >
                <span style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>›</span>
                Tìm hiểu thêm về Đội ngũ & Chính sách
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Gift Shopping (Text Left, Image Right) */}
      <section style={{ padding: '5rem 2rem', background: '#fdfbf7', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '40%', height: '100%', background: '#f9f5f0', zIndex: 0 }}></div>
        <div className="container flex items-center" style={{ gap: '4rem', position: 'relative', zIndex: 1, flexWrap: 'wrap-reverse' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '40px', height: '2px', background: 'var(--color-secondary)' }}></div>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-primary)' }}>Tặng Quà Ưu Đãi</span>
            </div>
            <h2 style={{ fontSize: '3rem', marginBottom: '2rem', lineHeight: 1.1, fontFamily: 'var(--font-serif)', color: 'var(--color-secondary)' }}>Mua Sắm Quà Tặng & <br/> Voucher Spa VIP</h2>
            <p style={{ color: '#555', marginBottom: '2.5rem', lineHeight: 1.8, maxWidth: '420px' }}>
              Dù là món quà dành tặng người thân yêu hay tự thưởng cho bản thân một kỳ nghỉ ngắn sang trọng, vô vàn Voucher khuyến mãi hấp dẫn tại Cửa hàng Visage đang chờ đón bạn.
            </p>
            <button 
              onClick={() => navigate('/store')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 600, color: 'var(--color-secondary)' }}
            >
              <span style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>›</span>
              Đến Cửa Hàng Voucher & Combo
            </button>
          </div>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <AnimatedImage 
              src="https://images.unsplash.com/photo-1549298240-0d8e60513026?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Spa Gifts" 
              style={{ width: '100%', borderRadius: '12px', border: '1px solid white', boxShadow: 'var(--shadow-md)' }} 
              caption="Quà tặng & Sản phẩm chăm sóc cơ thể độc quyền"
            />
          </div>
        </div>
      </section>

      {/* 5. Booking Banner (Maroon) */}
      <section style={{ padding: '5rem 0', background: 'var(--color-secondary)', color: 'white' }}>
        <div className="container flex justify-between items-center" style={{ flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ maxWidth: '600px' }}>
            <h2 style={{ fontSize: '3rem', color: 'white', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>Đặt Lịch Hẹn Ngay Hôm Nay</h2>
            <div style={{ width: '50px', height: '2px', background: 'var(--color-primary)', marginBottom: '1.5rem' }}></div>
            <p style={{ fontSize: '1.15rem', opacity: 0.9, lineHeight: 1.6 }}>Hãy thư giãn cơ thể, nạp lại năng lượng cho tinh thần và sở hữu vẻ ngoài tươi trẻ nhất.</p>
          </div>
          <div>
            <button 
              onClick={handleBookNow} 
              style={{ width: '150px', height: '150px', borderRadius: '50%', background: 'white', color: 'var(--color-secondary)', fontSize: '1.2rem', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '1.5rem', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', transition: 'transform 0.3s ease' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Đặt Trực<br/>Tuyến ›
            </button>
          </div>
        </div>
      </section>

      {/* 6. What We Do (Services List with Interactive Arrow Links) */}
      <section style={{ padding: '6rem 0', background: '#fdfbf7', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '20%', height: '100%', background: '#f9f5f0', zIndex: 0 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          
          <div className="flex justify-between items-end" style={{ marginBottom: '5rem', flexWrap: 'wrap', gap: '2rem' }}>
            <h2 style={{ fontSize: '3rem', margin: 0, display: 'flex', alignItems: 'center', gap: '1rem', fontFamily: 'var(--font-serif)', color: 'var(--color-secondary)' }}>
              Danh Mục Dịch Vụ <span style={{ display: 'inline-block', width: '60px', height: '2px', background: 'var(--color-primary)' }}></span>
            </h2>
            <p style={{ maxWidth: '420px', margin: 0, fontSize: '1rem', color: '#555', lineHeight: 1.6 }}>
              Visage là điểm đến lý tưởng đáp ứng trọn vẹn nhu cầu làm đẹp của bạn. Ấn vào từng dịch vụ bên dưới để xem bảng giá và ưu đãi chi tiết!
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
            
            {/* Service 1: Hair */}
            <div className="flex items-center" style={{ gap: '4rem', flexWrap: 'wrap-reverse' }}>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <h3 
                  onClick={() => handleNavigateService('toc')}
                  style={{ fontSize: '2.2rem', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', cursor: 'pointer', color: 'var(--color-secondary)' }}
                >
                  Tóc 
                  <button 
                    onClick={() => handleNavigateService('toc')}
                    style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid var(--color-primary)', background: 'white', color: 'var(--color-primary)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 700 }}
                  >
                    ›
                  </button>
                </h3>
                <p style={{ color: '#555', marginBottom: '1.5rem', lineHeight: 1.7 }}>Dù bạn chỉ cần tỉa tóc tạo kiểu hay phục hồi chuyên sâu cho diện mạo rạng rỡ, bạn đều có thể tin tưởng vào tay nghề của Visage Spa.</p>
                <ul style={{ paddingLeft: '1.2rem', color: '#333', fontSize: '0.95rem', lineHeight: 2, marginBottom: '1.5rem' }}>
                  <li>Cắt tóc Nam/Nữ tạo kiểu Hàn Quốc</li>
                  <li>Nhuộm màu thời trang & Phục hồi Olaplex</li>
                  <li>Uốn xoăn lơi, Nối tóc & Phủ huyết thanh</li>
                </ul>
                <button onClick={() => handleNavigateService('toc')} className="btn btn-outline" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>
                  Xem tất cả gói dịch vụ Tóc ›
                </button>
              </div>
              <div style={{ flex: 1.5, minWidth: '300px' }}>
                <AnimatedImage 
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Dịch vụ Tóc" 
                  style={{ width: '100%', height: '320px', borderRadius: '12px', border: '1px solid #eee' }} 
                  caption="Dịch vụ Cắt & Tạo kiểu Tóc chuyên nghiệp"
                />
              </div>
            </div>

            {/* Service 2: Nails */}
            <div className="flex items-center" style={{ gap: '4rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1.5, minWidth: '300px' }}>
                <AnimatedImage 
                  src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Dịch vụ Móng tay" 
                  style={{ width: '100%', height: '320px', borderRadius: '12px', border: '1px solid #eee' }} 
                  caption="Làm Móng Tay nghệ thuật & Sơn Gel cao cấp"
                />
              </div>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <h3 
                  onClick={() => handleNavigateService('mong-tay')}
                  style={{ fontSize: '2.2rem', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', cursor: 'pointer', color: 'var(--color-secondary)' }}
                >
                  Móng Tay 
                  <button 
                    onClick={() => handleNavigateService('mong-tay')}
                    style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid var(--color-primary)', background: 'white', color: 'var(--color-primary)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 700 }}
                  >
                    ›
                  </button>
                </h3>
                <p style={{ color: '#555', marginBottom: '1.5rem', lineHeight: 1.7 }}>Không gì tạo điểm nhấn sang trọng cho bàn tay hơn bộ móng được chăm sóc kỹ lưỡng. Chuyên gia Nail Lường Thị Giang luôn sẵn sàng!</p>
                <ul style={{ paddingLeft: '1.2rem', color: '#333', fontSize: '0.95rem', lineHeight: 2, marginBottom: '1.5rem' }}>
                  <li>Nhặt da, sơn Gel & Đắp bột / Đắp gel</li>
                  <li>Vẽ móng nghệ thuật thủ công & Đính đá</li>
                  <li>Chăm sóc & Đắp mặt nạ dưỡng da tay</li>
                </ul>
                <button onClick={() => handleNavigateService('mong-tay')} className="btn btn-outline" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>
                  Xem tất cả gói Móng Tay ›
                </button>
              </div>
            </div>

            {/* Service 3: Makeup */}
            <div className="flex items-center" style={{ gap: '4rem', flexWrap: 'wrap-reverse' }}>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <h3 
                  onClick={() => handleNavigateService('trang-diem')}
                  style={{ fontSize: '2.2rem', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', cursor: 'pointer', color: 'var(--color-secondary)' }}
                >
                  Trang Điểm 
                  <button 
                    onClick={() => handleNavigateService('trang-diem')}
                    style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid var(--color-primary)', background: 'white', color: 'var(--color-primary)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 700 }}
                  >
                    ›
                  </button>
                </h3>
                <p style={{ color: '#555', marginBottom: '1.5rem', lineHeight: 1.7 }}>Biến hóa lộng lẫy và tỏa sáng trong mọi góc nhìn. Chuyên gia Bế Thị Thu Uyên giúp bạn hoàn thiện vẻ đẹp thu hút nhất.</p>
                <ul style={{ paddingLeft: '1.2rem', color: '#333', fontSize: '0.95rem', lineHeight: 2, marginBottom: '1.5rem' }}>
                  <li>Makeup dự tiệc cá nhân & Làm tóc</li>
                  <li>Makeup Cô dâu ngày cưới cao cấp</li>
                  <li>Makeup kỷ yếu & sự kiện đặc biệt</li>
                </ul>
                <button onClick={() => handleNavigateService('trang-diem')} className="btn btn-outline" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>
                  Xem tất cả gói Trang Điểm ›
                </button>
              </div>
              <div style={{ flex: 1.5, minWidth: '300px' }}>
                <AnimatedImage 
                  src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Dịch vụ Trang điểm" 
                  style={{ width: '100%', height: '320px', borderRadius: '12px', border: '1px solid #eee' }} 
                  caption="Trang điểm cô dâu & dự tiệc sang trọng"
                />
              </div>
            </div>

            {/* Service 4: Face */}
            <div className="flex items-center" style={{ gap: '4rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1.5, minWidth: '300px' }}>
                <AnimatedImage 
                  src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Dịch vụ Da & Mặt" 
                  style={{ width: '100%', height: '320px', borderRadius: '12px', border: '1px solid #eee' }} 
                  caption="Chăm sóc da mặt & Nâng cơ Hifu trẻ hóa"
                />
              </div>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <h3 
                  onClick={() => handleNavigateService('da-va-mat')}
                  style={{ fontSize: '2.2rem', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', cursor: 'pointer', color: 'var(--color-secondary)' }}
                >
                  Da & Mặt 
                  <button 
                    onClick={() => handleNavigateService('da-va-mat')}
                    style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid var(--color-primary)', background: 'white', color: 'var(--color-primary)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 700 }}
                  >
                    ›
                  </button>
                </h3>
                <p style={{ color: '#555', marginBottom: '1.5rem', lineHeight: 1.7 }}>Điều trị tận gốc mụn, thâm nám và chống lão hóa bằng công nghệ hiện đại chuẩn y khoa.</p>
                <ul style={{ paddingLeft: '1.2rem', color: '#333', fontSize: '0.95rem', lineHeight: 2, marginBottom: '1.5rem' }}>
                  <li>Lấy nhân mụn y khoa & Chiếu ánh sáng sinh học</li>
                  <li>Peel da sinh học mờ thâm nám</li>
                  <li>Nâng cơ trẻ hóa Hifu siêu vi điểm</li>
                </ul>
                <button onClick={() => handleNavigateService('da-va-mat')} className="btn btn-outline" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>
                  Xem tất cả gói Da & Mặt ›
                </button>
              </div>
            </div>

            {/* Service 5: Massage */}
            <div className="flex items-center" style={{ gap: '4rem', flexWrap: 'wrap-reverse' }}>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <h3 
                  onClick={() => handleNavigateService('massage')}
                  style={{ fontSize: '2.2rem', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', cursor: 'pointer', color: 'var(--color-secondary)' }}
                >
                  Massage & Cơ Thể 
                  <button 
                    onClick={() => handleNavigateService('massage')}
                    style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid var(--color-primary)', background: 'white', color: 'var(--color-primary)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 700 }}
                  >
                    ›
                  </button>
                </h3>
                <p style={{ color: '#555', marginBottom: '1.5rem', lineHeight: 1.7 }}>Đánh bay mệt mỏi, giải tỏa căng thẳng cơ bắp và phục hồi năng lượng tinh thần sảng khoái.</p>
                <ul style={{ paddingLeft: '1.2rem', color: '#333', fontSize: '0.95rem', lineHeight: 2, marginBottom: '1.5rem' }}>
                  <li>Massage Body đá nóng núi lửa 90 phút</li>
                  <li>Massage Thái kéo giãn cơ bấm huyệt</li>
                  <li>Massage trị liệu đau vai gáy văn phòng</li>
                </ul>
                <button onClick={() => handleNavigateService('massage')} className="btn btn-outline" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>
                  Xem tất cả gói Massage ›
                </button>
              </div>
              <div style={{ flex: 1.5, minWidth: '300px' }}>
                <AnimatedImage 
                  src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Dịch vụ Massage" 
                  style={{ width: '100%', height: '320px', borderRadius: '12px', border: '1px solid #eee' }} 
                  caption="Massage đá nóng trị liệu & Thư giãn chuyên sâu"
                />
              </div>
            </div>

            {/* Service 6: Hair Removal / Waxing */}
            <div className="flex items-center" style={{ gap: '4rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1.5, minWidth: '300px' }}>
                <AnimatedImage 
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Dịch vụ Tẩy lông" 
                  style={{ width: '100%', height: '320px', borderRadius: '12px', border: '1px solid #eee' }} 
                  caption="Triệt lông công nghệ laser mát lạnh không đau rát"
                />
              </div>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <h3 
                  onClick={() => handleNavigateService('tay-long')}
                  style={{ fontSize: '2.2rem', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', cursor: 'pointer', color: 'var(--color-secondary)' }}
                >
                  Tẩy Lông 
                  <button 
                    onClick={() => handleNavigateService('tay-long')}
                    style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid var(--color-primary)', background: 'white', color: 'var(--color-primary)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 700 }}
                  >
                    ›
                  </button>
                </h3>
                <p style={{ color: '#555', marginBottom: '1.5rem', lineHeight: 1.7 }}>Công nghệ triệt lông mát lạnh không đau rát, an toàn tuyệt đối và mang lại làn da mịn màng tự tin.</p>
                <ul style={{ paddingLeft: '1.2rem', color: '#333', fontSize: '0.95rem', lineHeight: 2, marginBottom: '1.5rem' }}>
                  <li>Tẩy lông Nách, Mặt & Ria mép</li>
                  <li>Tẩy lông Tay, Chân & Vùng Bikini</li>
                  <li>Gói triệt lông VIP Toàn thân</li>
                </ul>
                <button onClick={() => handleNavigateService('tay-long')} className="btn btn-outline" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>
                  Xem tất cả gói Tẩy Lông ›
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
