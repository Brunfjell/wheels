import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import TripMap from "./TripMap";
import { addTrip } from "../../models/api/tripApi";
import { getDrivers } from "../../models/api/driverApi";
import { getVehicles } from "../../models/api/vehicleApi";

export default function TripRequestForm({ currentUser, onStartTrip }) {
  const [step, setStep] = useState(1);
  const [destinations, setDestinations] = useState([]);
  const [center, setCenter] = useState([14.5995, 120.9842]);
  const [loading, setLoading] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [driverId, setDriverId] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [currentUid, setCurrentUid] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUid(user.uid);
        console.log(user)
      } else {
        setCurrentUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setCenter([pos.coords.latitude, pos.coords.longitude]),
      () => console.warn("Could not get location, using default.")
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [driversData, vehiclesData] = await Promise.all([
          getDrivers(),
          getVehicles()
        ]);
        console.log("Drivers fetched:", driversData);
        console.log("Vehicles fetched:", vehiclesData);
        setDrivers(driversData);
        setVehicles(vehiclesData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleAddDestination = (dest) =>
    setDestinations((prev) => [...prev, dest]);

  const handleMarkerDrag = async (index, lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await res.json();
      const placeName = data.display_name || `Lat: ${lat}, Lng: ${lng}`;

      setDestinations((prev) =>
        prev.map((d, i) =>
          i === index ? { ...d, lat, lng, name: placeName } : d
        )
      );
    } catch (err) {
      console.error("Reverse geocode failed:", err);
    }
  };

  const handleDeleteDestination = (index) =>
    setDestinations((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!destinations.length || !driverId || !vehicleId || !currentUid) return;

    setLoading(true);

    try {
      const newTrip = {
        employeeId: currentUid,
        driverId,
        vehicleId,
        startTime: new Date(),
        endTime: null,
        status: "active",
        destinations,
        destination: destinations[destinations.length - 1],
        stops: [],
        expenses: [],
        report: "",
      };

      const savedTrip = await addTrip(newTrip);
      console.log("Trip started:", savedTrip);

      if (onStartTrip) {
        onStartTrip({ id: savedTrip.id, ...newTrip });
      }

      setDestinations([]);
      setDriverId("");
      setVehicleId("");
      setStep(1);

    } catch (err) {
      console.error("Error starting trip:", err);
      alert("Failed to start trip.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4">
      {step === 1 && (
        <>
          <TripMap
            center={center}
            destinations={destinations}
            onAddDestination={handleAddDestination}
            onMarkerDrag={handleMarkerDrag}
          />

          <div className="shadow p-4 rounded-md space-y-4 w-1/3">
            <h2 className="text-lg font-semibold">Destinations</h2>

            {destinations.map((d, i) => (
              <div
                key={i}
                className="text-sm border-b pb-2 mb-2 flex justify-between items-start"
              >
                <div>
                  <strong>
                    {i === 0
                      ? "Start Point"
                      : `Destination ${String.fromCharCode(64 + i)}`}
                  </strong>
                  <p>{d.name}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteDestination(i)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              onClick={() => setStep(2)}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={!destinations.length}
            >
              Next: Select Driver & Vehicle →
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <form
          onSubmit={handleSubmit}
          className="shadow p-4 rounded-md space-y-4 w-full"
        >
          <h2 className="text-lg font-semibold">Assign Driver & Vehicle</h2>

          <div>
            <label className="block text-sm font-medium">Driver</label>
            <select
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
              className="mt-1 w-full border px-3 py-2 rounded-md"
              required
            >
              <option value="">-- Select Driver --</option>
              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.name || "Unknown"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Vehicle</label>
            <select
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className="mt-1 w-full border px-3 py-2 rounded-md"
              required
            >
              <option value="">-- Select Vehicle --</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.type} - {vehicle.plate} ({vehicle.status})
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              ← Back
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={!driverId || !vehicleId || loading}
            >
              {loading ? "Starting..." : "Start Trip"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}