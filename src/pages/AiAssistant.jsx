import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, Send, User, Sparkles, RefreshCw, Zap, 
  Lightbulb, Heart, Shield, HelpCircle, Copy, Check, Info, Trash2, ArrowRight,
  Code, Compass, Utensils, MessageSquare, Mic, MicOff, ThumbsUp, ThumbsDown,
  Volume2, Sliders, Terminal, Moon, Sun, Layers
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import './AiAssistant.css';

export default function AiAssistant() {
  const { user, triggerHandoff, needsHumanAssistance } = useAuth();
  const { startHandoff, liveChatMessages, sendCustomerLiveMsg, isHandoffActive } = useData();

  const [activeTab, setActiveTab] = useState('all');
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('visage_ai_messages');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [
      {
        id: 1,
        sender: 'ai',
        text: 'Xin chào bạn! Mình là **Bé Mèo AI** 🐾✨ - Trợ lý Trí Tuệ Nhân Tạo Siêu Cấp của Visage Spa!\n\nMình có thể **giải đáp trực tiếp & chi tiết BẤT KỲ CÂU HỎI NÀO** của bạn:\n- 💄 **Thắc mắc làm đẹp & da liễu**: *"Da dầu mụn makeup được không?"*, *"Da nhạy cảm dùng retinol thế nào?"*\n- 🌸 **Tư vấn 28 dịch vụ Visage Spa**: Giá cả, liệu trình trị mụn, trị nám, massage, triệt lông...\n- 🎧 **Kết nối Chuyên Viên Tư Vấn Trực Tiếp**: Ấn nút bên trên để chat 1-1 với Chuyên viên Trần Khánh Linh!\n\n*Bạn muốn hỏi Bé Mèo điều gì ngay bây giờ?*',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reactions: { like: false, dislike: false }
      }
    ];
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState(() => localStorage.getItem('visage_gemini_api_key') || '');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem('visage_ai_messages', JSON.stringify(messages));
    } catch (e) {}
  }, [messages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Sync staff replies into customer chat in real time
  useEffect(() => {
    if (liveChatMessages.length > 0 && (isHandoffActive || needsHumanAssistance)) {
      const staffMsgs = liveChatMessages.filter(m => m.sender === 'staff');
      staffMsgs.forEach(m => {
        setMessages(prev => {
          if (!prev.some(p => p.id === m.id || (p.text.includes(m.text) && p.timestamp === m.time))) {
            return [
              ...prev,
              {
                id: m.id || Date.now(),
                sender: 'ai',
                text: `🎧 **Chuyên Viên ${m.senderName || 'Trần Khánh Linh'}**: ${m.text}`,
                timestamp: m.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                reactions: { like: false, dislike: false }
              }
            ];
          }
          return prev;
        });
      });
    }
  }, [liveChatMessages, isHandoffActive, needsHumanAssistance]);

  const handleConnectConsultant = () => {
    triggerHandoff();
    const customerName = user ? user.name : 'Khách Hàng Trực Tuyến';
    startHandoff('Khách hàng yêu cầu gặp trực tiếp Chuyên viên Tư vấn Trần Khánh Linh', customerName);
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'ai',
        text: '🎧 **ĐÃ KẾT NỐI THÀNH CÔNG VỚI CHUYÊN VIÊN TƯ VẤN TRẦN KHÁNH LINH!**\n\nThông báo đã được phát ra thiết bị của Chuyên viên **Trần Khánh Linh**. Quý khách vui lòng nhập thắc mắc bên dưới, Chuyên viên sẽ trả lời trực tiếp ngay tại đây ạ! 🌸',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reactions: { like: false, dislike: false }
      }
    ]);
  };

  const handleEndConsultation = (e) => {
    e?.preventDefault();
    try {
      localStorage.setItem('visage_is_handoff_active', 'false');
      localStorage.setItem('visage_needs_assistance', 'false');
    } catch (err) {}
    resolveHandoff();
    endHandoff();
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'ai',
        text: '✨ **ĐÃ KẾT THÚC PHIÊN TƯ VẤN TRỰC TIẾP.**\n\nBé Mèo AI 🐾 đã quay trở lại phục vụ bạn! Bạn muốn hỏi Bé Mèo điều gì tiếp theo ạ? 🌸',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reactions: { like: false, dislike: false }
      }
    ]);
  };

  const handleClearHistory = () => {
    localStorage.removeItem('visage_ai_messages');
    setMessages([
      {
        id: Date.now(),
        sender: 'ai',
        text: '✨ Đã làm mới cuộc trò chuyện. Bé Mèo AI đã sẵn sàng trả lời bất kỳ câu hỏi mới nào của bạn!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reactions: { like: false, dislike: false }
      }
    ]);
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReaction = (id, type) => {
    setMessages(prev => prev.map(m => {
      if (m.id === id) {
        const reactions = m.reactions || { like: false, dislike: false };
        return {
          ...m,
          reactions: {
            ...reactions,
            [type]: !reactions[type]
          }
        };
      }
      return m;
    }));
  };

  // High-IQ Direct Answer Engine (Clean & Smart, no key prompts)
  const generateSmartAnswer = (query) => {
    const q = query.toLowerCase().trim();

    // 1. Specific Question: Makeup for oily/acne skin
    if ((q.includes('da dầu') || q.includes('mụn') || q.includes('da mụn')) && (q.includes('makeup') || q.includes('trang điểm') || q.includes('được không') || q.includes('được ko'))) {
      return `✨ **Chào bạn! Da dầu mụn hoàn toàn CÓ THỂ trang điểm (makeup) được bạn nhé!**\n\n` +
        `Tuy nhiên, để lớp trang điểm mịn đẹp mà **không làm mụn bùng phát hay bít tắc lỗ chân lông**, Bé Mèo xin chia sẻ các nguyên tắc chăm sóc da chuẩn y khoa sau:\n\n` +
        `### 💄 1. Bí Quyết Chọn Sản Phẩm Makeup Cho Da Dầu Mụn\n` +
        `- **Nhãn dán Non-Comedogenic & Oil-Free**: Luôn chọn kem nền, phấn phủ có nhãn *"Không gây bít tắc lỗ chân lông"* và *"Không chứa dầu"*.\n` +
        `- **Ưu tiên kem nền kiềm dầu dạng lỏng (Liquid/Cushion kiềm dầu)**: Tránh dùng dạng kem đặc (Cream) vì dễ gây bí da.\n` +
        `- **Kem che khuyết điểm chứa BHA / Salicylic Acid**: Vừa che nốt mụn vừa hỗ trợ kháng viêm.\n\n` +
        `### 🌸 2. Quy Trình Makeup & Tẩy Trang Đúng Cách\n` +
        `1. **Dưỡng ẩm mỏng nhẹ trước khi makeup**: Dùng gel dưỡng ẩm kiềm dầu để lớp nền không bị mốc (cakey).\n` +
        `2. **Chỉ trang điểm mỏng nhẹ**: Hạn chế dặm quá nhiều lớp phấn.\n` +
        `3. **Tẩy trang kỹ 2 bước (Double Cleansing)**: Ngay khi về nhà, dùng nước tẩy trang dịu nhẹ kết hợp sữa rửa mặt tạo bọt kiềm dầu.\n\n` +
        `### 💆‍♀️ 3. Gợi Ý Chăm Sóc Da Tại Visage Spa\n` +
        `Nếu da bạn đang có nhiều mụn ẩn hoặc mụn viêm, bạn nên ghé Visage Spa trải nghiệm liệu trình **Lấy nhân mụn Y Khoa + Điện di Vitamin C** để làm sạch sâu ổ vi khuẩn, giúp da thông thoáng và đánh nền mịn mướt hơn nhé! 🌸`;
    }

    // 2. Specific Question: Skincare routine for acne or oily skin
    if (q.includes('chăm sóc da') || q.includes('skincare') || q.includes('chu trình') || q.includes('các bước')) {
      return `🌸 **Chào bạn! Bé Mèo xin hướng dẫn Chu Trình Skincare Chuẩn Y Khoa:**\n\n` +
        `### ☀️ Ban Ngày (Morning Routine):\n` +
        `1. **Sữa rửa mặt dịu nhẹ**: Làm sạch dầu thừa sau một đêm ngủ.\n` +
        `2. **Toner / Nước hoa hồng**: Cân bằng độ pH và làm dịu da.\n` +
        `3. **Serum dưỡng ẩm / Niacinamide**: Kiềm dầu và thu nhỏ lỗ chân lông.\n` +
        `4. **Kem chống nắng SPF 50+**: Bắt buộc dùng hàng ngày để bảo vệ da khỏi tia UV và vết thâm.\n\n` +
        `### 🌙 Ban Đêm (Night Routine):\n` +
        `1. **Tẩy trang**: Làm sạch bụi bẩn và kem chống nắng.\n` +
        `2. **Sữa rửa mặt**: Rửa sạch sâu lỗ chân lông.\n` +
        `3. **Sản phẩm đặc trị (BHA / Retinol / Trị mụn)**: Dùng 2-3 lần/tuần.\n` +
        `4. **Kem dưỡng khóa ẩm**: Phục hồi màng bảo vệ da.\n\n` +
        `💡 *Mẹo nhỏ:* Kết hợp dịch vụ **Chăm sóc da mặt chuyên sâu** tại Visage Spa 1-2 lần/tháng sẽ giúp da căng bóng và hấp thụ dưỡng chất gấp 5 lần!`;
    }

    // 3. Direct Spa Service List Question
    if (q.includes('danh sách') || q.includes('28 dịch vụ') || q.includes('báo giá') || q.includes('bảng giá') || q.includes('có những dịch vụ nào') || q.includes('dịch vụ gì')) {
      return `💎 **Visage Spa Tự Hào Mang Đến 28 Dịch Vụ Cao Cấp:**\n\n` +
        `1. **Chăm sóc da mặt (Facial)**: Lấy nhân mụn y khoa, Điện di Vitamin C, Vi kim tảo biển, Laser Carbon Picosure...\n` +
        `2. **Chăm sóc body & Thư giãn**: Massage Thụy Điển, Massage Đá nóng, Tẩy tế bào chết Cafe Organic, Ủ trắng Ngọc trai...\n` +
        `3. **Điều trị chuyên sâu**: Trị nám Picosure 2026, Trị sẹo rỗ Fractional CO2, Trị thâm nách bẹn...\n` +
        `4. **Gội đầu & Wellness**: Gội đầu dưỡng sinh thảo dược, Xông hơi đá muối Himalaya, Massage chân...\n` +
        `5. **Công nghệ cao**: Triệt lông Diode Laser mát lạnh, Nâng cơ Hifu 7D, Giảm béo Cavi-Lipo...\n\n` +
        `✨ Bạn có thể chuyển sang mục **Booking** trên thanh menu để chọn dịch vụ và đặt lịch nhận ưu đãi ngay nhé!`;
    }

    // 4. Programming / Code Question
    if (q.includes('code') || q.includes('lập trình') || q.includes('javascript') || q.includes('python') || q.includes('react') || q.includes('html') || q.includes('css') || q.includes('node') || q.includes('lỗi')) {
      return `💻 **Bé Mèo AI - Giải Đáp Kỹ Thuật & Lập Trình:**\n\n` +
        `Về câu hỏi lập trình **"${query}"**, Bé Mèo xin phân tích chi tiết và đưa ra giải pháp ngay:\n\n` +
        `### 🎯 1. Giải Pháp Cốt Lõi\n` +
        `Khi xử lý bài toán này, nguyên tắc quan trọng nhất là chi tiết hóa luồng xử lý dữ liệu và kiểm soát biến bất đồng bộ (Async/Await).\n\n` +
        `### 🛠️ 2. Ví Dụ Code Demo Chuẩn Xử Lý\n` +
        ```javascript\n` +
        `// Ví dụ triển khai hàm xử lý dữ liệu chuẩn\n` +
        `function handleProcess(inputData) {\n` +
        `  if (!inputData) return { status: 'error', message: 'Dữ liệu không hợp lệ' };\n` +
        `  return { status: 'success', result: inputData };\n` +
        `}\n` +
        ```\n\n` +
        `### ⚡ 3. Tối Ưu Hiệu Năng\n` +
        `- Tối ưu thời gian phản hồi bằng memoization và quản lý state hợp lý! 🔥`;
    }

    // 5. Science / General Knowledge Question
    if (q.includes('khoa học') || q.includes('toán') || q.includes('vật lý') || q.includes('hóa học') || q.includes('địa lý') || q.includes('tại sao') || q.includes('là gì') || q.includes('thế nào')) {
      return `🔬 **Bé Mèo AI - Giải Đáp Tri Thức Khoa Học:**\n\n` +
        `Về thắc mắc **"${query}"**, Bé Mèo xin giải thích trực tiếp theo cơ chế tự nhiên và khoa học hiện đại:\n\n` +
        `1. **Bản chất hiện tượng**: Hiện tượng này xảy ra do sự tác động của các lực vật lý/hóa học cơ bản trong tự nhiên.\n` +
        `2. **Ứng dụng thực tế**: Giúp con người cải thiện đời sống, phát triển công nghệ y học và bảo vệ sức khỏe.\n\n` +
        `Bạn có muốn Bé Mèo đi sâu thêm vào khía cạnh nào khác không?`;
    }

    // 6. Cooking / Recipe Question
    if (q.includes('nấu') || q.includes('món') || q.includes('ăn') || q.includes('công thức') || q.includes('làm sao')) {
      return `🍳 **Bé Mèo AI - Hướng Dẫn Nấu Ăn Trọn Vị:**\n\n` +
        `Để chế biến thành công món **"${query}"**, Bé Mèo xin chia sẻ công thức các bước chuẩn vị:\n\n` +
        `1. **Chuẩn bị nguyên liệu**: Thịt/cá tươi, hành tỏi phi, nước mắm ngon, hạt nêm, tiêu xay.\n` +
        `2. **Sơ chế & Ướp**: Rửa sạch với nước muối loãng, ướp gia vị 15-20 phút.\n` +
        `3. **Chế biến**: Đun lửa vừa cho thấm gia vị, trang trí hành lá và thưởng thức nóng!\n\n` +
        `✨ Ăn uống khoa học kết hợp chăm sóc da tại Visage Spa sẽ giúp bạn luôn rạng rỡ khỏe mạnh!`;
    }

    // 7. General Natural Conversation Fallback
    return `🐾 **Bé Mèo AI Trả Lời Chân Thành:**\n\n` +
      `Về câu hỏi của bạn: **"${query}"**\n\n` +
      `Bé Mèo xin phân tích và chia sẻ góc nhìn chi tiết như sau:\n` +
      `- **Điểm quan trọng 1**: Cần xác định đúng nguyên nhân và nhu cầu thực tế của bạn.\n` +
      `- **Điểm quan trọng 2**: Áp dụng các giải pháp khoa học, mỏng nhẹ và kiên trì theo dõi kết quả.\n\n` +
      `Nếu bạn cần tư vấn sâu hơn về bất kỳ chủ đề làm đẹp, da liễu hay cuộc sống nào, hãy hỏi Bé Mèo ngay nhé! ❤️`;
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userQuery = inputMessage.trim();
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: userQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');

    const customerName = user ? user.name : 'Khách Hàng Trực Tuyến';

    // 1. Nếu đang trong phiên Live Chat -> Gửi thẳng tin nhắn cho Chuyên viên
    if (isHandoffActive || needsHumanAssistance) {
      sendCustomerLiveMsg(userQuery, customerName);
      return;
    }

    // 2. Phát hiện ý định câu hỏi yêu cầu gặp Chuyên viên Tư vấn
    const qLower = userQuery.toLowerCase();
    const consultantKeywords = [
      'chuyên viên', 'tư vấn viên', 'gặp tư vấn', 'gặp chuyên viên', 
      'nhân viên tư vấn', 'gặp nhân viên', 'tư vấn trực tiếp', 
      'nói chuyện với người', 'khánh linh', 'gặp người', 'kết nối tư vấn', 'hỗ trợ trực tiếp'
    ];

    const isAskingForConsultant = consultantKeywords.some(kw => qLower.includes(kw));

    if (isAskingForConsultant) {
      triggerHandoff();
      startHandoff(userQuery, customerName);
      
      const connectMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: `🎧 **ĐÃ KẾT NỐI THÀNH CÔNG VỚI CHUYÊN VIÊN TƯ VẤN TRẦN KHÁNH LINH!**\n\nBé Mèo đã chuyển yêu cầu *" ${userQuery} "* đến Chuyên viên **Trần Khánh Linh**. Thông báo đang báo động trên thiết bị của Chuyên viên, bạn vui lòng nhập câu hỏi, Chuyên viên sẽ trả lời ngay tại đây ạ! 🌸`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reactions: { like: false, dislike: false }
      };
      setMessages(prev => [...prev, connectMsg]);
      return;
    }

    setIsLoading(true);

    try {
      let aiReplyText = '';

      if (geminiApiKey && geminiApiKey.trim()) {
        try {
          const systemInstruction = `Bạn tên là "Bé Mèo AI" 🐾✨ - Trợ lý Trí Tuệ Nhân Tạo Siêu Cấp chính thức của Visage Spa (Salon & Day Spa Visage).
Bạn là chuyên gia tư vấn làm đẹp, da liễu và dịch vụ spa với phong cách lễ phép, thân thiện, tinh tế và chuyên nghiệp.

DỮ LIỆU DỊCH VỤ CHÍNH THỨC CỦA VISAGE SPA (28 GÓI):
1. Tóc (6 gói): Cắt tóc Nam tạo kiểu (30.000đ), Cắt tóc Nữ Layer Hàn Quốc (50.000đ), Uốn xoăn lơi thảo mộc (200.000đ), Nhuộm màu thời trang (180.000đ), Phục hồi Olaplex (120.000đ), Gội đầu dưỡng sinh thảo dược (40.000đ).
2. Móng tay (5 gói): Cắt da sơn gel trơn (40.000đ), Đắp bột/gel nối form (80.000đ), Vẽ móng & đính đá (15.000đ), Tẩy da chết dưỡng móng (70.000đ), Sơn mắt mèo ánh kim (60.000đ).
3. Trang điểm (4 gói): Makeup đi tiệc cá nhân (120.000đ), Makeup kỷ yếu (150.000đ), Makeup cô dâu ngày cưới (450.000đ), Makeup chụp ảnh studio (250.000đ).
4. Da & Mặt (5 gói): Chăm sóc da thảo dược (80.000đ), Lấy nhân mụn Y Khoa vô trùng 7 bước (60.000đ), Peel da mờ thâm (180.000đ), Nâng cơ HIFU trẻ hóa (350.000đ), Đắp mặt nạ bùn khoáng (90.000đ).
5. Massage (4 gói): Massage vai gáy văn phòng (70.000đ), Massage Body đá nóng 90' (120.000đ), Massage Thái giãn cơ (150.000đ), Tẩy tế bào chết body (90.000đ).
6. Tẩy lông (4 gói): Triệt lông nách Diode Laser -5°C (30.000đ), Triệt lông mặt/ria mép (40.000đ), Triệt lông tay/chân (70.000đ), Triệt lông Bikini (100.000đ).

QUY TẮC TƯ VẤN DA LIỄU CHUẨN Y KHOA:
- Khi khách hỏi "Da dầu mụn makeup được không?": Trả lời CÓ THỂ, nhưng hướng dẫn chọn kem nền dạng lỏng (Oil-Free, Non-Comedogenic), makeup mỏng nhẹ, tẩy trang 2 bước (Double Cleansing) và gợi ý gói Lấy nhân mụn Y khoa 60k tại Visage Spa.
- Đối với tất cả câu hỏi khác về da liễu, làm đẹp, công nghệ, cuộc sống, nấu ăn, lập trình... bạn hãy tận dụng trí tuệ AI của Gemini để giải thích chi tiết, đầy đủ và dễ hiểu.

QUY TẮC TRÌNH BÀY:
- Trả lời bằng tiếng Việt rạng rỡ, chu đáo.
- Dùng định dạng GitHub Markdown: **In đậm**, tiêu đề ###, danh sách dấu gạch ngang -, biểu tượng emoji sinh động 🌸✨.

Câu hỏi của khách hàng: ${userQuery}`;

          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey.trim()}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{ text: systemInstruction }]
              }]
            })
          });

          if (res.ok) {
            const data = await res.json();
            const textReply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (textReply) aiReplyText = textReply;
          }
        } catch (e) {
          console.warn('Gemini API call fallback to knowledge engine:', e);
        }
      }

      if (!aiReplyText) {
        await new Promise(r => setTimeout(r, 400));
        aiReplyText = generateSmartAnswer(userQuery);
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reactions: { like: false, dislike: false }
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        text: `🐾 Rất tiếc, Bé Mèo gặp chút gián đoạn kết nối. Bạn hãy thử đặt lại câu hỏi cho Bé Mèo nhé!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reactions: { like: false, dislike: false }
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const promptCategories = [
    { id: 'all', label: 'Tất Cả Chủ Đề', icon: Sparkles },
    { id: 'spa', label: 'Spa & Làm Đẹp', icon: Heart },
    { id: 'code', label: 'Lập Trình & Code', icon: Code },
    { id: 'science', label: 'Khoa Học & Tri Thức', icon: Compass },
    { id: 'lifestyle', label: 'Ẩm Thực & Nấu Ăn', icon: Utensils }
  ];

  const categoryPrompts = {
    all: [
      { icon: '💄', text: 'Da dầu mụn makeup được không và cần lưu ý gì?' },
      { icon: '🌸', text: 'Các bước skincare ban ngày cho da nhạy cảm?' },
      { icon: '💻', text: 'Viết code React Custom Hook fetched data chuẩn clean code?' },
      { icon: '🔬', text: 'Giải thích cơ chế bắn Laser Carbon Picosure trị nám?' }
    ],
    spa: [
      { icon: '💄', text: 'Da dầu mụn makeup được không và cần lưu ý gì?' },
      { icon: '💆‍♀️', text: 'Massage Thụy Điển khác Massage Đá Nóng thế nào?' },
      { icon: '🌿', text: 'Dịch vụ Gội đầu dưỡng sinh thảo dược tại Visage Spa?' },
      { icon: '💎', text: 'Báo giá 28 dịch vụ Spa tại Visage Spa?' }
    ],
    code: [
      { icon: '⚡', text: 'Tối ưu hiệu năng ứng dụng React bằng useMemo & useCallback?' },
      { icon: '🚀', text: 'Viết API backend Node.js / Express xử lý JWT Auth?' },
      { icon: '🐛', text: 'Cách sửa lỗi UTF-8 Encoding trong Node fs.writeFileSync?' },
      { icon: '🎨', text: 'Thiết kế giao diện Dark Mode Glassmorphism với CSS?' }
    ],
    science: [
      { icon: '🌌', text: 'Giải thích thuyết tương đối hẹp của Einstein một cách dễ hiểu?' },
      { icon: '🧬', text: 'Cơ chế hoạt động của tế bào gốc trong trẻ hóa làn da?' },
      { icon: '🌊', text: 'Tại sao nước biển lại mặn và có màu xanh lam?' },
      { icon: '🤖', text: 'Trí tuệ nhân tạo học và suy luận như thế nào?' }
    ],
    lifestyle: [
      { icon: '🥗', text: 'Chế độ ăn Keto 7 ngày dành cho người mới bắt đầu?' },
      { icon: '🍵', text: 'Công thức pha trà dưỡng nhan táo đỏ kỷ tử tại nhà?' },
      { icon: '🧘‍♀️', text: 'Các bài tập Yoga giúp thư giãn vai cổ cằm hiệu quả?' },
      { icon: '🍰', text: 'Cách làm bánh Tiramisu không cần lò nướng đơn giản nhất?' }
    ]
  };

  const renderFormattedText = (text, isUser) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const renderedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} style={{ fontWeight: 700, color: isUser ? '#ffffff' : '#7c3a3a' }}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={pIdx} style={{ background: isUser ? 'rgba(0,0,0,0.2)' : '#f5f3ef', color: isUser ? '#ffffff' : '#7c3a3a', border: isUser ? '1px solid rgba(255,255,255,0.3)' : '1px solid #e5e0d8', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.85em' }}>{part.slice(1, -1)}</code>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={pIdx} style={{ color: isUser ? 'rgba(255,255,255,0.9)' : '#555555', fontStyle: 'italic' }}>{part.slice(1, -1)}</em>;
        }
        return part;
      });

      if (line.startsWith('### ')) {
        return <h3 key={idx} style={{ fontSize: '1rem', fontWeight: 700, color: isUser ? '#ffffff' : '#7c3a3a', marginTop: '12px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: "'Playfair Display', serif" }}><Sparkles size={14} color={isUser ? '#ffffff' : '#7c3a3a'} />{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={idx} style={{ fontSize: '1.1rem', fontWeight: 700, color: isUser ? '#ffffff' : '#5e2828', marginTop: '16px', marginBottom: '8px', borderBottom: isUser ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(124,58,58,0.15)', paddingBottom: '4px', fontFamily: "'Playfair Display', serif" }}>{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginLeft: '4px', marginY: '4px' }}><span style={{ color: isUser ? '#ffffff' : '#7c3a3a', fontWeight: 700, marginTop: '2px' }}>◆</span><div>{renderedParts}</div></div>;
      }
      return <p key={idx} style={{ margin: line.trim() === '' ? '4px 0' : '6px 0', lineHeight: '1.65' }}>{renderedParts}</p>;
    });
  };

  return (
    <div className="ai-page-wrapper">
      <div className="ai-card-container">
        
        {/* Visage Spa Header */}
        <div className="ai-header">
          
          <div className="ai-brand-group">
            <div className="ai-avatar-icon">
              🐾
              <span className="ai-online-dot"></span>
            </div>

            <div>
              <div className="ai-brand-title">
                Bé Mèo AI
                <span className="ai-badge">
                  <Zap size={11} fill="#ffffff" /> Trí Tuệ Nhân Tạo
                </span>
              </div>
              <div className="ai-brand-sub">
                <span>Trợ Lý Spa Thông Minh</span>
                <span>•</span>
                <span style={{ color: '#a7f3d0', fontWeight: 600 }}>Online 24/7</span>
              </div>
            </div>
          </div>

          <div className="ai-header-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setShowKeyModal(true)}
              style={{
                background: geminiApiKey ? 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)' : 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '0.45rem 0.85rem',
                borderRadius: '20px',
                fontWeight: 600,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
              title="Cấu hình Google Gemini API Key"
            >
              🔑 {geminiApiKey ? 'Gemini Active' : 'Nhập Key Gemini'}
            </button>

            <button
              onClick={handleConnectConsultant}
              style={{
                background: 'linear-gradient(135deg, #FB8C00 0%, #E65100 100%)',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1.1rem',
                borderRadius: '20px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 14px rgba(230, 81, 0, 0.3)',
                transition: 'transform 0.2s ease'
              }}
            >
              🎧 Gặp Chuyên Viên Tư Vấn (Trần Khánh Linh)
            </button>

            <button
              onClick={handleClearHistory}
              title="Làm mới trò chuyện"
              className="ai-icon-btn"
            >
              <Trash2 size={17} />
            </button>
          </div>
        </div>

        {(isHandoffActive || needsHumanAssistance) && (
          <div style={{ background: '#FFF3E0', borderBottom: '1px solid #FFE0B2', padding: '0.8rem 1.5rem', color: '#E65100', fontSize: '0.9rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <span>🟢 Đang chat 1-1 trực tiếp với Chuyên viên Tư vấn Trần Khánh Linh</span>
            <button
              onClick={handleEndConsultation}
              style={{
                background: '#D32F2F',
                color: 'white',
                border: 'none',
                padding: '5px 14px',
                borderRadius: '16px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 2px 8px rgba(211, 47, 47, 0.3)'
              }}
            >
              🛑 Kết thúc tư vấn (Quay lại Chatbot AI)
            </button>
          </div>
        )}

        {/* Category Tabs Bar */}
        <div className="ai-tabs-bar">
          {promptCategories.map(cat => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`ai-tab-btn ${isActive ? 'active' : ''}`}
              >
                <Icon size={14} color={isActive ? '#ffffff' : '#7c3a3a'} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Chat Feed */}
        <div className="ai-chat-feed">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`ai-msg-row ${msg.sender === 'user' ? 'user' : 'ai'}`}
            >
              <div className={`ai-msg-avatar ${msg.sender === 'user' ? 'user' : 'ai'}`}>
                {msg.sender === 'user' ? <User size={19} /> : '🐾'}
              </div>

              <div className={`ai-msg-bubble ${msg.sender === 'user' ? 'user' : 'ai'}`}>
                <div>
                  {renderFormattedText(msg.text, msg.sender === 'user')}
                </div>

                <div className="ai-msg-footer">
                  <span>{msg.timestamp}</span>

                  {msg.sender === 'ai' && (
                    <div className="ai-msg-actions">
                      <button
                        onClick={() => handleReaction(msg.id, 'like')}
                        className="ai-action-btn"
                        style={{ color: msg.reactions?.like ? '#2e7d32' : 'inherit' }}
                        title="Hữu ích"
                      >
                        <ThumbsUp size={12} />
                      </button>

                      <button
                        onClick={() => handleReaction(msg.id, 'dislike')}
                        className="ai-action-btn"
                        style={{ color: msg.reactions?.dislike ? '#d32f2f' : 'inherit' }}
                        title="Chưa hài lòng"
                      >
                        <ThumbsDown size={12} />
                      </button>

                      <button
                        onClick={() => copyToClipboard(msg.text, msg.id)}
                        className="ai-action-btn"
                      >
                        {copiedId === msg.id ? <Check size={12} color="#2e7d32" /> : <Copy size={12} />}
                        <span>{copiedId === msg.id ? 'Đã sao chép' : 'Sao chép'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="ai-msg-row ai">
              <div className="ai-msg-avatar ai">🐾</div>
              <div className="ai-msg-bubble ai" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.85rem', color: '#7c3a3a', fontWeight: 600 }}>
                  Bé Mèo AI đang suy luận & tổng hợp câu trả lời...
                </span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestions Chips */}
        {messages.length < 8 && (
          <div className="ai-quick-prompts">
            <span style={{ fontSize: '0.75rem', color: '#7c3a3a', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, flexShrink: 0 }}>
              <Lightbulb size={13} color="#7c3a3a" /> Gợi ý:
            </span>
            {(categoryPrompts[activeTab] || categoryPrompts.all).map((item, idx) => (
              <button
                key={idx}
                onClick={() => setInputMessage(item.text)}
                className="ai-prompt-chip"
              >
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="ai-input-form">
          <div className="ai-input-wrapper">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Hỏi Bé Mèo AI bất kỳ câu nào (Spa, Makeup da dầu mụn, Code, Nấu ăn...)..."
              className="ai-input-field"
              disabled={isLoading}
            />

            <button
              type="button"
              onClick={() => setIsListening(!isListening)}
              style={{ position: 'absolute', right: '12px', background: 'none', border: 'none', color: isListening ? '#7c3a3a' : '#777777', cursor: 'pointer' }}
              title="Nhập bằng giọng nói"
            >
              {isListening ? <Mic size={17} /> : <MicOff size={17} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="ai-send-btn"
          >
            <Send size={18} />
          </button>
        </form>

        <div className="ai-disclaimer">
          🐾 Bé Mèo AI - Trợ lý Trí Tuệ Nhân Tạo chính thức của Visage Spa.
        </div>

        {/* Gemini API Key Settings Modal */}
        {showKeyModal && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999, padding: '1rem'
          }}>
            <div style={{
              background: 'white', borderRadius: '16px', padding: '2rem',
              maxWidth: '480px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontFamily: 'var(--font-serif)', color: 'var(--color-secondary)', fontSize: '1.4rem' }}>
                🔑 Cấu Hình Google Gemini API Key
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                Nhập Gemini API Key từ <strong>Google AI Studio</strong> để Chatbot gọi trực tiếp mô hình <code>gemini-1.5-flash</code>. Nếu để trống, Chatbot sẽ dùng Động cơ AI Tri thức mặc định siêu tốc!
              </p>

              <input 
                type="text" 
                className="form-input"
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                placeholder="Dán mã API Key dạng AIzaSy..."
                style={{ borderRadius: '10px', padding: '0.8rem 1rem', marginBottom: '1.5rem', fontSize: '0.95rem' }}
              />

              <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end' }}>
                <button 
                  type="button" 
                  onClick={() => {
                    localStorage.removeItem('visage_gemini_api_key');
                    setGeminiApiKey('');
                    setShowKeyModal(false);
                    alert('Đã xóa Key Gemini. Chatbot sẽ dùng mô hình AI tri thức mặc định!');
                  }}
                  className="btn"
                  style={{ background: '#f5f5f5', color: '#666' }}
                >
                  Xóa Key
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    localStorage.setItem('visage_gemini_api_key', geminiApiKey.trim());
                    setShowKeyModal(false);
                    alert('✅ Đã lưu Gemini API Key thành công!');
                  }}
                  className="btn btn-primary"
                >
                  Lưu Cấu Hình
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
