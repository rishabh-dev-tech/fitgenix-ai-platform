import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getUserDetails,
  toggleUserRole,
  toggleUserStatus,
  resetUserProgram,
  deleteUser
} from "../../api/adminApi";
import "../../styles/dashboardLayout.css";

export default function AdminUserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");

  useEffect(() => {
    loadUser();
  }, [id]);

  const loadUser = async () => {
    try {
      const res = await getUserDetails(id);
      setData(res.data.data);
    } catch {
      alert("Failed to load user");
    } finally {
      setLoading(false);
    }
  };

  const confirm = (msg) => window.confirm(msg);

  /* 🔥 ADMIN ACTIONS */

  const changeRole = async () => {
    if (!confirm("Change this user's role?")) return;

    try {
      setActionLoading("role");
      await toggleUserRole(id);
      await loadUser();
    } catch {
      alert("Failed to change role");
    } finally {
      setActionLoading("");
    }
  };

  const changeStatus = async () => {
    if (!confirm("Enable / disable this user?")) return;

    try {
      setActionLoading("status");
      await toggleUserStatus(id);
      await loadUser();
    } catch {
      alert("Failed to update status");
    } finally {
      setActionLoading("");
    }
  };

  const resetProgram = async () => {
    if (!confirm("Reset this user's active program?")) return;

    try {
      setActionLoading("program");
      await resetUserProgram(id);
      await loadUser();
    } catch {
      alert("Failed to reset program");
    } finally {
      setActionLoading("");
    }
  };

  const removeUser = async () => {
    if (!confirm("⚠️ This will permanently delete this user and all their data.")) return;

    try {
      setActionLoading("delete");
      await deleteUser(id);
      navigate("/admin/users");
    } catch {
      alert("Failed to delete user");
      setActionLoading("");
    }
  };

  if (loading) return <p className="dash-muted">Loading user profile...</p>;
  if (!data) return <p className="dash-muted">User not found.</p>;

  const { user, workouts, progress, diets, ai } = data;

  return (
    <div className="dashboard-page">

      {/* HEADER */}
      <div className="dash-header">
        <h1>{user.name}</h1>
        <p>{user.email}</p>
        <span className="dash-muted">
          Role: <strong>{user.role.toUpperCase()}</strong>
        </span>
      </div>

      {/* ADMIN ACTIONS */}
      <div className="dash-card glow" style={{ marginBottom: 24 }}>
        <h3>🛡 Admin Actions</h3>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>

          <button
            className="btn-outline"
            onClick={changeRole}
            disabled={actionLoading}
          >
            {actionLoading === "role" ? "Updating..." : "Promote / Demote"}
          </button>

          <button
            className="btn-outline"
            onClick={changeStatus}
            disabled={actionLoading}
          >
            {actionLoading === "status" ? "Updating..." : "Disable / Enable"}
          </button>

          <button
            className="btn-outline"
            onClick={resetProgram}
            disabled={actionLoading}
          >
            {actionLoading === "program" ? "Resetting..." : "Reset Program"}
          </button>

          <button
            className="btn-danger"
            onClick={removeUser}
            disabled={actionLoading}
          >
            {actionLoading === "delete" ? "Deleting..." : "Delete User"}
          </button>
        </div>
      </div>

      {/* QUICK STATS */}
      <div className="dash-grid">
        <div className="dash-card glow">Workouts<br /><strong>{workouts.length}</strong></div>
        <div className="dash-card glow">Progress Logs<br /><strong>{progress.length}</strong></div>
        <div className="dash-card glow">Diet Logs<br /><strong>{diets.length}</strong></div>
        <div className="dash-card glow">AI Sessions<br /><strong>{ai.length}</strong></div>
      </div>

      {/* WORKOUTS */}
      <div className="dash-section">
        <h3>🏋️ Recent Workouts</h3>
        {workouts.length === 0 && <p className="dash-muted">No workouts logged.</p>}

        <div className="dash-list">
          {workouts.slice(0, 5).map(w => (
            <div key={w._id} className="dash-item">
              <div>
                <strong>{w.title}</strong>
                <span>{new Date(w.date).toDateString()}</span>
              </div>
              <span>{w.totalDuration || 0} min</span>
            </div>
          ))}
        </div>
      </div>

      {/* PROGRESS */}
      <div className="dash-section">
        <h3>📊 Latest Progress</h3>

        {progress[0] ? (
          <div className="dash-card">
            <p><strong>Weight:</strong> {progress[0].weight} kg</p>
            <p><strong>Body fat:</strong> {progress[0].bodyFat || "--"}%</p>
            <p><strong>Date:</strong> {new Date(progress[0].date).toDateString()}</p>
            <p className="dash-muted">{progress[0].notes}</p>
          </div>
        ) : (
          <p className="dash-muted">No progress logs.</p>
        )}
      </div>

      {/* DIET */}
      <div className="dash-section">
        <h3>🥗 Diet History</h3>

        {diets.length === 0 && <p className="dash-muted">No diet logs.</p>}

        <div className="dash-list">
          {diets.slice(0, 5).map(d => (
            <div key={d._id} className="dash-item">
              <div>
                <strong>{d.totalCalories} kcal</strong>
                <span>{new Date(d.date).toDateString()}</span>
              </div>
              <span>{d.water || 0} L</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI */}
      <div className="dash-section">
        <h3>🤖 AI Coach History</h3>

        {ai.length === 0 && <p className="dash-muted">No AI interactions.</p>}

        {ai.slice(0, 4).map(x => (
          <div key={x._id} className="dash-card" style={{ marginBottom: 14 }}>
            <p><strong>Q:</strong> {x.question}</p>
            <p className="dash-muted"><strong>A:</strong> {x.response}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 30 }}>
        <Link to="/admin/users" className="btn-outline">← Back to users</Link>
      </div>

    </div>
  );
}