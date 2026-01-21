import { useEffect, useState } from "react";
import { getAllAdminDiets } from "../../api/adminApi";
import "../../styles/dashboardLayout.css";

export default function AdminDiet() {
  const [diets, setDiets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDiets();
  }, []);

  const loadDiets = async () => {
    try {
      const res = await getAllAdminDiets();
      console.log("ADMIN DIETS:", res.data); // debug
      setDiets(res.data.data || []);
    } catch (err) {
      console.log("Failed to load diet logs", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dash-header">
        <h1>🥗 Admin — Diet Logs</h1>
        <p>All user nutrition & calorie records</p>
      </div>

      {loading && <p className="dash-muted">Loading diet logs...</p>}

      {!loading && diets.length === 0 && (
        <p className="dash-muted">No diet logs found.</p>
      )}

      <div className="dash-list">
        {diets.map((d) => (
          <div key={d._id} className="dash-item">
            <div>
              <strong>{d.user?.name || "User"}</strong>
              <span>{d.user?.email}</span>
            </div>

            <div style={{ textAlign: "right" }}>
              <strong>{d.totalCalories} kcal</strong>
              <span>{new Date(d.date).toDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}