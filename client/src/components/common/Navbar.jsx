import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/global.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("flexaura_token");
      setIsAuth(!!token);

      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          setIsAdmin(payload.role === "admin");
        } catch {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const logout = () => {
    localStorage.removeItem("flexaura_token");
    setIsAuth(false);
    setIsAdmin(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">

        {/* LOGO */}
        <div className="logo-area">
          <span className="logo-icon">💪</span>
          <h2 className="logo-text">FitGenix-AI</h2>
        </div>

        {/* DESKTOP LINKS */}
        <ul className="nav-links">
          <li><Link to="/">🏠 Home</Link></li>
          <li><a href="/#about">📘 About</a></li>
          <li><a href="/#programs">🔥 Programs</a></li>
          <li><a href="/#features">✨ Features</a></li>
          <li><a href="/#contact">📞 Contact</a></li>

          {isAuth && <li><Link to="/dashboard">📊 Dashboard</Link></li>}

          {isAdmin && <li><Link to="/admin">🛡️ Admin</Link></li>}
        </ul>

        {/* ACTIONS */}
        <div className="nav-actions">
          {!isAuth && <Link to="/login" className="btn-primary">Login</Link>}
          {isAuth && <button onClick={logout} className="btn-outline">Logout</button>}
        </div>

        {/* MOBILE BUTTON */}
        <div className="menu-btn" onClick={() => setOpen(!open)}>
          {open ? "✖" : "☰"}
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="mobile-menu">
          <Link to="/">🏠 Home</Link>
          <a href="/#about">📘 About</a>
          <a href="/#programs">🔥 Programs</a>
          <a href="/#features">✨ Features</a>
          <a href="/#contact">📞 Contact</a>

          {isAuth && <Link to="/dashboard">📊 Dashboard</Link>}
          {isAdmin && <Link to="/admin">🛡️ Admin</Link>}

          {!isAuth && <Link to="/login" className="btn-primary">Login</Link>}
          {isAuth && <button onClick={logout} className="btn-outline">Logout</button>}
        </div>
      )}
    </nav>
  );
}

export default Navbar;