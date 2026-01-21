import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/dashboard/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Programs from "./pages/dashboard/Programs";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoutes";
import DashboardLayout from "./layouts/DashboardLayout";
import Workouts from "./pages/dashboard/Workouts";
import Progress from "./pages/dashboard/Progress";
import Diet from "./pages/dashboard/Diet";
import AICoach from "./pages/dashboard/AICoach";

/* ADMIN */
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminUserDetails from "./pages/admin/AdminUserDetails";
import AdminWorkouts from "./pages/admin/AdminWorkouts";
import AdminProgress from "./pages/admin/AdminProgress";
import AdminDiets from "./pages/admin/AdminDiets";
import AdminAI from "./pages/admin/AdminAI";

function App() {
  return (
    <Routes>

      {/* 🌐 PUBLIC */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 🔐 USER DASHBOARD */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/diet" element={<Diet />} />
        <Route path="/ai" element={<AICoach />} />
      </Route>

      {/* 🛡️ ADMIN */}
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

export default App;