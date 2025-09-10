import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/initFirebase";
import { isOnline, queueUpdate, flushQueue } from "../../utils/offlineSync"; 

export default function OnTripControls({ tripId }) {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newExpense, setNewExpense] = useState("");
  const [newReport, setNewReport] = useState("");

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const snap = await getDoc(doc(db, "trips", tripId));
        if (snap.exists()) {
          setTrip({ id: snap.id, ...snap.data() });
        }
      } catch (err) {
        console.error("Error fetching trip:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();

    window.addEventListener("online", flushQueue);
    return () => window.removeEventListener("online", flushQueue);
  }, [tripId]);

  const updateTrip = async (updates) => {
    const ref = doc(db, "trips", tripId);
    const action = async () => {
      await updateDoc(ref, updates);
      setTrip((prev) => ({ ...prev, ...updates }));
    };

    if (isOnline()) {
      try {
        await action();
      } catch (err) {
        console.error("Firestore update failed, queuing:", err);
        queueUpdate(ref, updates);
      }
    } else {
      console.log("Offline, queuing update:", updates);
      queueUpdate(ref, updates);
      setTrip((prev) => ({ ...prev, ...updates })); // update UI immediately
    }
  };

  const handleEndTrip = () => {
    updateTrip({
      endTime: new Date(),
      status: "completed"
    });
  };

  const handleAddStop = (stop) => {
    updateTrip({
      stops: [...(trip.stops || []), stop]
    });
  };

  const handleAddExpense = () => {
    if (!newExpense.trim()) return;
    const expense = {
      desc: newExpense,
      amount: 0, 
      time: new Date()
    };
    updateTrip({
      expenses: [...(trip.expenses || []), expense]
    });
    setNewExpense("");
  };

  const handleSaveReport = () => {
    updateTrip({ report: newReport });
    setNewReport("");
  };

  if (loading) return <p>Loading trip...</p>;
  if (!trip) return <p>No trip found.</p>;

  return (
    <div className="p-4 space-y-4 shadow rounded-md bg-white">
      <h2 className="text-lg font-semibold">On-Trip Controls</h2>
      <p>Driver: {trip.driverId}</p>
      <p>Vehicle: {trip.vehicleId}</p>
      <p>Status: {trip.status}</p>

      <button
        onClick={handleEndTrip}
        className="bg-red-500 text-white px-3 py-2 rounded"
        disabled={trip.status === "completed"}
      >
        End Trip
      </button>

      <div>
        <h3 className="font-medium">Stops</h3>
        <ul>
          {(trip.stops || []).map((s, i) => (
            <li key={i}>{s.name || `Stop ${i + 1}`}</li>
          ))}
        </ul>
        <button
          onClick={() => handleAddStop({ name: "New Stop", time: new Date() })}
          className="bg-gray-200 px-3 py-1 rounded mt-2"
        >
          + Add Stop
        </button>
      </div>

      <div>
        <h3 className="font-medium">Expenses</h3>
        <ul>
          {(trip.expenses || []).map((e, i) => (
            <li key={i}>{e.desc} ({e.amount})</li>
          ))}
        </ul>
        <input
          type="text"
          value={newExpense}
          onChange={(e) => setNewExpense(e.target.value)}
          placeholder="e.g. Gas refill ₱500"
          className="border rounded px-2 py-1 mr-2"
        />
        <button
          onClick={handleAddExpense}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add Expense
        </button>
      </div>

      <div>
        <h3 className="font-medium">Report</h3>
        <textarea
          value={newReport}
          onChange={(e) => setNewReport(e.target.value)}
          placeholder="Enter report/notes..."
          className="border rounded w-full px-2 py-1"
        />
        <button
          onClick={handleSaveReport}
          className="bg-green-500 text-white px-3 py-1 rounded mt-2"
        >
          Save Report
        </button>
      </div>
    </div>
  );
}
