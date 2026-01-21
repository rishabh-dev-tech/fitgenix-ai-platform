import { useEffect, useState } from "react";
import { getAllAdminWorkouts } from "../../api/adminApi";
import "../../styles/dashboardLayout.css";

export default function AdminWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    try {
      const res = await getAllAdminWorkouts();
      setWorkouts(res.data.data || []);
    } catch (err) {
      console.log("Failed to load workouts");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">

      <div className="dash-header">
        <h1>Admin — Workouts</h1>
        <p>All workout logs across the platform</p>
      </div>

      <div className="dash-section">

        {loading && <p className="dash-muted">Loading workouts...</p>}

        {!loading && workouts.length === 0 && (
          <p className="dash-muted">No workouts found.</p>
        )}

        <div className="dash-list">
          {workouts.map((w) => (
            <div key={w._id} className="dash-item">
              <div>
                <strong>{w.title}</strong>
                <span>
                  {w.user?.name} — {w.user?.email}
                </span>
                <span>{new Date(w.date).toDateString()}</span>
              </div>

              <span>{w.totalDuration || 0} min</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}