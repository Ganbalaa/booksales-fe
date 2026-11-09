import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import API from "../../../_api";

export default function GenresEdit() {
  const [name, setName] = useState("");
  const { id } = useParams(); // Mengambil ID dari URL
  const navigate = useNavigate();

  // Ambil data genre berdasarkan ID saat halaman pertama kali dibuka
  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const response = await API.get(`/genres/${id}`);
        const genreData = response.data.data || response.data;
        setName(genreData.name);
      } catch (error) {
        console.error("Gagal mengambil data genre:", error);
      }
    };
    fetchGenre();
  }, [id]);

  // Fungsi untuk mengirim perubahan data (Update)
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/genres/${id}`, { name });
      navigate("/admin/genres"); // Kembali ke halaman tabel setelah sukses
    } catch (error) {
      console.error("Gagal mengupdate genre:", error);
      alert("Gagal mengupdate data, cek console!");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-white">Edit Genre</h1>
        <Link
          to="/admin/genres"
          className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700"
        >
          Back
        </Link>
      </div>

      <form onSubmit={handleUpdate} className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">
            Genre Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Update Genre
        </button>
      </form>
    </div>
  );
}