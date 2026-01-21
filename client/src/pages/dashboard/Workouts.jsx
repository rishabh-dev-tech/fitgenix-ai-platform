import { useEffect, useState } from "react";
import "../../styles/dashboardLayout.css";
import { createWorkout, getMyWorkouts } from "../../api/workoutApi";

export default function Workouts() {
  const [form, setForm] = useState({
    title: "",
    totalduration: "",
    caloriesburned: ""
  });

  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    try {
      const res = await getMyWorkouts();
      setWorkouts(res.data.data);
    } catch (err) {
      console.log("Failed to load workouts");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitWorkout = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await createWorkout(form);
      setForm({ type: "", duration: "", calories: "" });
      loadWorkouts();
    } catch (err) {
      alert("Failed to log workout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">

      <div className="dash-header">
        <h1>Workout Log</h1>
        <p>Track your training and build your fitness history</p>
      </div>

      {/* LOG FORM */}
      <div className="dash-card glow" style={{ maxWidth: 520 }}>
        <h3>Log New Workout</h3>

        <form onSubmit={submitWorkout} className="workout-form" style={{ marginTop: 14 }}>

          <input
            name="title"
            placeholder="Workout title (Chest, Cardio, Yoga...)"
            value={form.type}
            onChange={handleChange}
            required
          />

          <input
            name="duration"
            placeholder="Duration (minutes)"
            value={form.duration}
            onChange={handleChange}
            required
          />

          <input
            name="calories"
            placeholder="Calories burned (optional)"
            value={form.calories}
            onChange={handleChange}
          />

          <button className="btn-primary" style={{ marginTop: 12 }} disabled={loading}>
            {loading ? "Saving..." : "Save Workout"}
          </button>
        </form>
      </div>

      {/* HISTORY */}
      <div className="dash-section">
        <h3>Your Workouts</h3>

        {workouts.length === 0 && (
          <p className="dash-muted">No workouts logged yet.</p>
        )}

        <div className="dash-list">
          {workouts.map((w) => (
            <div key={w._id} className="dash-item">
              <div>
                <strong>{w.title}</strong>
                <span>{new Date(w.date).toDateString()}</span>
              </div>
              <span>{w.duration} min</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}