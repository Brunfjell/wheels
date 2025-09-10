import { db } from "../../firebase/initFirebase";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

const vehicleRef = collection(db, "vehicles");

export const getVehicles = async () => {
  const snapshot = await getDocs(vehicleRef);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addVehicle = async (vehicle) => {
  const docRef = await addDoc(vehicleRef, vehicle);
  return { id: docRef.id, ...vehicle };
};

export const updateVehicle = async (id, data) => {
  await updateDoc(doc(db, "vehicles", id), data);
};

export const deleteVehicle = async (id) => {
  await deleteDoc(doc(db, "vehicles", id));
};
