/*import "./Home.css";*/
import { useEffect,useRef } from "react";
import { useLocation } from "react-router-dom";
function Home() {
  const location = useLocation();

const shown = useRef(false);

useEffect(() => {
  if (!shown.current && location.state?.message) {
    alert(location.state.message);
    shown.current = true;
  }
}, []);
  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-left">
          <span className="badge">All-in-One Internship Tracker</span>

          <h1>
            Track Every Internship <br />
            Organize Grow Succeed
          </h1>

          <p>
            Manage applications, interviews, resumes and offers in one organized workspace.
          </p>

          
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features">
        <h2>Why InternFlow?</h2>

        <div className="feature-grid">
          <div className="h-card">
            <img src="/l1.jpeg" alt="l1" className="l" />
            <h3>Track Applications</h3>
            <p>Save and organize every internship you apply for.</p>
          </div>

          <div className="h-card">
            <img src="/l2.jpeg" alt="l2" className="l" />
            <h3>Interview Scheduler</h3>
            <p>Never miss an interview again.</p>
          </div>

          <div className="h-card">
            <img src="/l3.jpeg" alt="l3" className="l" />
            <h3>Analytics Dashboard</h3>
            <p>Visual insights of your progress.</p>
          </div>

          <div className="h-card">
            <img src="/l4.jpeg" alt="l4" className="l" />
            <h3>Smart Reminders</h3>
            <p>Stay updated with upcoming interviews, online assessments deadlines in one place.</p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how">
        <h2>How it works</h2>

        <div className="steps">
          <div>
            <img src="/l5.jpeg" alt="l5" className="l" />
            <h4>Add your internship applications</h4>
          </div>

          <div>
            <img src="/l6.jpeg" alt="l6" className="l" />
            <h4>Update your status as you progress</h4>
          </div>

          <div>
            <img src="/l7.jpeg" alt="l7" className="l" />
            <h4>View reminders for important deadlines</h4>
          </div>

          <div>
            <img src="/l8.jpeg" alt="l8" className="l" />
            <h4>Track your applications in dashboard</h4>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;