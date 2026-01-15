import { FaPencil, FaPlus, FaTrash } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { listingsAPI } from "../services/api";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function MyListingsPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const data = await listingsAPI.getAll();

      const myListings = data.filter(
        (listing) => listing.business?.id === user.userId
      );

      setListings(myListings);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete your listing")) {
      try {
        await listingsAPI.delete(id, token);
        await fetchListings();
      } catch (err) {
        alert(err.message || "failed to delete listing");
      }
    }
  };
  const handleEdit = () => {};

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Listings</h1>
          <p className="text-gray-600">Manage your food surplus listings</p>
        </div>

        <button
          onClick={() => navigate("/create-listing")}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          <FaPlus />
          <span>Create New</span>
        </button>
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {!loading && !error && listings.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No listings yet
          </h2>
          <p className="text-gray-600 mb-6">
            Create your first listing to start reducing food waste!
          </p>
          <button
            onClick={() => navigate("/create-listing")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Create Your First Listing
          </button>
        </div>
      )}

      {!loading && !error && listings.length > 0 && (
        <div>
          <p className="text-gray-600 mb-6">
            You have {listings.length} listing{listings.length !== 1 ? "s" : ""}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {listing.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {listing.description}
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      listing.status === "AVAILABLE"
                        ? "bg-green-100 text-green-800"
                        : listing.status === "RESERVED"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {listing.status}
                  </span>
                  <span className="text-gray-500 text-sm">
                    Qty: {listing.quantity}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(listing.id)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <FaPencil />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDelete(listing.id)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <FaTrash />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyListingsPage;
