import { db } from "../../firebase";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

const expenseRef = collection(db, "expenses");

export const getExpenses = async () => {
  const snapshot = await getDocs(expenseRef);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addExpense = async (expense) => {
  const docRef = await addDoc(expenseRef, expense);
  return { id: docRef.id, ...expense };
};

export const updateExpense = async (id, data) => {
  await updateDoc(doc(db, "expenses", id), data);
};

export const deleteExpense = async (id) => {
  await deleteDoc(doc(db, "expenses", id));
};
