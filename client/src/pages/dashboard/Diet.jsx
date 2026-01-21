import { useEffect, useState } from "react";
import "../../styles/dashboardLayout.css";
import { addDiet, getMyDiets, getTodayDiet } from "../../api/dietApi";

export default function Diet() {
  const [meals, setMeals] = useState([
    { name: "", calories: "", protein: "", carbs: "", fats: "" }
  ]);

  const [summary, setSummary] = useState({
    totalCalories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    water: "",
    notes: ""
  });

  const [history, setHistory] = useState([]);
  const [today, setToday] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDiet();
  }, []);

  const loadDiet = async () => {
    try {
      const [todayRes, historyRes] = await Promise.all([
        getTodayDiet(),
        getMyDiets()
      ]);

      setToday(todayRes.data.data);
      setHistory(historyRes.data.data);
    } catch {
      console.log("Failed to load diet data");
    }
  };

  const handleMealChange = (i, e) => {
    const updated = [...meals];
    updated[i][e.target.name] = e.target.value;
    setMeals(updated);
  };

  const addMealRow = () => {
    setMeals([
      ...meals,
      { name: "", calories: "", protein: "", carbs: "", fats: "" }
    ]);
  };

  const handleSummaryChange = (e) =>
    setSummary({ ...summary, [e.target.name]: e.target.value });

  const calculateTotals = () => {
    let totals = { calories: 0, protein: 0, carbs: 0, fats: 0 };

    meals.forEach((m) => {
      totals.calories += Number(m.calories || 0);
      totals.protein += Number(m.protein || 0);
      totals.carbs += Number(m.carbs || 0);
      totals.fats += Number(m.fats || 0);
    });

    return totals;
  };

  const submitDiet = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const totals = calculateTotals();

      await addDiet({
        meals: meals.map((m) => ({
          name: m.name,
          calories: Number(m.calories || 0),
          protein: Number(m.protein || 0),
          carbs: Number(m.carbs || 0),
          fats: Number(m.fats || 0)
        })),
        totalCalories: totals.calories,
        protein: totals.protein,
        carbs: totals.carbs,
        fats: totals.fats,
        water: Number(summary.water || 0),
        notes: summary.notes
      });

      setMeals([{ name: "", calories: "", protein: "", carbs: "", fats: "" }]);
      setSummary({ totalCalories: 0, protein: 0, carbs: 0, fats: 0, water: "", notes: "" });
      loadDiet();
      alert("Diet log saved");
    } catch {
      alert("Failed to save diet log");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">

      <div className="dash-header">
        <h1>Diet Tracker</h1>
        <p>Track meals, calories, and nutrition intake</p>
      </div>

      {/* TODAY SUMMARY */}
      {today && (
        <div className="progress-top">
          <div className="progress-stat">
            <h4>Calories</h4>
            <h2>{today.totalCalories}</h2>
            <span>kcal today</span>
          </div>

          <div className="progress-stat">
            <h4>Protein</h4>
            <h2>{today.protein}g</h2>
            <span>daily intake</span>
          </div>

          <div className="progress-stat">
            <h4>Water</h4>
            <h2>{today.water}L</h2>
            <span>hydration</span>
          </div>
        </div>
      )}

      {/* ADD DIET */}
      <div className="dash-card glow" style={{ marginTop: 28 }}>
        <h3>Log Today’s Diet</h3>

        <form onSubmit={submitDiet} className="workout-form" style={{ marginTop: 16 }}>

          {meals.map((meal, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 10 }}>
              <input name="name" placeholder="Meal name" value={meal.name} onChange={(e) => handleMealChange(i, e)} required />
              <input type="number" name="calories" placeholder="Calories" value={meal.calories} onChange={(e) => handleMealChange(i, e)} />
              <input type="number" name="protein" placeholder="Protein" value={meal.protein} onChange={(e) => handleMealChange(i, e)} />
              <input type="number" name="carbs" placeholder="Carbs" value={meal.carbs} onChange={(e) => handleMealChange(i, e)} />
              <input type="number" name="fats" placeholder="Fats" value={meal.fats} onChange={(e) => handleMealChange(i, e)} />
            </div>
          ))}

          <button type="button" className="btn-outline" onClick={addMealRow} style={{ marginTop: 10 }}>
            + Add another meal
          </button>

          <input type="number" name="water" placeholder="Water intake (liters)" value={summary.water} onChange={handleSummaryChange} />
          <textarea name="notes" placeholder="Notes about today’s diet..." value={summary.notes} onChange={handleSummaryChange} rows="3" />

          <button className="btn-primary" disabled={loading}>
            {loading ? "Saving..." : "Save Diet Log"}
          </button>
        </form>
      </div>

      {/* HISTORY */}
      <div className="dash-section">
        <h3>Diet History</h3>

        {history.length === 0 && <p className="dash-muted">No diet logs yet.</p>}

        <div className="dash-list">
          {history.map((d) => (
            <div key={d._id} className="dash-item">
              <div>
                <strong>{new Date(d.date).toDateString()}</strong>
                <span>{d.totalCalories} kcal</span>
              </div>
              <span>{d.protein}g protein</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}