import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { Spinner } from "@phosphor-icons/react";

export default function SearchPosts() {
  const { query } = useParams(); // from /search/:query
  const { searchq } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await axios.get("https://mern-backend-1-szl8.onrender.com/posts");
        setPosts(res.data.posts); // backend returns { posts: [...] }
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    if (query) {
      const q = query.toLowerCase();
      setFiltered(posts.filter((post) => post.title.toLowerCase().includes(q)));
    } else if (searchq) {
      const q = searchq.toLowerCase();
      setFiltered(posts.filter((post) => post.title.toLowerCase().includes(q)));
    } else {
      setFiltered(posts);
    }
  }, [query, searchq, posts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center">
        <Spinner size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-6">
      <h1 className="text-4xl text-center mb-8 border-b border-green-400 pb-2">
        SEARCH RESULTS
      </h1>
      <h2 className="text-center text-green-300 mb-6">
        Showing results for:{" "}
        <span className="font-bold text-green-400">"{query || searchq}"</span>
      </h2>

      {filtered.length === 0 ? (
        <p className="text-center text-green-500 text-lg">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((post) => (
            <div
              key={post.id || post._id}
              className="bg-black border border-green-400 p-4 rounded-lg hover:shadow-[0_0_10px_#00FF00] transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold mb-1">{post.title}</h3>
              <p className="text-green-300 mb-2">{post.content}</p>
              <p className="text-sm text-green-500 mb-1">
                <strong>Created At:</strong>{" "}
                {new Date(post.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-green-500 mb-2">
                <strong>Author:</strong> {post.author?.username} (
                {post.author?.email})
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-black bg-green-400 px-2 py-0.5 rounded text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
