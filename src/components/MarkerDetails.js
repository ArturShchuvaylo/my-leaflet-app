import React from "react";
const MarkerDetails = ({ marker, setSelectedMarker }) => {
  return (
    <div className="marker-details-container bg-white p-4 mb-4 h-full rounded">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{marker.title}</h2>
        <button
          className="text-red-500"
          onClick={() => setSelectedMarker(null)}
        >
          X
        </button>
      </div>

      <div className="mb-4">
        <img
          src={marker.imageUrl}
          alt={marker.title}
          className="rounded w-full h-40 object-cover mb-2"
        />
        <div>
          <p className="text-gray-600">{marker.description}</p>
        </div>
      </div>
    </div>
  );
};

export default MarkerDetails;
