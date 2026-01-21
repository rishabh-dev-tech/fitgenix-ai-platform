import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../styles/global.css";
import "../../styles/auth.css";
import { loginUser } from "../../api/authApi";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
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
    const { data } = await loginUser(formData);

    localStorage.setItem("flexaura_token", data.data.token);
    window.dispatchEvent(new Event("storage"));   // 👈 ADD THIS LINE
    navigate("/dashboard");

  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
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
          Smarter training. Better nutrition. Real results.
          Login and continue your fitness journey with AI guidance.
        </p>

        <div className="auth-highlights">
          <div>💪 Smart workout programs</div>
          <div>🥗 Nutrition & calorie tracking</div>
          <div>📊 Progress analytics</div>
          <div>🤖 AI fitness coach</div>
        </div>
      </div>

      {/* RIGHT FORM SIDE */}
      <div className="auth-pro-right">
        <div className="auth-pro-card">

          <span className="auth-badge">Welcome back</span>
          <h3>Login to your account</h3>
          <p>Enter your details to continue</p>

          <form className="auth-pro-form" onSubmit={handleSubmit}>
            
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
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  /* Eye Off */
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeWidth="1.8" d="M3 3l18 18M10.58 10.58A2 2 0 0012 14a2 2 0 001.42-.59M9.88 5.09A9.77 9.77 0 0112 5c5 0 9.27 3.11 11 7-1.02 2.3-2.8 4.3-5.05 5.54M6.61 6.61C4.35 7.85 2.6 9.8 1 12c1.73 3.89 6 7 11 7 1.38 0 2.7-.24 3.92-.68" />
                  </svg>
                ) : (
                  /* Eye */
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeWidth="1.8" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" strokeWidth="1.8" />
                  </svg>
                )}
              </span>
            </div>

            {/* ERROR */}
            {error && <p className="auth-error">{error}</p>}

            {/* FORGOT PASSWORD */}
            <div className="forgot-box">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            <button className="btn-primary" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="auth-pro-footer">
            Don’t have an account?{" "}
            <Link to="/register"><span>Create one</span></Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;