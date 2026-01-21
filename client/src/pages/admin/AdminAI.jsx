import { useEffect, useState } from "react";
import { getAllAdminAI } from "../../api/adminApi";
import "../../styles/dashboardLayout.css";

export default function AdminAI() {
  const [ai, setAI] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAI();
  }, []);

  const loadAI = async () => {
    try {
      const res = await getAllAdminAI();
      setAI(res.data.data || []);
    } catch (err) {
      console.log("Failed to load AI history", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">

      <div className="dash-header">
        <h1>🤖 Admin — AI Interactions</h1>
        <p>All conversations with AI coach</p>
      </div>

      {loading && <p className="dash-muted">Loading AI interactions...</p>}

      {!loading && ai.length === 0 && (
        <p className="dash-muted">No AI interactions found.</p>
      )}

      <div className="dash-section">
        {ai.map((x) => (
          <div key={x._id} className="dash-card" style={{ marginBottom: 16 }}>
            <p><strong>User:</strong> {x.user?.name} ({x.user?.email})</p>
            <p><strong>Q:</strong> {x.question}</p>
            <p className="dash-muted"><strong>A:</strong> {x.response}</p>
            <span className="dash-muted" style={{ fontSize: 12 }}>
              {new Date(x.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}