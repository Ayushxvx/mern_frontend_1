import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Context object
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [username, setUsername] = useState("");
  const [searchq, setSearchq] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function updateAuth() {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decoded = jwtDecode(token);
      const valid = decoded.exp * 1000 > Date.now();

      if (valid) {
        setIsLoggedIn(true);
        try {
          const response = await axios.get(
            "https://mern-backend-1-szl8.onrender.com/api/auth/me",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          setUsername(response.data.username);
        } catch (error) {
          setUsername(error.message);
        }
      } else {
        setIsLoggedIn(false);
      }
    }
  }

  function setSearchquery(query) {
    setSearchq(query);
  }

  function removeSearchquery() {
    setSearchq("");
  }

  useEffect(() => {
    updateAuth();
  }, []);

  function login(token) {
    localStorage.setItem("access_token", token);
    updateAuth();
  }

  function logout() {
    localStorage.clear();
    setIsLoggedIn(false);
    setUsername("");
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        username,
        searchq,
        setSearchquery,
        removeSearchquery,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
