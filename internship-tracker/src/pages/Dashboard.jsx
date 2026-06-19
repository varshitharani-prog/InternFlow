import { useState, useEffect } from "react";
import AnalyticsChart from "../components/AnalyticsChart";
function Dashboard({ applications }) {
  const [analytics, setAnalytics] = useState(null);
  useEffect(() => {
  async function fetchAnalytics() {
    try {
      const res = await fetch(
        "http://localhost:5000/analytics",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log(data);
        return;
      }

      setAnalytics(data);

    } catch (error) {
      console.log(error);
    }
  }

  fetchAnalytics();
}, []);
  const applied = applications.length;
  const oaScheduled = applications.filter(
    (a) => a.status === "OA Scheduled"
  ).length;

  const oaCompleted = applications.filter(
    (a) => a.status === "OA Completed"
  ).length;

  const interviewScheduled = applications.filter(
    (a) => a.status === "Interview Scheduled"
  ).length;

  const interviewCompleted = applications.filter(
    (a) => a.status === "Interview Completed"
  ).length;

  const selected = applications.filter(
    (a) => a.status === "Selected"
  ).length;

  const accepted = applications.filter(
    (a) => a.status === "Accepted"
  ).length;

  const rejected = applications.filter(
    (a) => a.status === "Rejected"
  ).length;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
    <h1>Dashboard</h1>
    <p>
      Welcome back! Track your internship applications,
      monitor progress through every stage, and gain
      insights from your application journey.
    </p>
    </div>

      <div className="stats-container">

        <div className="stat-card applied">
          <h3>{applied}</h3>
          <p>Applied</p>
        </div>

        <div className="stat-card oa-scheduled">
          <h3>{oaScheduled}</h3>
          <p>OA Scheduled</p>
        </div>

        <div className="stat-card oa-completed">
          <h3>{oaCompleted}</h3>
          <p>OA Completed</p>
        </div>

        <div className="stat-card interview-scheduled">
          <h3>{interviewScheduled}</h3>
          <p>Interview Scheduled</p>
        </div>

        <div className="stat-card interview-completed">
          <h3>{interviewCompleted}</h3>
          <p>Interview Completed</p>
        </div>

        <div className="stat-card selected">
          <h3>{selected}</h3>
          <p>Selected</p>
        </div>

        <div className="stat-card accepted">
          <h3>{accepted}</h3>
          <p>Accepted</p>
        </div>

        <div className="stat-card rejected">
          <h3>{rejected}</h3>
          <p>Rejected</p>
        </div>

      </div>

      {analytics && (
      <div className="analytics-section">
        <h2>Application Analytics</h2>

        <p>
          Visualize how your applications are distributed
          across different stages of the recruitment process.
        </p>

        <AnalyticsChart analytics={analytics} />
      </div>
      )}

      <div className="recent-applications">
        <h2>Recent Applications</h2>

        <p>
          Your latest internship applications and their current status.
        </p>

        {applications.length === 0 ? (
        <div style={{color:"white"}}>
          <p>No applications found.</p>
          <p>Start your journey by adding application.</p>
        </div>
        ) : (
          applications.slice(-5).reverse().map((app) => (
          <div className="recent-app-card" key={app._id}>
            <strong>{app.company}</strong>
            <span>{app.status}</span>
          </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;