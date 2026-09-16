import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

const initialServices = [
  // 1. Tóc (6)
  { id: 1, name: 'Cắt Tóc Nam Tạo Kiểu Thời Trang', price: 30000, duration: '30 phút', description: 'Gội đầu thư giãn, cắt tỉa tạo kiểu Sidepart, Undercut...', category: 'Tóc' },
  { id: 2, name: 'Cắt Tóc Nữ Tạo Kiểu Layer Hàn Quốc', price: 50000, duration: '45 phút', description: 'Tạo dáng tóc bồng bềnh ôm nhẹ góc mặt.', category: 'Tóc' },
  { id: 3, name: 'Uốn Xoăn Lơi Hàn Quốc Thảo Mộc', price: 200000, duration: '120 phút', description: 'Thuốc uốn hữu cơ an toàn giữ nếp sóng lơi tự nhiên 6-9 tháng.', category: 'Tóc' },
  { id: 4, name: 'Nhuộm Màu Thời Trang Phục Hồi Bóng Mượt', price: 180000, duration: '90 phút', description: 'Nhuộm tone màu hot trend sáng da bóng mượt.', category: 'Tóc' },
  { id: 5, name: 'Phục Hồi Tóc Olaplex Chuyên Sâu', price: 120000, duration: '60 phút', description: 'Tái tạo liên kết lưu huỳnh hư tổn cho tóc tẩy.', category: 'Tóc' },
  { id: 6, name: 'Gội Đầu Dưỡng Sinh Thảo Dược 14 Bước', price: 40000, duration: '60 phút', description: 'Gội đầu thảo dược kết hợp massage ấn huyệt đầu cổ vai gáy.', category: 'Tóc' },

  // 2. Móng Tay (5)
  { id: 7, name: 'Cắt Da & Sơn Gel Trơn Bền Đẹp 4 Tuần', price: 40000, duration: '45 phút', description: 'Nhặt da chết êm ái, dũa form móng và sơn gel màu bóng đẹp.', category: 'Móng Tay' },
  { id: 8, name: 'Đắp Bột / Đắp Gel Nối Form Móng Sang Chảnh', price: 80000, duration: '60 phút', description: 'Gia cố móng yếu giòn, tạo form dài quyến rũ.', category: 'Móng Tay' },
  { id: 9, name: 'Vẽ Móng Nghệ Thuật & Đính Đá Khối', price: 15000, duration: '15 phút', description: 'Thiết kế vẽ móng tay và đính đá khối sang chảnh.', category: 'Móng Tay' },
  { id: 10, name: 'Tẩy Da Chết Tay Chân & Dưỡng Móng Chuyên Sâu', price: 70000, duration: '45 phút', description: 'Tẩy da chết thảo mộc và massage dưỡng ẩm móng.', category: 'Móng Tay' },
  { id: 11, name: 'Sơn Mắt Mèo Ánh Kim Rạng Rỡ', price: 60000, duration: '45 phút', description: 'Hiệu ứng sơn thạch mắt mèo chiếu đèn LED hút mắt.', category: 'Móng Tay' },

  // 3. Trang Điểm (4)
  { id: 12, name: 'Makeup Đi Tiệc Cá Nhân & Làm Kiểu Tóc', price: 120000, duration: '60 phút', description: 'Trang điểm tiệc mỏng nhẹ kiềm dầu căng bóng.', category: 'Trang Điểm' },
  { id: 13, name: 'Makeup Kỷ Yếu & Sự Kiện Tặng Kiểu Tóc', price: 150000, duration: '60 phút', description: 'Makeup kỷ yếu bền tone 12h dán mi tách sợi tự nhiên.', category: 'Trang Điểm' },
  { id: 14, name: 'Makeup & Làm Tóc Cô Dâu Ngày Cưới', price: 450000, duration: '90 phút', description: 'Trang điểm lộng lẫy ngày cưới tặng kèm dặm phấn tận nơi.', category: 'Trang Điểm' },
  { id: 15, name: 'Makeup Chụp Ảnh Thần Thái Nữ Hoàng', price: 250000, duration: '75 phút', description: 'Trang điểm concept thời trang bắt hình studio.', category: 'Trang Điểm' },

  // 4. Da & Mặt (5)
  { id: 16, name: 'Chăm Sóc Da Mặt Thư Giãn Nâng Cơ Thảo Dược', price: 80000, duration: '60 phút', description: 'Làm sạch sâu, massage mặt nâng cơ và đắp mặt nạ thảo dược.', category: 'Da & Mặt' },
  { id: 17, name: 'Lấy Nhân Mụn Y Khoa Vô Trùng 7 Bước', price: 60000, duration: '60 phút', description: 'Tẩy bã nhờn, lấy sạch nhân mụn ẩn và chiếu ánh sáng BIO Light.', category: 'Da & Mặt' },
  { id: 18, name: 'Peel Da Sinh Học Mờ Thâm Trẻ Hóa', price: 180000, duration: '60 phút', description: 'Tái tạo bề mặt da, làm mờ vết thâm mụn căng bóng.', category: 'Da & Mặt' },
  { id: 19, name: 'Nâng Cơ Trẻ Hóa Da Công Nghệ HIFU', price: 350000, duration: '90 phút', description: 'Sóng siêu âm hội tụ thon gọn nọng cằm xóa nhăn đuôi mắt.', category: 'Da & Mặt' },
  { id: 20, name: 'Đắp Mặt Nạ Bùn Khoáng Tự Nhiên Dưỡng Ẩm', price: 90000, duration: '45 phút', description: 'Thải độc da, hút bã nhờn và se khít lỗ chân lông.', category: 'Da & Mặt' },

  // 5. Massage & Cơ Thể (4)
  { id: 21, name: 'Massage Vai Gáy Ấn Huyệt Giải Mỏi Văn Phòng', price: 70000, duration: '45 phút', description: 'Đánh bay đau mỏi cổ vai gáy cho dân văn phòng.', category: 'Massage & Cơ Thể' },
  { id: 22, name: 'Massage Body Đá Nóng Núi Lửa Thư Giãn', price: 120000, duration: '90 phút', description: 'Thư giãn cơ bắp, lưu thông khí huyết với đá nóng tự nhiên.', category: 'Massage & Cơ Thể' },
  { id: 23, name: 'Massage Giãn Cơ Thắt Lưng Chuẩn Thái', price: 150000, duration: '60 phút', description: 'Kéo giãn cột sống, lấy lại độ dẻo dai cho cơ thể.', category: 'Massage & Cơ Thể' },
  { id: 24, name: 'Tẩy Tế Bào Chết Body Muối Biển Thảo Mộc', price: 90000, duration: '45 phút', description: 'Mịn màng làn da toàn thân, loại bỏ lớp sừng già.', category: 'Massage & Cơ Thể' },

  // 6. Tẩy Lông (4)
  { id: 25, name: 'Triệt Lông Nách Laser Diode Mát Lạnh -5°C', price: 30000, duration: '20 phút', description: 'Triệt lông đầu mát lạnh -5°C không đau rát.', category: 'Tẩy Lông' },
  { id: 26, name: 'Triệt Lông Mặt / Ria Mép Diode Laser', price: 40000, duration: '25 phút', description: 'Làm sáng da mặt, se khít lỗ chân lông.', category: 'Tẩy Lông' },
  { id: 27, name: 'Triệt Lông Tay / Chân Vĩnh Viễn', price: 70000, duration: '40 phút', description: 'Sạch 95% mầm lông cứng, da mịn màng.', category: 'Tẩy Lông' },
  { id: 28, name: 'Triệt Lông Vùng Bikini Diode Laser', price: 100000, duration: '30 phút', description: 'Mát lạnh êm ái, làm sáng mịn da.', category: 'Tẩy Lông' }
];

