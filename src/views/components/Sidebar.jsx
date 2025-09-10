import { NavLink } from "react-router-dom";
import useAuthStore from "../../models/store/authStore";

export default function Sidebar() {
  const { role } = useAuthStore();

  const links = {
    admin: [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/vehicles", label: "Vehicles" },
      { to: "/drivers", label: "Drivers" },
      { to: "/employees", label: "Employees" },
      { to: "/schedules", label: "Schedules" },
      { to: "/expenses", label: "Expenses" },
    ],
    employee: [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/schedules", label: "Schedules" },
      { to: "/expenses", label: "Expenses" },
      { to: "/trips", label: "Trips" },
    ],
    driver: [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/schedules", label: "Schedules" },
      { to: "/expenses", label: "Expenses" },
      { to: "/trips", label: "Trips" },
    ],
  };

  return (
    <nav className="flex flex-col p-4 space-y-2">
      {(links[role] || []).map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `block px-3 py-2 rounded-md font-bold transition ${
              isActive
                ? "text-white bg-blue-600"
                : "hover:text-gray-700 hover:bg-blue-100"
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
