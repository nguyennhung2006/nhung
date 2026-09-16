export const mockServices = [
  { id: 1, name: 'Massage Đá Nóng', price: '500.000đ', duration: '60 phút', description: 'Thư giãn cơ bắp, lưu thông khí huyết với đá nóng tự nhiên.', category: 'Body Care' },
  { id: 2, name: 'Chăm Sóc Da Chuyên Sâu', price: '800.000đ', duration: '90 phút', description: 'Làm sạch sâu, đẩy tinh chất và đắp mặt nạ vàng 24k.', category: 'Facial' },
  { id: 3, name: 'Tẩy Tế Bào Chết Toàn Thân', price: '400.000đ', duration: '45 phút', description: 'Loại bỏ da chết bằng muối biển và thảo mộc.', category: 'Body Care' },
  { id: 4, name: 'Gội Đầu Dưỡng Sinh', price: '250.000đ', duration: '60 phút', description: 'Gội đầu thảo dược kết hợp massage ấn huyệt vùng đầu cổ vai gáy.', category: 'Hair Care' }
];

export const mockUsers = [
  { id: 1, username: 'khachhang', password: '123', role: 'customer', name: 'Nguyễn Văn Khách' },
  { id: 2, username: 'nhanvien', password: '123', role: 'staff', name: 'Trần Thị Nhân Viên' },
  { id: 3, username: 'admin', password: '123', role: 'admin', name: 'Quản Trị Viên' }
];

// Cấu trúc lịch hẹn giả lập
export const initialAppointments = [
  { id: 101, customerId: 1, customerName: 'Nguyễn Văn Khách', serviceName: 'Massage Đá Nóng', date: '2023-11-20', time: '14:00', status: 'pending' },
  { id: 102, customerId: 1, customerName: 'Nguyễn Văn Khách', serviceName: 'Gội Đầu Dưỡng Sinh', date: '2023-11-22', time: '10:00', status: 'completed' }
];
