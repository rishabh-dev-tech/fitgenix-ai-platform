import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import ProtectedRoute from "./ProtectedRoutes";
import AdminRoute from "./AdminRoute";

import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/authForgotPassword";
import Dashboard from "../pages/dashboard/Dashboard";

/* ADMIN PAGES */
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminUserDetails from "../pages/admin/AdminUserDetails";
import AdminWorkouts from "../pages/admin/AdminWorkouts";
import AdminProgress from "../pages/admin/AdminProgress";
import AdminDiets from "../pages/admin/AdminDiets";
import AdminAI from "../pages/admin/AdminAI";

export default function AppRoutes() {
  return (
    <Routes>

      {/* 🌐 PUBLIC WEBSITE */}
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* 🔐 USER DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* 🛡️ ADMIN PANEL */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <AdminUsers />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/users/:id"
        element={
          <AdminRoute>
            <AdminUserDetails />
          </AdminRoute>
        }
      />

      {/* 📊 ADMIN DATA */}
      <Route
        path="/admin/workouts"
        element={
          <AdminRoute>
            <AdminWorkouts />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/progress"
        element={
          <AdminRoute>
            <AdminProgress />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/diets"
        element={
          <AdminRoute>
            <AdminDiets />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/ai"
        element={
          <AdminRoute>
            <AdminAI />
          </AdminRoute>
        }
      />

    </Routes>
  );
}