import { Link } from "react-router-dom";
import "../../styles/global.css";
import "../../styles/auth.css";

function ForgotPassword() {
  return (
    <div className="auth-pro">

      <div className="auth-pro-right" style={{ width: "100%" }}>
        <div className="auth-pro-card">

          <span className="auth-badge">Password recovery</span>
          <h3>Forgot your password?</h3>
          <p>Enter your email and we’ll send you a reset link.</p>

          <form className="auth-pro-form">
            <input type="email" placeholder="Enter your email" />
            <button className="btn-primary">Send reset link</button>
          </form>

          <div className="auth-pro-footer">
            Remembered your password?{" "}
            <Link to="/login"><span>Back to login</span></Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;