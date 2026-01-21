import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import "../styles/global.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getInsights } from "../api/insightApi";


function Home() {
  const [isAuth, setIsAuth] = useState(false);
  const [insights, setInsights] = useState([]);
  const [loadingInsights, setLoadingInsights] = useState(true);

  /* AUTH CHECK */
  useEffect(() => {
    const checkAuth = () => {
      setIsAuth(!!localStorage.getItem("flexaura_token"));
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  /* LOAD INSIGHTS */
  useEffect(() => {
    if (!localStorage.getItem("flexaura_token")) {
      setLoadingInsights(false);
      return;
    }

    const loadInsights = async () => {
      try {
        const res = await getInsights();
        setInsights(res.data.data || []);
      } catch (err) {
        console.log("Failed to load insights");
      } finally {
        setLoadingInsights(false);
      }
    };

    loadInsights();
  }, []);

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section id="home" className="hero-pro">
        <div className="container hero-pro-inner">

          <div className="hero-pro-text">
            <span className="hero-badge">⚡ AI Powered Fitness Platform</span>

            <h1>
              Transform Your Body <br />
              <span>With Smart Fitness</span>
            </h1>

            <p>
              FitGenix-AI is a next-generation fitness platform that combines intelligent
              workouts, personalized nutrition, and AI guidance to help you achieve
              real results faster.
            </p>

            <div className="hero-pro-actions">
              <Link
                to={isAuth ? "/dashboard" : "/login"}
                className="btn-primary"
              >
                {isAuth ? "Go to Dashboard" : "Start Free"}
              </Link>

              <a href="#features" className="btn-outline">View Features</a>
            </div>

            <div className="hero-mini-stats">
              <div><h4>10K+</h4><span>Users</span></div>
              <div><h4>500+</h4><span>Workouts</span></div>
              <div><h4>24/7</h4><span>AI Coach</span></div>
            </div>
          </div>

          <div className="hero-pro-image">
            <img src="/images/hero.jpg" alt="fitness training" />
          </div>

        </div>
      </section>

      {/* SMART INSIGHTS (ONLY IF LOGGED IN) */}
      {isAuth && (
        <section className="features-section">
          <div className="container">

            <h2 className="features-title">🤖 Smart Coach Insights</h2>
            <p className="features-subtitle">
              Personalized intelligence based on your workouts, diet, and progress.
            </p>

            {loadingInsights && (
              <p style={{ color: "#cfd3ff", textAlign: "center" }}>
                Loading insights...
              </p>
            )}

            {!loadingInsights && insights.length === 0 && (
              <div className="programs-pro-grid">
                <div className="program-pro-card highlight">
                  <h3>No insights yet</h3>
                  <p>
                    Start logging workouts, progress, diet, and ask the AI coach
                    to unlock smart recommendations.
                  </p>
                </div>
              </div>
            )}

            <div className="programs-pro-grid">
              {insights.map((tip, i) => (
                <div key={i} className="program-pro-card highlight">
                  <h3>Coach Insight</h3>
                  <p>{tip}</p>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

        {/* ABOUT */}
<section id="about" className="about-pro">
  <div className="container about-pro-inner">

    {/* LEFT CONTENT */}
    <div className="about-pro-text">
      <span className="about-badge">🚀 About FitGenix-AI</span>

      <h2>
        Smarter Fitness. <br />
        <span>Real Results.</span>
      </h2>

      <p>
        FitGenix-AI is a modern AI-powered fitness platform designed to help people
        transform their bodies, improve health, and build long-term fitness habits.
        We combine workout science, nutrition guidance, and intelligent technology
        into one powerful ecosystem.
      </p>

      <div className="about-points">
        <div>✅ Personalized workout programs</div>
        <div>✅ Smart nutrition & calorie tracking</div>
        <div>✅ Real-time progress monitoring</div>
        <div>✅ AI fitness coach support</div>
      </div>
    </div>

    {/* RIGHT INFO BOXES */}
    <div className="about-pro-cards">
      <div className="about-card">
        <h3>🎯 Our Mission</h3>
        <p>
          To make fitness simple, smart, and accessible by using technology
          to guide every individual toward a healthier lifestyle.
        </p>
      </div>

      <div className="about-card highlight">
        <h3>🧠 What Makes Us Different</h3>
        <p>
          Flex Aura adapts to you. Our system learns from your activity,
          performance, and goals to deliver truly personalized fitness guidance.
        </p>
      </div>

      <div className="about-card">
        <h3>💪 Who It’s For</h3>
        <p>
          Whether you are a beginner or an advanced athlete, Flex Aura helps
          you stay consistent, motivated, and results-driven.
        </p>
      </div>
    </div>

  </div>
</section>

     {/* FITNESS PROGRAMS */}
<section id="programs" className="programs-pro">
  <div className="container">

    <div className="programs-head">
      <h2>Smart Fitness Programs</h2>
      <p>
        Our programs are designed for real-life daily use — combining workouts,
        nutrition, tracking, and AI guidance into complete fitness systems.
      </p>
    </div>

    <div className="programs-pro-grid">

      {/* PROGRAM 1 */}
      <div className="program-pro-card">
        <img src="/images/fatloss.jpg" alt="fat loss program" />
        <h3>Fat Loss System</h3>
        <p className="program-desc">
          A complete fat-loss program built around calorie control, smart workouts,
          and daily progress tracking.
        </p>

        <ul>
          <li>🔥 Personalized fat-burning workouts</li>
          <li>🥗 Daily calorie & meal tracking</li>
          <li>📊 Weight & body progress logs</li>
          <li>🤖 AI coach guidance</li>
        </ul>
      </div>

      {/* PROGRAM 2 */}
      <div className="program-pro-card highlight">
        <img src="/images/muscle.jpg" alt="muscle building program" />
        <h3>Muscle Building System</h3>
        <p className="program-desc">
          A progressive muscle growth system designed to build strength, size,
          and recovery consistency.
        </p>

        <ul>
          <li>💪 Structured workout splits</li>
          <li>🥩 Protein & nutrition planning</li>
          <li>⏱️ Workout logging & volume tracking</li>
          <li>🤖 AI form & recovery tips</li>
        </ul>
      </div>

      {/* PROGRAM 3 */}
      <div className="program-pro-card">
        <img src="/images/strength.jpg" alt="strength program" />
        <h3>Strength & Performance</h3>
        <p className="program-desc">
          Built for performance-driven users who want to improve power,
          endurance, and athletic ability.
        </p>

        <ul>
          <li>🏋️ Strength cycles & PR tracking</li>
          <li>📈 Performance analytics</li>
          <li>🧠 Recovery & mobility focus</li>
          <li>🤖 Smart load recommendations</li>
        </ul>
      </div>

      {/* PROGRAM 4 */}
      <div className="program-pro-card">
        <img src="/images/wellness.jpg" alt="wellness program" />
        <h3>Wellness & Lifestyle</h3>
        <p className="program-desc">
          A holistic daily-use system focused on recovery, flexibility,
          mental health, and long-term habits.
        </p>

        <ul>
          <li>🧘 Mobility & stretching routines</li>
          <li>🛌 Sleep & recovery tracking</li>
          <li>📆 Habit & consistency system</li>
          <li>🤖 Wellness coaching support</li>
        </ul>
      </div>

    </div>
  </div>
</section>
      {/* FEATURES */}
      <section id="features" className="features-section">
        <div className="container">

          <h2 className="features-title">Why Choose FitGenix-AI</h2>
          <p className="features-subtitle">
            Everything you need to transform your body, health, and lifestyle — in one smart fitness platform.
          </p>

          <div className="features-grid">

            <div className="feature-card">
              <div className="feature-icon">💪</div>
              <h3>Smart Workout Plans</h3>
              <p>
                AI-powered workout programs customized for fat loss, muscle gain, and strength training.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🥗</div>
              <h3>Nutrition Guidance</h3>
              <p>
                Personalized meal planning and calorie tracking to fuel your body the right way.
              </p>
            </div>

            <div className="feature-card highlight">
              <div className="feature-icon">🤖</div>
              <h3>AI Fitness Coach</h3>
              <p>
                Your 24/7 smart coach to answer fitness questions, guide workouts, and keep you motivated.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Progress Tracking</h3>
              <p>
                Track weight, workouts, calories, and body stats with visual progress insights.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⏱️</div>
              <h3>Habit & Consistency</h3>
              <p>
                Build strong routines with daily logs, streaks, and performance history.
              </p>
            </div> <div className="feature-card">
              <div className="feature-icon">🔥</div>
              <h3>Calorie & Burn Tracker</h3>
              <p>
                Automatically track calories burned, daily activity, and workout performance to stay on target.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Goals & Achievements</h3>
              <p>
                Set fitness goals, earn achievements, and stay motivated with progress milestones.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>Holistic Wellness</h3>
              <p>
                Improve mobility, recovery, and mindset with guided wellness tools.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;