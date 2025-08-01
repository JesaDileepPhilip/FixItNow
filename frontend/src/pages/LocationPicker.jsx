import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LocationMarker = ({ position, setPosition, setAddress }) => {
  useMapEvents({
    dragend: () => {
      // Do nothing
    },
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      getAddressFromCoords(lat, lng, setAddress);
    },
  });

  return <Marker draggable position={position} eventHandlers={{
    dragend: (e) => {
      const latLng = e.target.getLatLng();
      setPosition([latLng.lat, latLng.lng]);
      getAddressFromCoords(latLng.lat, latLng.lng, setAddress);
    }
  }} />;
};

const getAddressFromCoords = async (lat, lng, setAddress) => {
  const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`
  );
  const data = await response.json();
  if (data.results.length > 0) {
    setAddress(data.results[0].formatted);
  } else {
    setAddress("Address not found");
  }
};

const LocationPicker = ({ formData, setFormData }) => {
  const [position, setPosition] = useState([10.0088, 76.3616]); // Default to Ernakulam
  const [address, setAddress] = useState("Fetching location...");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        getAddressFromCoords(latitude, longitude, setAddress);
      },
      (err) => {
        console.warn("Error getting location", err);
        setAddress("Unable to fetch location. Using default.");
      },
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      latitude: position[0],
      longitude: position[1],
      location : address,
    }));
  }, [position, address, setFormData]);

  return (
    <div>
      <h2>Your Location:</h2>
      <p><strong>Address:</strong> {address}</p>
      <MapContainer
        center={position}
        zoom={16}
        scrollWheelZoom={true}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} setAddress={setAddress} />
      </MapContainer>
    </div>
  );
};

export default LocationPicker;