const initialUsers = [
  // 9 Staff members
  { id: 2, username: 'nhung', email: 'nhung@visagespa.com', phone: '0901111111', password: '123', role: 'staff', name: 'Nguyễn Thị Hồng Nhung', title: 'Nhà tạo mẫu tóc' },
  { id: 4, username: 'giang', email: 'giang@visagespa.com', phone: '0902222222', password: '123', role: 'staff', name: 'Lường Thị Giang', title: 'Thợ làm móng' },
  { id: 5, username: 'uyen', email: 'uyen@visagespa.com', phone: '0903333333', password: '123', role: 'staff', name: 'Bế Thị Thu Uyên', title: 'Chuyên viên trang điểm' },
  { id: 6, username: 'nam', email: 'nam@visagespa.com', phone: '0904444444', password: '123', role: 'staff', name: 'Trần Văn Nam', title: 'Chuyên viên massage' },
  { id: 7, username: 'linh', email: 'linh@visagespa.com', phone: '0905555555', password: '123', role: 'staff', name: 'Hoàng Thùy Linh', title: 'Chuyên viên chăm sóc da mặt' },
  { id: 8, username: 'chau', email: 'chau@visagespa.com', phone: '0906666666', password: '123', role: 'staff', name: 'Đặng Minh Châu', title: 'Thợ làm tóc' },
  { id: 9, username: 'mai', email: 'mai@visagespa.com', phone: '0907777777', password: '123', role: 'staff', name: 'Vũ Thị Mai', title: 'Thợ làm móng' },
  { id: 10, username: 'tuan', email: 'tuan@visagespa.com', phone: '0908888888', password: '123', role: 'staff', name: 'Phạm Quốc Tuấn', title: 'Chuyên viên massage' },
  { id: 11, username: 'thao', email: 'thao@visagespa.com', phone: '0909999991', password: '123', role: 'staff', name: 'Đỗ Phương Thảo', title: 'Chuyên viên trang điểm' },

  // Admin Account
  { id: 3, username: 'admin', email: 'admin@gmail.com', phone: '0909999999', password: '123', role: 'admin', name: 'Quản Trị Viên' },

  // Dedicated Consultant Account
  { id: 12, username: 'tuvan', email: 'tuvan@visagespa.com', phone: '0901234567', password: '123', role: 'consultant', name: 'Trần Khánh Linh', title: 'Chuyên Viên Tư Vấn Spa Premium' }
];

