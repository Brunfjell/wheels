import { db } from "../../firebase";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

const scheduleRef = collection(db, "schedules");

export const getSchedules = async () => {
  const snapshot = await getDocs(scheduleRef);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addSchedule = async (schedule) => {
  const docRef = await addDoc(scheduleRef, schedule);
  return { id: docRef.id, ...schedule };
};

export const updateSchedule = async (id, data) => {
  await updateDoc(doc(db, "schedules", id), data);
};

export const deleteSchedule = async (id) => {
  await deleteDoc(doc(db, "schedules", id));
};
