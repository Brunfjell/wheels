import { db } from "../../firebase";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

const driverRef = collection(db, "drivers");

export const getDrivers = async () => {
  const snapshot = await getDocs(driverRef);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addDriver = async (driver) => {
  const docRef = await addDoc(driverRef, driver);
  return { id: docRef.id, ...driver };
};

export const updateDriver = async (id, data) => {
  await updateDoc(doc(db, "drivers", id), data);
};

export const deleteDriver = async (id) => {
  await deleteDoc(doc(db, "drivers", id));
};
