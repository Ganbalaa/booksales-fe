import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuthors } from "../../../_services/authors";

export default function AuthorsIndex() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const result = await getAuthors();
        setAuthors(result.data || result); 
      } catch (error) {
        console.error("Gagal mengambil data author:", error);
      }
    };
    fetchAuthors();
  }, []);

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
            </tr>
          </thead>
          <tbody>
            {authors?.map((author, index) => (
              <tr key={author.id} className="border-b border-gray-700">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-white">{author.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}