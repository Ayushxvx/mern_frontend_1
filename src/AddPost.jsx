import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export default function AddPost() {
  const { isLoggedIn } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState(""); // comma-separated
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setMessage("You must be logged in to add a post");
      return;
    }

    const token = localStorage.getItem("access_token");

    try {
      await axios.post(
        "https://mern-backend-1-szl8.onrender.com/posts/",
        { title, description, tags: tags.split(",").map(t => t.trim()) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Post added successfully!");
      setTitle("");
      setDescription("");
      setTags("");
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Failed to add post");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6 p-4 bg-gray-900 rounded-lg text-white shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-cyan-400">Add a New Post</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="p-2 rounded-md border-2 border-gray-700 bg-gray-800 focus:border-cyan-400 focus:outline-none"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="p-2 rounded-md border-2 border-gray-700 bg-gray-800 focus:border-cyan-400 focus:outline-none resize-none"
          rows={5}
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="p-2 rounded-md border-2 border-gray-700 bg-gray-800 focus:border-cyan-400 focus:outline-none"
        />

        <button
          type="submit"
          className="cursor-pointer bg-cyan-500 hover:bg-cyan-600 transition-colors p-2 rounded-md font-semibold"
        >
          Add Post
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-red-400">{message}</p>
      )}
    </div>
  );
}
