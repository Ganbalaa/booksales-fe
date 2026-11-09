import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuthors } from "../../../_services/authors";
import API from "../../../_api";

export default function AuthorsIndex() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const data = await getAuthors();
        setAuthors(data);
      } catch (error) {
        console.error("Gagal mengambil data author:", error);
      }
    };
    fetchAuthors();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus author ini?")) {
      try {
        await API.delete(`/authors/${id}`);
        setAuthors(authors.filter((author) => author.id !== id));
      } catch (error) {
        console.error("Gagal menghapus author:", error);
        alert("Gagal menghapus data!");
      }
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-white">Data Authors</h1>
        <Link
          to="/admin/authors/create"
          className="bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-800"
        >
          Add Author
        </Link>
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-400 bg-gray-800">
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">No</th>
              <th scope="col" className="px-6 py-3">Author Name</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {authors?.map((author, index) => (
              <tr key={author.id} className="border-b border-gray-700">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-white">{author.name}</td>
                <td className="px-6 py-4 space-x-2">
                  <Link
                    to={`/admin/authors/edit/${author.id}`}
                    className="bg-yellow-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-yellow-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(author.id)}
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