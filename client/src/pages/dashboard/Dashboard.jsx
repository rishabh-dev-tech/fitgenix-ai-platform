import { useEffect, useState } from "react";
import { getDashboardData } from "../../api/dashboardApi";
import { getMe } from "../../api/userApi";
import "../../styles/dashboardLayout.css";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [dashRes, userRes] = await Promise.all([
          getDashboardData(),
          getMe()
        ]);

        setData(dashRes.data.data);
        setUser(userRes.data.user);
      } catch (err) {
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) return <p style={{ padding: 40 }}>Loading dashboard...</p>;
  if (error) return <p style={{ padding: 40, color: "red" }}>{error}</p>;

  return (
    <div className="dashboard-page">

      {/* HEADER */}
      <div className="dash-header">
        <h1>Welcome back, {user?.name}</h1>
        <p>Your fitness journey at a glance</p>
      </div>

      {/* STATS */}
      <div className="dash-grid">

        <div className="dash-card glow">
          <h4>Active Program</h4>
          {user?.activeProgram ? (
            <>
              <h2>{user.activeProgram.title}</h2>
              <span>{user.activeProgram.goal}</span>
            </>
          ) : (
            <p>No program selected</p>
          )}
        </div>

        <div className="dash-card">
          <h4>Total Programs</h4>
          <h2>{data.totalPrograms}</h2>
        </div>

        <div className="dash-card">
          <h4>AI Coach Sessions</h4>
          <h2>{data.aiCount}</h2>
        </div>

        <div className="dash-card">
          <h4>Workouts This Week</h4>
          <h2>{data.weeklyWorkoutCount}</h2>
        </div>
      </div>

      {/* RECENT WORKOUTS */}
      <div className="dash-section">
        <h3>Recent Workouts</h3>

        {data.recentWorkouts.length === 0 && (
          <p className="dash-muted">No workouts logged yet.</p>
        )}

        <div className="dash-list">
          {data.recentWorkouts.map((w) => (
            <div key={w._id} className="dash-item">
              <div>
                <strong>{w.type}</strong>
                <span>{new Date(w.date).toDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}