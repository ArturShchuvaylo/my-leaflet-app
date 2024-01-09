import React from "react";

const SideList = ({ visible, handleMarkerClick }) => {
  return visible.map((card) => (
    <div
      key={card.id}
      className="bg-white gap-10 flex mb-4 p-4 rounded cursor-pointer hover:shadow-md"
      onClick={() => handleMarkerClick(card)}
    >
      <div className="w-24 h-24 mb-2 rounded overflow-hidden">
        <img
          src={card.imageUrl}
          alt={card.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1">{card.title}</h3>
        <p className="text-sm text-gray-600">{card.description}</p>
      </div>
    </div>
  ));
};

export default SideList;
