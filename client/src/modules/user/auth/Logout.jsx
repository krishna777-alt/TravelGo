import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function Logout() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/logout", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          setIsLoggedIn(false);
          navigate("/");
        } else {
          console.error("Logout failed");
          // Still set to false and navigate
          setIsLoggedIn(false);
          navigate("/");
        }
      } catch (error) {
        console.error("Logout error:", error);
        setIsLoggedIn(false);
        navigate("/");
      }
    };
    logoutUser();
  }, []);
}

export default Logout;
