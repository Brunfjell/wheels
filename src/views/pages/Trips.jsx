import { useState, useEffect } from "react";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase//initFirebase";
import TripRequestForm from "../trip/TripRequestForm";
import TripActiveMap from "../trip/TripActiveMap";
import OnTripControls from "../trip/OnTripControls";

export default function Trips({ currentUser }) {
  const [activeTripId, setActiveTripId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveTrip = async () => {
      try {
        if (!currentUser?.uid) return;

        const q = query(
          collection(db, "trips"),
          where("employeeId", "==", currentUser.uid),
          where("status", "==", "active")
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setActiveTripId(snapshot.docs[0].id);
        }
      } catch (err) {
        console.error("Error fetching active trip:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveTrip();
  }, [currentUser]);

  const handleStartTrip = (trip) => {
    setActiveTripId(trip.id);
  };

  const handleEndTrip = async () => {
    if (activeTripId) {
      try {
        await updateDoc(doc(db, "trips", activeTripId), {
          status: "completed",
          endTime: new Date()
        });
      } catch (err) {
        console.error("Error ending trip:", err);
      }
    }
    setActiveTripId(null);
  };

  if (loading) return <p>Loading trips...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Trips</h1>

      {!activeTripId ? (
        <TripRequestForm currentUser={currentUser} onStartTrip={handleStartTrip} />
      ) : (
        <div className="flex gap-4">
          <div className="w-2/3">
            <TripActiveMap tripId={activeTripId} />
          </div>
          <div className="w-1/3">
            <OnTripControls tripId={activeTripId} onEndTrip={handleEndTrip} />
          </div>
        </div>
      )}
    </div>
  );
}
