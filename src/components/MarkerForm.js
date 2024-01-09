import React, { useState } from "react";

const MarkerForm = ({ onAddMarker, setIsForm }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.description ||
      !formData.address ||
      !formData.imageUrl
    ) {
      alert("Будь ласка, заповніть всі поля форми.");
      return;
    }
    onAddMarker(formData);
    setFormData({
      title: "",
      description: "",
      address: "",
      imageUrl: "",
    });
  };

  return (
    <div className="marker-form bg-white p-6 mb-6 rounded shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Add New Marker</h2>
        <button className="text-red-500" onClick={setIsForm}>
          X
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Address:
          </label>
          <input
            className="w-full border p-2 rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Title:
          </label>
          <input
            className="w-full border p-2 rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Description:
          </label>
          <textarea
            className="w-full border p-2 rounded-md focus:outline-none focus:border-blue-500"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Image URL:
          </label>
          <input
            className="w-full border p-2 rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          type="submit"
        >
          Add Marker
        </button>
      </form>
    </div>
  );
};

export default MarkerForm;
