import { FaMapLocationDot } from "react-icons/fa6";

const ListingCard = ({ listing }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {listing.title}
      </h3>

      <p className="text-gray-600 mb-4 line-clamp-2">{listing.description}</p>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          {listing.status}
        </span>
        <span className="text-gray-500 text-sm">Qty: {listing.quantity}</span>
      </div>

      {listing.business && (
        <div className="flex items-center gap-1 mt-3 text-sm text-gray-500">
          <FaMapLocationDot /> {listing.business.businessName}
        </div>
      )}
    </div>
  );
};

export default ListingCard;
