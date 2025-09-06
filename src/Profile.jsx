import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export default function Profile() {
  const { isLoggedIn } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isLoggedIn) return;

    const token = localStorage.getItem("access_token");

    async function fetchProfile() {
      try {
        const res = await axios.get("https://mern-backend-1-szl8.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsername(res.data.username);
        setEmail(res.data.user.email);
        setPosts(res.data.posts || []);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setMessage("Error loading profile");
      }
    }

    fetchProfile();
  }, [isLoggedIn]);

  async function handleDelete(postId) {
    const token = localStorage.getItem("access_token");

    try {
      await axios.delete(`https://mern-backend-1-szl8.onrender.com/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPosts(posts.filter((p) => p._id !== postId));
      setMessage("Post deleted successfully!");
    } catch (error) {
      console.error("Failed to delete post:", error);
      setMessage("Error deleting post");
    }
  }


  if (!isLoggedIn) {
    return (
      <div className="text-center mt-6 text-white">
        Please <span className="text-cyan-400">login</span> to view your profile.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4 bg-gray-900 rounded-lg text-white shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-cyan-400">Profile</h2>

      {username && (
        <div className="mb-6">
          <p>
            <strong>Username:</strong> {username}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
        </div>
      )}

      <h3 className="text-xl font-semibold mb-2 text-cyan-300">Your Posts</h3>

      {posts.length === 0 ? (
        <p>No posts created yet.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="mb-4 p-4 bg-gray-800 rounded-lg shadow"
          >
            <h4 className="text-lg font-bold">{post.title}</h4>
            <p>{post.description}</p>
            <div className="text-cyan-400 text-sm mb-2">
              {post.tags.join(", ")}
            </div>
            <button
              onClick={() => handleDelete(post._id)}
              className="cursor-pointer bg-red-500 hover:bg-red-600 transition-colors px-3 py-1 rounded-md text-sm"
            >
              Delete
            </button>
          </div>
        ))
      )}

      {message && (
        <p className="mt-4 text-center text-cyan-400 font-semibold">
          {message}
        </p>
      )}

    </div>
  );
}
