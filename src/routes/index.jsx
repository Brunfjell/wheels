import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useAuthStore from "../models/store/authStore";
import { canAccess } from "../utils/auth";

import MainLayout from "../views/layouts/MainLayout";
import LandingLayout from "../views/layouts/LandingLayout";

import Landing from "../views/pages/Landing";
import Login from "../views/pages/Login";
import Dashboard from "../views/pages/Dashboard";
import Vehicles from "../views/pages/Vehicles";
import Drivers from "../views/pages/Drivers";
import Employees from "../views/pages/Employees";
import Schedules from "../views/pages/Schedules";
import Expenses from "../views/pages/Expenses";
import Trips from "../views/pages/Trips";

function ProtectedRoute({ children, module }) {
  const { user, loading } = useAuthStore();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  if (module && !canAccess(module)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<LandingLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute module="dashboard">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vehicles"
          element={
            <ProtectedRoute module="vehicles">
              <Vehicles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/drivers"
          element={
            <ProtectedRoute module="drivers">
              <Drivers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute module="employees">
              <Employees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedules"
          element={
            <ProtectedRoute module="schedules">
              <Schedules />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expenses"
          element={
            <ProtectedRoute module="expenses">
              <Expenses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trips"
          element={
            <ProtectedRoute module="trip">
              <Trips />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
