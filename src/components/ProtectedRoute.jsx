import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    // Chưa đăng nhập -> Chuyển về trang Đăng nhập
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Không có quyền truy cập -> Chuyển về trang chủ
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
