import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/initFirebase";
import { isOnline, queueUpdate } from "../../utils/offlineSync";

const startIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/25/25694.png",
  iconSize: [32, 32]
});

const destIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32]
});

const stopIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [20, 20]
});

export default function TripActiveMap({ tripId }) {
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const snap = await getDoc(doc(db, "trips", tripId));
        if (snap.exists()) setTrip({ id: snap.id, ...snap.data() });
      } catch (err) {
        console.error("Error fetching trip:", err);
      }
    };
    fetchTrip();
  }, [tripId]);

  const updateTrip = async (updates) => {
    const ref = doc(db, "trips", tripId);
    if (isOnline()) {
      try {
        await updateDoc(ref, updates);
        setTrip((prev) => ({ ...prev, ...updates }));
      } catch (err) {
        console.error("Failed to update trip:", err);
        queueUpdate(ref, updates);
      }
    } else {
      queueUpdate(ref, updates);
      setTrip((prev) => ({ ...prev, ...updates }));
    }
  };

  const handleMarkerDrag = async (index, e) => {
    const { lat, lng } = e.target.getLatLng();
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await res.json();
      const name = data.display_name || `Lat: ${lat}, Lng: ${lng}`;
      const newDestinations = trip.destinations.map((d, i) =>
        i === index ? { ...d, lat, lng, name } : d
      );
      updateTrip({ destinations: newDestinations });
    } catch (err) {
      console.error("Reverse geocode failed:", err);
    }
  };

  if (!trip) return <p>Loading map...</p>;

  const positions = trip.destinations.map((d) => [d.lat, d.lng]);

  return (
    <MapContainer
      center={positions[0] || [14.5995, 120.9842]}
      zoom={13}
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      {trip.destinations.length > 0 && (
        <Marker
          position={[trip.destinations[0].lat, trip.destinations[0].lng]}
          icon={startIcon}
        >
          <Popup>Start Point</Popup>
        </Marker>
      )}

      {trip.destinations.slice(1).map((d, i) => (
        <Marker
          key={i}
          position={[d.lat, d.lng]}
          draggable={true}
          icon={destIcon}
          eventHandlers={{
            dragend: (e) => handleMarkerDrag(i + 1, e)
          }}
        >
          <Popup>{d.name || `Destination ${i + 1}`}</Popup>
        </Marker>
      ))}

      {(trip.stops || []).map((s, i) => (
        <Marker
          key={`stop-${i}`}
          position={[s.lat, s.lng]}
          icon={stopIcon}
        >
          <Popup>{s.name || `Stop ${i + 1}`}</Popup>
        </Marker>
      ))}

      {positions.length > 1 && (
        <Polyline positions={positions} color="blue" />
      )}
    </MapContainer>
  );
}
