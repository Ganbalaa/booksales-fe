import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  // Ambil data user dari localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // Jika user belum login, arahkan kembali ke halaman Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Jika route ini butuh role tertentu (misal 'admin') 
  // dan role user saat ini tidak sesuai
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    alert('Akses Ditolak: Anda bukan Admin!');
    return <Navigate to="/" replace />;
  }

  // Jika lolos pengecekan, render halaman yang dituju
  return <Outlet />;
};

export default ProtectedRoute;