import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../_api';

export default function Register() {
  const navigate = useNavigate();

  // State form input sesuai kriteria tugas (nama lengkap, email, username, password)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle perubahan nilai input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle ketika form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // 1. Validasi: Cek apakah ada field yang kosong
    if (!formData.name || !formData.email || !formData.username || !formData.password) {
      setError('Semua field wajib diisi!');
      return;
    }

    // 2. Validasi: Format email sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Format email tidak valid!');
      return;
    }

    // 3. Validasi: Panjang password minimal 6 karakter
    if (formData.password.length < 6) {
      setError('Password harus memiliki minimal 6 karakter!');
      return;
    }

    setIsLoading(true);

    try {
      // Kirim data ke endpoint API backend Laravel
      await API.post('/register', formData);
      
      setSuccessMessage('Registrasi berhasil! Akun Anda telah dibuat.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        username: '',
        password: '',
      });

      // Arahkan ke halaman login 
      setTimeout(() => {
        navigate('/login');
      }, 1500);

    } catch (err) {
      console.error("Gagal registrasi:", err);
      setError(err.response?.data?.message || 'Registrasi gagal, periksa kembali data Anda!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4 py-8">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-md border border-gray-700">
        <h2 className="text-2xl font-bold text-center text-white mb-2">Daftar Akun Baru</h2>
        <p className="text-sm text-center text-gray-400 mb-6">Silakan lengkapi data diri Anda untuk registrasi</p>

        {/* Notifikasi Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-500 text-red-200 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Notifikasi Sukses */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-900/50 border border-green-500 text-green-200 rounded-lg text-sm">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama Lengkap */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Nama Lengkap</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="nama@email.com"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Pilih username unik"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimal 6 karakter"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-600 text-white py-2.5 rounded-lg font-semibold hover:bg-primary-700 transition duration-200 text-sm disabled:bg-primary-400"
          >
            {isLoading ? 'Memproses...' : 'Daftar Sekarang'}
          </button>
        </form>

        {/* Link ke Login */}
        <p className="text-sm text-center text-gray-400 mt-6">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-primary-400 font-medium hover:underline">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}