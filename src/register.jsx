import React, { useState } from "react";
import axios from "axios";

export default function RetroRegister() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setUsername(username.toLowerCase());

    try {
      const res = await axios.post("https://mern-backend-1-szl8.onrender.com/api/auth/register", {
        username,
        email,
        password,
      });

      const token = res.data.token; // assuming backend returns { token: "JWT..." }
      localStorage.setItem("access_token", token);

      setError("User created successfully")
      // alert("Registration successful! Token saved.");
      // Optionally redirect user, e.g., navigate("/posts")
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-black font-mono flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black border border-green-400 rounded-lg p-6 shadow-[0_0_15px_#00FF00]">
        <h1 className="text-3xl text-center text-green-400 mb-6 flicker">
          REGISTER <span className="blink">|</span>
        </h1>

        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-green-400 text-sm">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-black border border-green-400 rounded px-3 py-2 text-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
            required
          />

          <label className="text-green-400 text-sm">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black border border-green-400 rounded px-3 py-2 text-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
            required
          />

          <label className="text-green-400 text-sm">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-black border border-green-400 rounded px-3 py-2 text-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
            required
          />

          <button
            type="submit"
            className="cursor-pointer mt-4 bg-black border border-green-400 text-green-400 px-4 py-2 rounded hover:shadow-[0_0_10px_#00FF00] transition-shadow duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
