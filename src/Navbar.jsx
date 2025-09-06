import { List } from "@phosphor-icons/react";
import { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function Navbar() {
  const [showDiv, setShowDiv] = useState(false);
  const [query,setQuery] = useState("");
  const {isLoggedIn,username,logout} = useContext(AuthContext);
  function toggleDiv() {
    setShowDiv(!showDiv);
  }
  const navigate = useNavigate();

  function searchPosts(){
    navigate(`/search/${encodeURIComponent(query)}`);
    setQuery("");
  }

  return (
    <div>
      <nav className="flex justify-evenly bg-gray-800 text-white items-center p-2">
        <span>
          <Link to="/">
            <img src="/map_the_net.jpg" alt="Logo" className="w-12 rounded-md" />
          </Link>
        </span>
        <span>
          <input
            onChange={(e)=>setQuery(e.target.value)}
            value={query}
            type="text"
            name="title"
            placeholder="Search..."
            className="border-solid border-2 border-gray-500 px-2 text-right rounded-lg"
          />
          <button className="p-2 m-2 bg-green-500 text-white rounded-lg cursor-pointer hover:opacity-80" onClick={searchPosts}>
            Search
          </button>
        </span>
        <span>
          <List size={32} className="cursor-pointer" onClick={toggleDiv} />
        </span>
      </nav>

      {showDiv && (
        <div className="bg-gray-900 p-2 rounded-lg">
          {isLoggedIn ? (
            <>
              <div className="cursor-pointer text-center text-white p-2 mb-2">
                Logged in as: <strong>{username}</strong>
              </div>
              <div className="cursor-pointer text-center hover:underline cursor-pointer text-white p-2 m-2 underline-cyan-400">
                <Link to="/add-post">Add Post</Link>
              </div>
              <div className="cursor-pointer text-center hover:underline cursor-pointer text-white p-2 m-2 underline-cyan-400">
                <Link to="/profile">Profile</Link>
              </div>
              <div
                className="cursor-pointer text-center hover:underline cursor-pointer text-white p-2 m-2 underline-cyan-400"
                onClick={()=>{
                  logout();
                  navigate("/")
                }}
              >
                Logout
              </div>
            </>
          ) : (
            <>
              <div className="cursor-pointer text-center hover:underline cursor-pointer text-white p-2 underline-cyan-400">
                <Link to="/login">Login</Link>
              </div>
              <div className="cursor-pointer text-center hover:underline cursor-pointer text-white m-2 underline-cyan-400">
                <Link to="/register">Register</Link>
              </div>
            </>
          )}
              {   /*<div className="cursor-pointer text-center hover:underline cursor-pointer text-white m-2 underline-cyan-400">
                <a href="https://ayushxvxportfolio.netlify.app" target="_blank">About Me </a>
              </div>*/}
        </div>
      )}
    </div>
  );
}
