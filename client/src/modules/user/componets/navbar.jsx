import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

function Navbar() {
  const { isLoggedIn, loading } = useContext(AuthContext);
  // const [isUser, setIsUser] = useState(false);
  if (loading) {
    return null;
  }

  return (
    <nav class="bg-white shadow-md sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" class="text-2xl font-bold text-blue-600">
          TravelGo
        </a>

        <NavBarElements />
        {!isLoggedIn ? (
          <div class="flex gap-4">
            <a
              href="/login"
              class="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white"
            >
              Login
            </a>
            <a
              href="/signup"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Signup
            </a>
          </div>
        ) : (
          <div class="flex items-center gap-4">
            <a
              href="/account"
              class="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white"
            >
              Account
            </a>
            <a
              href="/logout"
              class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavBarElements() {
  return (
    <ul class="hidden md:flex gap-8 text-gray-700 font-medium">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/places">Places</NavLink>
      </li>
      <li>
        <NavLink to="/hotels" class="hover:text-blue-600">
          Hotels
        </NavLink>
      </li>
      {/* <li><a href="/Package" class="hover:text-blue-600">Package</a></li> */}
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </ul>
  );
}

export default Navbar;
