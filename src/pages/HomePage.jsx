import { useEffect, useState } from "react";
import textLogo from "../assets/tfl-text.png";
import { listingsAPI } from "../services/api";
import ListingCard from "../components/ListingCard";

const HomePage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const data = await listingsAPI.getAll();
      setListings(data);
      setError(null);
    } catch (err) {
      setError("Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12">
        <img
          src={textLogo}
          alt="Terra Food Loop"
          className="h-12 md:h-14 mb-3"
        />

        <h2 className="text-xl md:text-2xl text-gray-800 font-semibold mb-1">
          Transform surplus into sustenance.{" "}
          <span className="text-green-700">Save food.</span>{" "}
          <span className="text-orange-600">Feed people.</span>
        </h2>

        <p className="text-base md:text-lg text-gray-600">
          Every meal shared is a step towards a more sustainable and caring
          community
        </p>
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

      {!loading && !error && (
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Available Listings ({listings.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
