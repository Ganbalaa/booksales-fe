import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGenres } from "../../../_services/genres";
import API from "../../../_api";

export default function GenresIndex() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenres();
        setGenres(data);
      } catch (error) {
        console.error("Gagal mengambil data genre:", error);
      }
    };
    fetchGenres();
  }, []);

  // ---> FUNGSI HANDLE DELETE DILETAKKAN DI SINI <---
  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus genre ini?")) {
      try {
        await API.delete(`/genres/${id}`);
        // Filter state agar genre yang dihapus langsung hilang dari tabel tanpa refresh
        setGenres(genres.filter((genre) => genre.id !== id));
      } catch (error) {
        console.error("Gagal menghapus genre:", error);
        alert("Gagal menghapus data!");
      }
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-white">Data Genres</h1>
        <Link
          to="/admin/genres/create"
          className="bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-800"
        >
          Add Genre
        </Link>
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-400 bg-gray-800">
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">No</th>
              <th scope="col" className="px-6 py-3">Genre Name</th>
              <th scope="col" className="px-6 py-3">Action</th> {/* Kolom Aksi */}
            </tr>
          </thead>
          <tbody>
            {genres?.map((genre, index) => (
              <tr key={genre.id} className="border-b border-gray-700">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-white">{genre.name}</td>
                <td className="px-6 py-4 space-x-2">
                  {/* Tombol Edit */}
                  <Link
                    to={`/admin/genres/edit/${genre.id}`}
                    className="bg-yellow-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-yellow-700"
                  >
                    Edit
                  </Link>
                  {/* Tombol Delete */}
                  <button
                    onClick={() => handleDelete(genre.id)}
                    className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}