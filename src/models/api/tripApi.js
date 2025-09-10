import { db } from "../../firebase/initFirebase";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

const tripRef = collection(db, "trips");

export const getTrips = async () => {
  const snapshot = await getDocs(tripRef);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addTrip = async (trip) => {
  const docRef = await addDoc(tripRef, trip);
  return { id: docRef.id, ...trip };
};

export const updateTrip = async (id, data) => {
  await updateDoc(doc(db, "trips", id), data);
};

export const deleteTrip = async (id) => {
  await deleteDoc(doc(db, "trips", id));
};
