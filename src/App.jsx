import Navbar from "./NavBar"
import RetroPosts from "./AllPosts"
import RetroLogin from "./login";
import RetroRegister from "./register";
import {Routes,Route} from "react-router-dom";
import {AuthProvider} from "./AuthContext";
import AddPost from "./AddPost";
import Profile from "./Profile";
import SearchPosts from "./SearchPosts";

export default function App(){
  return(
    <>
    <AuthProvider>
      <Navbar />
      <Routes>
    <Route path="/" element={<RetroPosts />} />
    <Route path="/login" element={<RetroLogin />} />
    <Route path="/register" element={<RetroRegister />} />
    <Route path="/add-post" element={<AddPost />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/search/:query" element={<SearchPosts />} />
      </Routes>
    </AuthProvider>
    </>
  )
}