import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const responce = await fetch("http://localhost:3000/api/v1/me", {
          credentials: "include",
        });
        if (responce.ok) {
          const data = await responce.json();

          setIsLoggedIn(true);
          setUser(data.user);
        } else {
          setIsLoggedIn(false);
        }
      } catch {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