// Empty by default - customer appointments will only come from real testing/bookings
const initialAppointments = [];

export const DataProvider = ({ children }) => {
  const [services, setServices] = useState(initialServices);
  const [users, setUsers] = useState(initialUsers);
  const [appointments, setAppointments] = useState(initialAppointments);

  // Live Chat Handoff State (Persisted across logouts and page reloads)
  const [liveChatMessages, setLiveChatMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('visage_live_chat_messages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isHandoffActive, setIsHandoffActive] = useState(() => {
    try {
      const saved = localStorage.getItem('visage_is_handoff_active');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [handoffCustomerName, setHandoffCustomerName] = useState(() => {
    try {
      const saved = localStorage.getItem('visage_handoff_customer_name');
      return saved || 'Khách Hàng';
    } catch {
      return 'Khách Hàng';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('visage_live_chat_messages', JSON.stringify(liveChatMessages));
    } catch (e) {}
  }, [liveChatMessages]);

  useEffect(() => {
    try {
      localStorage.setItem('visage_is_handoff_active', JSON.stringify(isHandoffActive));
    } catch (e) {}
  }, [isHandoffActive]);

  useEffect(() => {
    try {
      localStorage.setItem('visage_handoff_customer_name', handoffCustomerName);
    } catch (e) {}
  }, [handoffCustomerName]);

  // Real-time cross-tab & interval synchronization listener
  useEffect(() => {
    const syncFromStorage = () => {
      try {
        const savedMsgs = localStorage.getItem('visage_live_chat_messages');
        if (savedMsgs) {
          const parsed = JSON.parse(savedMsgs);
          setLiveChatMessages(prev => JSON.stringify(prev) !== savedMsgs ? parsed : prev);
        }
        const savedActive = localStorage.getItem('visage_is_handoff_active');
        if (savedActive !== null) {
          const parsedActive = JSON.parse(savedActive);
          setIsHandoffActive(prev => prev !== parsedActive ? parsedActive : prev);
        }
        const savedName = localStorage.getItem('visage_handoff_customer_name');
        if (savedName) {
          setHandoffCustomerName(prev => prev !== savedName ? savedName : prev);
        }
      } catch (e) {}
    };

    window.addEventListener('storage', syncFromStorage);
    const intervalId = setInterval(syncFromStorage, 1000); // 1-second real-time poll fallback

    return () => {
      window.removeEventListener('storage', syncFromStorage);
      clearInterval(intervalId);
    };
  }, []);

  const startHandoff = (initialText, customerName = 'Khách Hàng') => {
    setIsHandoffActive(true);
    try {
      localStorage.setItem('visage_is_handoff_active', 'true');
    } catch (e) {}
    setHandoffCustomerName(customerName);
    const newMsg = {
      id: Date.now(),
      sender: 'customer',
      senderName: customerName,
      text: initialText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setLiveChatMessages(prev => [...prev, newMsg]);
  };

  const sendCustomerLiveMsg = (text, customerName = 'Khách Hàng') => {
    const newMsg = {
      id: Date.now(),
      sender: 'customer',
      senderName: customerName,
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setLiveChatMessages(prev => [...prev, newMsg]);
  };

  const sendStaffLiveMsg = (text, staffName = 'Chuyên viên tư vấn') => {
    const newMsg = {
      id: Date.now(),
      sender: 'staff',
      senderName: staffName,
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setLiveChatMessages(prev => [...prev, newMsg]);
  };

  const endHandoff = () => {
    setIsHandoffActive(false);
    try {
      localStorage.setItem('visage_is_handoff_active', 'false');
    } catch (e) {}
  };

  // --- User CRUD ---
  const addUser = (newUser) => setUsers([...users, { ...newUser, id: Date.now() }]);
  const updateUser = (id, data) => setUsers(users.map(u => u.id === id ? { ...u, ...data } : u));
  const deleteUser = (id) => setUsers(users.filter(u => u.id !== id));

  // --- Service CRUD ---
  const addService = (newService) => setServices([...services, { ...newService, id: Date.now() }]);
  const updateService = (id, data) => setServices(services.map(s => s.id === id ? { ...s, ...data } : s));
  const deleteService = (id) => setServices(services.filter(s => s.id !== id));

  // --- Appointment CRUD ---
  const addAppointment = (newApp) => setAppointments([...appointments, { ...newApp, id: Date.now() }]);
  const updateAppointment = (id, data) => setAppointments(appointments.map(a => a.id === id ? { ...a, ...data } : a));
  const deleteAppointment = (id) => setAppointments(appointments.filter(a => a.id !== id));

  // Helper
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <DataContext.Provider value={{ 
      services, users, appointments,
      addUser, updateUser, deleteUser,
      addService, updateService, deleteService,
      addAppointment, updateAppointment, deleteAppointment,
      formatCurrency,
      liveChatMessages, isHandoffActive, handoffCustomerName,
      startHandoff, sendCustomerLiveMsg, sendStaffLiveMsg, endHandoff
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
