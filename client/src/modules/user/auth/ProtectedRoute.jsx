import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useContext(AuthContext);

  if (loading) return null;
  if (isLoggedIn === false) return <Navigate to={"/login"} />;

  return children;
}

export default ProtectedRoute;
