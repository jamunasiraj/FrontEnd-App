import {
  FaRightToBracket,
  FaUserPlus,
  FaRightFromBracket,
  FaPlus,
  FaListCheck,
  FaUser,
} from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/tfl-logo.png";
import textLogo from "../assets/tfl-text.png";
import useAuth from "../hooks/useAuth";

const NavBar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { logout, isAuthenticated, isBusiness, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <img src={logo} alt="Terra Food Loop" className="h-12 w-auto" />
            {/* Show text logo only when NOT on home page */}
            {!isHomePage && (
              <img
                src={textLogo}
                alt="Terra Food Loop"
                className="h-6 hidden sm:block"
              />
            )}
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-green-700 font-medium"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="text-gray-700 hover:text-green-700 font-medium"
            >
              <span>About</span>
            </Link>

            {/* Show if NOT logged in */}
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-700"
                >
                  <FaRightToBracket />
                  <span>Login</span>
                </Link>

                <Link
                  to="/register"
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <FaUserPlus />
                  <span>Register</span>
                </Link>
              </>
            )}

            {/* Show if logged in */}
            {isAuthenticated && (
              <>
                {/* Business users only */}
                {isBusiness && (
                  <>
                    <Link
                      to="/my-listings"
                      className="flex items-center space-x-2 text-gray-700 hover:text-green-700"
                    >
                      <FaListCheck />
                      <span className="hidden md:inline">My Listings</span>
                    </Link>

                    <Link
                      to="/create-listing"
                      className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <FaPlus />
                      <span className="hidden md:inline">Create</span>
                    </Link>
                  </>
                )}

                {/* User info and logout */}
                <div className="flex items-center space-x-4 border-l pl-4 ml-4">
                  <FaUser />
                  <span className="text-gray-700 hidden md:inline">
                    {user.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
                  >
                    <FaRightFromBracket />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
