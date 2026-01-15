import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children, requireBusiness = false }) => {
  const { isAuthenticated, isBusiness } = useAuth();

  // Not logged in? Redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not business (when business required)
  if (requireBusiness && !isBusiness) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <div className="text-6xl mb-4">🚫</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Access Denied
            </h2>
            <p className="text-gray-600 mb-6">
              Only business users can access this page.
            </p>
            <a
              href="/"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Go to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  // All checks passed - show the page
  return children;
};

export default ProtectedRoute;
