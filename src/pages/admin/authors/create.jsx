import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createAuthor } from "../../../_services/authors";

export default function AuthorsCreate() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAuthor({ name });
      navigate("/admin/authors");
    } catch (error) {
      console.error("Gagal menambah author:", error);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-white">Create New Author</h1>
        <Link
          to="/admin/authors"
          className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700"
        >
          Back
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
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
            placeholder="Enter author name..."
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Save Author
        </button>
      </form>
    </div>
  );
}