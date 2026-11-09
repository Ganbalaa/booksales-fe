import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createGenre } from "../../../_services/genres";

export default function GenresCreate() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createGenre({ name });
      navigate("/admin/genres"); // Balik otomatis ke halaman tabel genres
    } catch (error) {
      console.error("Gagal menambah genre:", error);
      alert("Gagal menyimpan, cek console browser!");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-white">Create New Genre</h1>
        <Link
          to="/admin/genres"
          className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700"
        >
          Back
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
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
            placeholder="Enter genre name..."
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Save Genre
        </button>
      </form>
    </div>
  );
}