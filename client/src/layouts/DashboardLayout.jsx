import { Outlet, Link, useNavigate } from "react-router-dom";
import "../styles/dashboardLayout.css";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("flexaura_token");
    navigate("/");
  };

  return (
    <div className="dash-layout">
      
      <aside className="dash-sidebar">
        <h2>FitGenix-AI</h2>

        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/">Home</Link>
          <Link to="/programs">Programs</Link>
          <Link to="/workouts">Workouts</Link>
          <Link to="/progress">Progress</Link>
          <Link to="/diet">Diet</Link>
          <Link to="/ai">AI Coach</Link>
        </nav>

        <button onClick={logout} className="dash-logout">Logout</button>
      </aside>

      <main className="dash-main">
        <Outlet />
      </main>

    </div>
  );
}