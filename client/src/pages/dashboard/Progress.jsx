import { useEffect, useState } from "react";
import "../../styles/dashboardLayout.css";
import { addProgress, getMyProgress, getLatestProgress } from "../../api/progressApi";

export default function Progress() {
    const [form, setForm] = useState({
        weight: "",
        bodyFat: "",
        chest: "",
        waist: "",
        hips: "",
        strengthLevel: "",
        notes: ""
    });

    const [history, setHistory] = useState([]);
    const [latest, setLatest] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadProgress();
    }, []);

    const loadProgress = async () => {
        try {
            const [all, last] = await Promise.all([
                getMyProgress(),
                getLatestProgress()
            ]);

            setHistory(all.data.data.reverse());
            setLatest(last.data.data);
        } catch (err) {
            console.log("Failed to load progress");
        }
    };

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const submitProgress = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            await addProgress(form);

            setForm({
                weight: "",
                bodyFat: "",
                chest: "",
                waist: "",
                hips: "",
                strengthLevel: "",
                notes: ""
            });

            loadProgress();
        } catch (err) {
            alert("Failed to add progress");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-page">

            <div className="dash-header">
                <h1>Progress Tracker</h1>
                <p>Track your body stats and monitor improvement</p>
            </div>

            {/* LATEST SNAPSHOT */}
            {latest && (
                <div className="progress-top">
                    <div className="progress-stat">
                        <h4>Current Weight</h4>
                        <h2>{latest.weight} kg</h2>
                        <span>Last updated</span>
                    </div>

                    <div className="progress-stat">
                        <h4>Body Fat</h4>
                        <h2>{latest.bodyFat}%</h2>
                        <span>Fitness composition</span>
                    </div>

                    <div className="progress-stat">
                        <h4>Strength Level</h4>
                        <h2>{latest.strengthLevel}/10</h2>
                        <span>Performance score</span>
                    </div>
                </div>
            )}

            {/* ADD PROGRESS */}
            <div className="dash-card glow" style={{ maxWidth: 720 }}>
                <h3>Add Progress Entry</h3>

                <form onSubmit={submitProgress} className="workout-form">

                    <div className="form-grid">

                        <input name="weight" placeholder="Weight (kg)" value={form.weight} onChange={handleChange} required />
                        <input name="bodyFat" placeholder="Body fat %" value={form.bodyFat} onChange={handleChange} />
                        <input name="chest" placeholder="Chest (cm)" value={form.chest} onChange={handleChange} />
                        <input name="waist" placeholder="Waist (cm)" value={form.waist} onChange={handleChange} />
                        <input name="hips" placeholder="Hips (cm)" value={form.hips} onChange={handleChange} />
                        <input name="strengthLevel" placeholder="Strength level (1–10)" value={form.strengthLevel} onChange={handleChange} />

                    </div>

                    <textarea
                        name="notes"
                        placeholder="Notes about your condition..."
                        value={form.notes}
                        onChange={handleChange}
                        rows="3"
                        className="workout-notes"
                    />

                    <button className="btn-primary" disabled={loading}>
                        {loading ? "Saving..." : "Save Progress"}
                    </button>

                </form>
            </div>

            {/* HISTORY */}
            <div className="dash-section">
                <h3>Progress History</h3>

                {history.length === 0 && (
                    <p className="dash-muted">No progress entries yet.</p>
                )}

                <div className="dash-list">
                    {history.map((p) => (
                        <div key={p._id} className="dash-item">
                            <div>
                                <strong>{new Date(p.date).toDateString()}</strong>
                                <span>Weight: {p.weight} kg</span>
                            </div>
                            <span>BF: {p.bodyFat || "--"}%</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}