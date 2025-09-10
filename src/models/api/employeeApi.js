import { db } from "../../firebase/initFirebase";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

const employeeRef = collection(db, "employees");

export const getEmployees = async () => {
  const snapshot = await getDocs(employeeRef);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addEmployee = async (employee) => {
  const docRef = await addDoc(employeeRef, employee);
  return { id: docRef.id, ...employee };
};

export const updateEmployee = async (id, data) => {
  await updateDoc(doc(db, "employees", id), data);
};

export const deleteEmployee = async (id) => {
  await deleteDoc(doc(db, "employees", id));
};
