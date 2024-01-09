import React, { useState } from "react";
import Map from "./components/Map";
import SideList from "./components/SideList";
import MarkerDetails from "./components/MarkerDetails";
import MarkerForm from "./components/MarkerForm";
import "./index.css";
import "isomorphic-fetch";

const initialValue = [
  {
    id: 1,
    geocode: [48.3794, 31.1656],
    title: "Card 1",
    description: "Description 1",
    imageUrl:
      "https://cdn.pixabay.com/photo/2022/03/04/18/01/ukraine-7047830_1280.jpg",
  },
  {
    id: 2,
    geocode: [48.3794, 32.4656],
    title: "Card 2",
    description: "Description 2",
    imageUrl:
      "https://cdn.pixabay.com/photo/2022/03/04/18/01/ukraine-7047830_1280.jpg",
  },
  {
    id: 3,
    geocode: [48.855, 33.99],
    title: "Card 3",
    description: "Description 3",
    imageUrl:
      "https://cdn.pixabay.com/photo/2022/03/04/18/01/ukraine-7047830_1280.jpg",
  },
];

function App() {
  const [markers, setMarkers] = useState(initialValue);
  const [visible, setVisible] = useState(initialValue);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isForm, setIsForm] = useState(false);

  const handleGeocoding = (address) => {
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`;
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          // Отримали координати
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          return { latitude: lat, longitude: lon };
        } else {
          throw new Error("Не вдалося отримати географічні координати");
        }
      });
  };

  const addOneMore = async (formData) => {
    if (formData) {
      try {
        const coordinates = await handleGeocoding(formData.address);
        const newMarker = {
          id: Date.now().toString(),
          geocode: [coordinates.latitude, coordinates.longitude],
          title: formData.title,
          description: formData.description,
          imageUrl: formData.imageUrl,
        };

        setMarkers([...markers, newMarker]);
        setIsForm(false);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  return (
    <div className="App p-4 bg-gray-100 min-h-screen flex flex-col">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4 self-center"
        onClick={() => {
          setIsForm(true);
        }}
      >
        ADD ONE MORE MARKER
      </button>
      <div className="flex flex-grow">
        <Map
          setMarkers={setMarkers}
          markers={markers}
          handleMarkerClick={handleMarkerClick}
          setVisible={setVisible}
        />
        <div className="ml-4 flex-grow">
          {isForm ? (
            <MarkerForm
              onAddMarker={addOneMore}
              setIsForm={() => setIsForm(false)}
            />
          ) : null}

          {selectedMarker ? (
            <MarkerDetails
              setSelectedMarker={setSelectedMarker}
              marker={selectedMarker}
            />
          ) : (
            <SideList visible={visible} handleMarkerClick={handleMarkerClick} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
