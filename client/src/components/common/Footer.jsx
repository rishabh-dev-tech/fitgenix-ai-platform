import "../../styles/global.css";

function Footer() {
  return (
    <footer className="footer-pro" id="contact">
      <div className="container footer-pro-grid">

        {/* BRAND */}
        <div className="footer-brand">
          <h2>FitGenix-AI</h2>
          <p>
            FitGenix-AI is an AI-powered fitness platform designed to help people
            train smarter, eat better, and build sustainable healthy lifestyles.
          </p>

          <div className="footer-socials">
            <span>🌐</span>
            <span>📘</span>
            <span>📸</span>
            <span>🐦</span>
          </div>
        </div>

        {/* PRODUCT */}
        <div>
          <h4>Product</h4>
          <a href="#features">Features</a>
          <a href="#programs">Programs</a>
          <a href="#">AI Coach</a>
          <a href="#">Dashboard</a>
        </div>

        {/* COMPANY */}
        <div>
          <h4>Company</h4>
          <a href="#about">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>

        {/* SUPPORT */}
        <div>
          <h4>Support</h4>
          <p>📧 rishabh8090496023@gmail.com</p>
          <p>📞 +91 73093 35476</p>
          <p>📍 India</p>
        </div>
      </div>

      <div className="footer-bottom-pro">
        <p>© 2026 FitGenix-AI. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;