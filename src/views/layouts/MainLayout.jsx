import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-base-200">
      <aside className="w-64 bg-base-300 shadow-lg hidden md:block">
        <Sidebar />
      </aside>

      <div className="flex flex-col flex-1">
        <Navbar />

        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
