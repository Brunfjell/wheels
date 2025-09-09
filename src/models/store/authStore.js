import { create } from "zustand";
import { auth, db } from "../../firebase/initFirebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const useAuthStore = create((set, get) => ({
  user: null,
  role: null,
  loading: true,

  login: async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const role = userDoc.exists() ? userDoc.data().role : null;

      set({ user, role, loading: false });
      return { success: true, role };
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, error: err.message };
    }
  },

  logout: async () => {
    await signOut(auth);
    set({ user: null, role: null });
  },

  initAuth: () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const role = userDoc.exists() ? userDoc.data().role : null;
        set({ user, role, loading: false });
      } else {
        set({ user: null, role: null, loading: false });
      }
    });
  },

  hasAccess: (module) => {
    const role = get().role;
    if (!role) return false;

    const accessMatrix = {
      admin: ["dashboard", "vehicles", "drivers", "employees", "schedules", "expenses", "analytics"],
      employee: ["dashboard", "schedules", "expenses", "trip"],
      driver: ["dashboard", "schedules", "expenses", "trip"],
    };

    return accessMatrix[role]?.includes(module) || false;
  },
}));

export default useAuthStore;
