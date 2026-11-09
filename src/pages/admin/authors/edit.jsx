import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import API from "../../../_api";

export default function AuthorsEdit() {
  const [name, setName] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await API.get(`/authors/${id}`);
        const authorData = response.data.data || response.data;
        setName(authorData.name);
      } catch (error) {
        console.error("Gagal mengambil data author:", error);
      }
    };
    fetchAuthor();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/authors/${id}`, { name });
      navigate("/admin/authors");
    } catch (error) {
      console.error("Gagal mengupdate author:", error);
      alert("Gagal mengupdate data, cek console!");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-white">Edit Author</h1>
        <Link
          to="/admin/authors"
          className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700"
        >
          Back
        </Link>
      </div>

      <form onSubmit={handleUpdate} className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">
            Author Name
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
          Update Author
        </button>
      </form>
    </div>
  );
}