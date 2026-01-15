import { useState } from "react";
import { FaUtensils, FaBoxOpen, FaClock, FaCalendar } from "react-icons/fa6";
import { listingsAPI } from "../services/api";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const CreateListingPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    expiryDate: "",
    pickupTime: "",
  });

  const navigate = useNavigate();
  const { token } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const listingData = {
        title: formData.title,
        description: formData.description,
        quantity: parseInt(formData.quantity),
        expiryDate: formData.expiryDate,
        pickupTime: formData.pickupTime,
      };

      //api call
      await listingsAPI.create(listingData, token);

      navigate("/");
    } catch (err) {
      setError(err.message || "Error creating listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create New Listing
        </h1>
        <p className="text-gray-600 mb-8">
          Post your surplus food to help reduce waste
        </p>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaUtensils className="mr-2" />
                Food Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Fresh Baguettes"
                required
                minLength={3}
                maxLength={100}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Describe the food item..."
                required
                minLength={10}
                maxLength={500}
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaBoxOpen className="mr-2" />
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., 10"
                required
                min={1}
                max={1000}
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaCalendar className="mr-2" />
                Expiry Date & Time
              </label>
              <input
                type="datetime-local"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                When does this food expire?
              </p>
            </div>

            {/* Pickup Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaClock className="mr-2" />
                Pickup Time Window
              </label>
              <input
                type="text"
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., 18:00-19:30"
                required
                pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
              />
              <p className="text-sm text-gray-500 mt-1">
                Format: HH:MM-HH:MM (e.g., 14:00-16:00)
              </p>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create Listing"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateListingPage;
