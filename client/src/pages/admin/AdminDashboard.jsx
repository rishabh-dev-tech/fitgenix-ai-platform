import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlatformStats } from "../../api/adminApi";
import "../../styles/dashboardLayout.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await getPlatformStats();
        setStats(res.data.data);
      } catch (err) {
        console.log("Failed to load admin stats");
      }
    };

    loadStats();
  }, []);

  if (!stats) {
    return <p className="dash-muted">Loading admin stats...</p>;
  }

  return (
    <div className="dashboard-page">
      <div className="dash-header">
        <h1>Admin Panel</h1>
        <p>Platform analytics & control</p>
      </div>

      <div className="dash-grid">

        {/* USERS — ACTIVE */}
        <Link to="/admin/users" className="dash-card glow admin-card">
          👥 Users
          <br />
          <strong>{stats.users}</strong>
        </Link>

        {/* WORKOUTS — ACTIVE */}
        <Link to="/admin/workouts" className="dash-card glow admin-card">
          🏋️ Workouts
          <br />
          <strong>{stats.workouts}</strong>
        </Link>

        {/* PROGRESS */}
        <Link to="/admin/progress" className="dash-card glow admin-card">
          📊 Progress Logs
          <br />
          <strong>{stats.progress}</strong>
        </Link>

        {/* DIET */}
        <Link to="/admin/diets" className="dash-card glow admin-card">
          🥗 Diet Logs
          <br />
          <strong>{stats.diets}</strong>
        </Link>

        {/* AI */}
        <Link to="/admin/ai" className="dash-card glow admin-card">
          🤖 AI Interactions
          <br />
          <strong>{stats.ai}</strong>
        </Link>

      </div>
    </div>
  );
}