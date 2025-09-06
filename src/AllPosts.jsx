import React, { useEffect, useState } from "react";
import axios from "axios";
import {Spinner} from "@phosphor-icons/react"

export default function RetroPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await axios.get("https://mern-backend-1-szl8.onrender.com/posts/");
        setPosts(res.data.posts); // backend returns { posts: [...] }
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

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
        THE NET - POSTS
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-black border border-green-400 p-4 rounded-lg hover:shadow-[0_0_10px_#00FF00] transition-shadow duration-300"
          >
            <h2 className="text-xl font-bold mb-1">{post.title}</h2>
            <p className="text-green-300 mb-2">{post.description}</p>
            <p className="text-sm text-green-500 mb-1">
              <strong>Created At:</strong>{" "}
              {new Date(post.createdAt).toLocaleString()}
            </p>
            <p className="text-sm text-green-500 mb-2">
              <strong>Author:</strong> {post.author.username} ({post.author.email})
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-black bg-green-400 px-2 py-0.5 rounded text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
