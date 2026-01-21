import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../styles/global.css";
import "../../styles/auth.css";
import { registerUser } from "../../api/authApi";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser(formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-pro">

      {/* LEFT BRAND SIDE */}
      <div className="auth-pro-left">
        <h2>FitGenix-AI</h2>
        <p>
          Join FitGenix-AI and start your personalized fitness journey powered by AI.
        </p>

        <div className="auth-highlights">
          <div>💪 Custom fitness programs</div>
          <div>🥗 Smart nutrition tracking</div>
          <div>📊 Progress analytics</div>
          <div>🤖 AI fitness coach</div>
        </div>
      </div>

      {/* RIGHT FORM SIDE */}
      <div className="auth-pro-right">
        <div className="auth-pro-card">

          <span className="auth-badge">Get started</span>
          <h3>Create your account</h3>
          <p>Start your transformation today</p>

          <form className="auth-pro-form" onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* PASSWORD WITH EYE */}
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeWidth="1.8" d="M3 3l18 18M10.58 10.58A2 2 0 0012 14a2 2 0 001.42-.59M9.88 5.09A9.77 9.77 0 0112 5c5 0 9.27 3.11 11 7-1.02 2.3-2.8 4.3-5.05 5.54M6.61 6.61C4.35 7.85 2.6 9.8 1 12c1.73 3.89 6 7 11 7 1.38 0 2.7-.24 3.92-.68" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeWidth="1.8" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" strokeWidth="1.8" />
                  </svg>
                )}
              </span>
            </div>

            {error && <p className="auth-error">{error}</p>}

            <button className="btn-primary" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="auth-pro-footer">
            Already have an account?{" "}
            <Link to="/login"><span>Login</span></Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;