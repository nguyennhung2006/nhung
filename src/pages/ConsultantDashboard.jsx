import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const ConsultantDashboard = () => {
  const { user, needsHumanAssistance, resolveHandoff } = useAuth();
  const { 
    liveChatMessages, 
    isHandoffActive, 
    handoffCustomerName, 
    sendStaffLiveMsg, 
    endHandoff,
    services,
    formatCurrency
  } = useData();

  const [inputMsg, setInputMsg] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [liveChatMessages]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputMsg.trim()) return;
    const staffName = user ? `${user.name} (Chuyên Viên Tư Vấn)` : 'Trần Khánh Linh (Chuyên Viên Tư Vấn)';
    sendStaffLiveMsg(inputMsg.trim(), staffName);
    setInputMsg('');
  };

  const handleQuickPreset = (presetText) => {
    const staffName = user ? `${user.name} (Chuyên Viên Tư Vấn)` : 'Trần Khánh Linh (Chuyên Viên Tư Vấn)';
    sendStaffLiveMsg(presetText, staffName);
  };

  const handleCompleteConsultation = () => {
    resolveHandoff();
    endHandoff();
    alert('✅ Đã hoàn thành phiên tư vấn trực tiếp với khách hàng!');
  };

  return (
    <div className="animate-fade-in" style={{ background: '#fdfbf7', minHeight: '90vh', padding: '2rem 0' }}>
      <div className="container">
        
        {/* Banner Header */}
        <div style={{ 
          background: 'linear-gradient(135deg, #7c3a3a 0%, #4a1c1c 100%)', 
          color: 'white', 
          padding: '2rem 2.5rem', 
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(124, 58, 58, 0.2)',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.4rem' }}>
              <span style={{ background: '#E65100', color: 'white', fontSize: '0.75rem', padding: '3px 10px', borderRadius: '12px', fontWeight: 700, letterSpacing: '1px' }}>
                LIVE CONSULTANT PORTAL
              </span>
              <span style={{ fontSize: '0.85rem', opacity: 0.9 }}>
                Trực ca: <strong>{user ? user.name : 'Trần Khánh Linh'}</strong>
              </span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', margin: 0, color: 'white' }}>
              🎧 Trung Tâm Tư Vấn Trực Tiếp Khách Hàng
            </h1>
            <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9, fontSize: '0.95rem' }}>
              Nhận kết nối yêu cầu từ Chatbot AI và chat trực tiếp 1-1 hỗ trợ khách hàng đặt lịch & tư vấn da liễu.
            </p>
          </div>

          <div>
            {(needsHumanAssistance || isHandoffActive) ? (
              <div style={{ background: '#FF3D00', color: 'white', padding: '0.6rem 1.4rem', borderRadius: '30px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2rem' }}>🔔</span> Đang có Khách hàng chờ kết nối!
              </div>
            ) : (
              <div style={{ background: 'rgba(255,255,255,0.15)', color: 'white', padding: '0.6rem 1.4rem', borderRadius: '30px', fontWeight: 600, fontSize: '0.9rem' }}>
                🟢 Trạng thái: Đang sẵn sàng tư vấn
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          {/* Main Chat Box Area (Left/Middle Column) */}
          <div style={{ gridColumn: 'span 2', minWidth: '320px' }}>
            <div style={{ 
              background: 'white', 
              borderRadius: '16px', 
              border: '1px solid #efe6da', 
              boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              height: '650px',
              overflow: 'hidden'
            }}>
              
              {/* Chat Header */}
              <div style={{ 
                padding: '1.2rem 1.8rem', 
                background: (needsHumanAssistance || isHandoffActive) ? '#FFF3E0' : '#FAF6F0', 
                borderBottom: '1px solid #eee',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-secondary)' }}>
                    💬 Phiên Chat Trực Tiếp: <span style={{ color: 'var(--color-primary)' }}>{handoffCustomerName}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#666', marginTop: '2px' }}>
                    {(needsHumanAssistance || isHandoffActive) ? '🟢 Khách hàng đang tương tác trực tiếp' : '⚪ Chưa có phiên tư vấn chờ'}
                  </div>
                </div>

                {(needsHumanAssistance || isHandoffActive) && (
                  <button 
                    onClick={handleCompleteConsultation}
                    className="btn"
                    style={{ background: '#2e6b56', color: 'white', padding: '0.5rem 1.2rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}
                  >
                    ✓ Hoàn thành phiên tư vấn
                  </button>
                )}
              </div>

              {/* Chat Messages Log */}
              <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', background: '#FDFBF7' }}>
                {liveChatMessages.length === 0 ? (
                  <div style={{ textAlign: 'center', color: '#888', marginTop: '8rem', fontSize: '1rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎧</div>
                    Chưa có tin nhắn trong phiên tư vấn.<br/>
                    Khi khách hàng ấn "Kết nối Chuyên viên" trên Chatbot AI, tin nhắn sẽ xuất hiện ở đây!
                  </div>
                ) : (
                  liveChatMessages.map(msg => {
                    const isStaff = msg.sender === 'staff';
                    return (
                      <div 
                        key={msg.id} 
                        style={{ 
                          display: 'flex', 
                          justifyContent: isStaff ? 'flex-end' : 'flex-start',
                          marginBottom: '1rem' 
                        }}
                      >
                        <div style={{ 
                          maxWidth: '75%', 
                          background: isStaff ? 'var(--color-secondary)' : '#EFEBE9',
                          color: isStaff ? 'white' : '#333',
                          padding: '0.9rem 1.2rem',
                          borderRadius: isStaff ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                        }}>
                          <div style={{ fontSize: '0.78rem', opacity: 0.8, marginBottom: '4px', fontWeight: 600 }}>
                            {msg.senderName || (isStaff ? 'Chuyên viên' : 'Khách hàng')} • {msg.time}
                          </div>
                          <div style={{ fontSize: '0.95rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                            {msg.text}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Quick Answer Presets */}
              <div style={{ padding: '0.8rem 1.2rem', background: '#F5EFE6', borderTop: '1px solid #EAE3D9' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-secondary)', marginBottom: '6px' }}>
                  ⚡ Mẫu trả lời nhanh dành cho Chuyên viên:
                </div>
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                  <button 
                    onClick={() => handleQuickPreset('Dạ em chào anh/chị ạ! Em là Khánh Linh - Chuyên viên tư vấn của Visage Spa. Em có thể hỗ trợ thông tin gì cho mình ạ? 🌸')}
                    style={{ background: 'white', border: '1px solid #DDD', borderRadius: '15px', padding: '4px 12px', fontSize: '0.8rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
                  >
                    👋 Lời chào chuyên viên
                  </button>
                  <button 
                    onClick={() => handleQuickPreset('Đối với tình trạng da dầu mụn, anh/chị hoàn toàn có thể trang điểm mỏng nhẹ ạ. Tuy nhiên nên kết hợp gói Lấy nhân mụn y khoa 7 bước (60.000 VNĐ) để da sạch sâu thông thoáng trước ạ!')}
                    style={{ background: 'white', border: '1px solid #DDD', borderRadius: '15px', padding: '4px 12px', fontSize: '0.8rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
                  >
                    💄 Tư vấn Da Dầu Mụn
                  </button>
                  <button 
                    onClick={() => handleQuickPreset('Dạ bên em đang có ưu đãi giảm 20.000đ cho khách hàng mới và dịch vụ Triệt lông mát lạnh -5°C chỉ từ 30k. Em xin phép hỗ trợ đặt lịch giữ chỗ cho mình nhé! 📅')}
                    style={{ background: 'white', border: '1px solid #DDD', borderRadius: '15px', padding: '4px 12px', fontSize: '0.8rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
                  >
                    🎁 Giữ chỗ & Khuyến mãi
                  </button>
                </div>
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSend} style={{ padding: '1rem 1.2rem', background: 'white', borderTop: '1px solid #eee', display: 'flex', gap: '0.8rem' }}>
                <input 
                  type="text" 
                  className="form-input"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Nhập nội dung trả lời tư vấn cho khách hàng..."
                  style={{ borderRadius: '25px', padding: '0.8rem 1.2rem', fontSize: '0.95rem' }}
                />
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ borderRadius: '25px', padding: '0.8rem 1.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  Gửi <span>➔</span>
                </button>
              </form>

            </div>
          </div>

          {/* Quick Info & Services Sidebar (Right Column) */}
          <div style={{ minWidth: '280px' }}>
            
            {/* Consultant Profile Badge */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', border: '1px solid #efe6da', marginBottom: '1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '55px', height: '55px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3a3a 0%, #c25975 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 700 }}>
                  KL
                </div>
                <div>
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--color-secondary)', fontSize: '1.2rem' }}>Trần Khánh Linh</h3>
                  <div style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.85rem' }}>Chuyên Viên Tư Vấn Spa Premium</div>
                </div>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.6, background: '#fcf8f2', padding: '0.8rem', borderRadius: '8px' }}>
                ✔️ Đã tư vấn thành công: <strong>148+ khách hàng</strong><br/>
                ⭐ Đánh giá hài lòng: <strong>4.9/5.0</strong>
              </div>
            </div>

            {/* Quick Price List Reference */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', border: '1px solid #efe6da', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
              <h4 style={{ margin: '0 0 1rem 0', fontFamily: 'var(--font-serif)', color: 'var(--color-secondary)', fontSize: '1.1rem' }}>
                📋 Tra Cứu Nhanh Bảng Giá Spa
              </h4>
              <div style={{ maxHeight: '350px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {services.map(s => (
                  <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 8px', borderBottom: '1px solid #f5f5f5', fontSize: '0.82rem' }}>
                    <div style={{ fontWeight: 600, color: '#333', maxWidth: '180px' }}>{s.name}</div>
                    <div style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{formatCurrency(s.price)}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ConsultantDashboard;
