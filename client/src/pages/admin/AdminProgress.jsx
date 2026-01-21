import { useEffect, useState } from "react";
import { getAllProgress } from "../../api/adminApi";
import "../../styles/dashboardLayout.css";

export default function AdminProgress() {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const res = await getAllProgress();
      setProgress(res.data.data || []);
    } catch (err) {
      console.log("Failed to load progress logs", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dash-header">
        <h1>📊 Admin — Progress Logs</h1>
        <p>All user body & performance records</p>
      </div>

      {loading && <p className="dash-muted">Loading progress logs...</p>}

      {!loading && progress.length === 0 && (
        <p className="dash-muted">No progress logs found.</p>
      )}

      <div className="dash-list">
        {progress.map((p) => (
          <div key={p._id} className="dash-item">
            <div>
              <strong>{p.user?.name || "User"}</strong>
              <span>{p.user?.email}</span>
            </div>

            <div style={{ textAlign: "right" }}>
              <strong>{p.weight} kg</strong>
              <span>{new Date(p.date).toDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}