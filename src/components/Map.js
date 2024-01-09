import React, { useEffect, useCallback, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L, { Icon } from "leaflet";

import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";

const customIcon = new Icon({
  iconUrl:
    "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-1024.png",
  iconSize: [45, 45],
});

const Map = ({ markers, handleMarkerClick, setVisible, setMarkers }) => {
  const [map, setMap] = useState(null);

  const handleMapMove = useCallback(() => {
    const bounds = map.getBounds();
    const adsInBounds = markers.filter((ad) => {
      const adLatLng = L.latLng(ad.geocode[0], ad.geocode[1]);
      return bounds.contains(adLatLng);
    });
    setVisible(adsInBounds);
  }, [map, markers, setVisible]);

  useEffect(() => {
    if (map) {
      map.on("moveend", handleMapMove);
    }
    return () => {
      if (map) {
        map.off("moveend", handleMapMove);
      }
    };
  }, [map, handleMapMove, markers]);

  return (
    <MapContainer
      ref={setMap}
      className="map-container h-screen w-2/3"
      center={[48.3794, 31.1656]}
      zoom={6}
      minZoom={5}
      maxZoom={10}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        {markers.map((elem) => {
          return (
            <Marker
              key={elem.id}
              eventHandlers={{
                click: () => handleMarkerClick(elem),
              }}
              position={elem.geocode}
              icon={customIcon}
            >
              {/* <Popup>{elem.popUp}</Popup> */}
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Map;
