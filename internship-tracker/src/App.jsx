import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddApplication from "./components/AddApplication";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Applications from "./pages/Applications";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import EditApplication from "./pages/EditApplication";
import Reminders from "./pages/Reminders";
import ProtectedRoute from "./components/ProtectedRoute";
import {useState,useEffect} from "react"
import "./index.css"

function App() {
  const [applications,setApplications] = useState([]);
  const [loading,setLoading]=useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
  if (!token) {
    setApplications([]);
    setLoading(false);
    return;
  }

  setApplications([]);
  setLoading(true);

  async function fetchApplications() {
    const res = await fetch("http://localhost:5000/applications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      setApplications([]);
      return;
    }

    setApplications(data);
    setLoading(false);
  }

  fetchApplications();
}, [token]); 

  
  const reminders = generateReminders(applications);
  function generateReminders(applications) {
    return applications
      .map((app) => {
        const reminders = [];

        if (app.oaDateTime&&app.oaDateTime !== "") {
          reminders.push({
            title: `${app.company} OA`,
            dateTime: app.oaDateTime,
            type: "OA",
          });
        }

        if (app.interviewDateTime && app.interviewDateTime !== "") {
          reminders.push({
            title: `${app.company} Interview`,
            dateTime: app.interviewDateTime,
            type: "Interview",
          });
        }

        return reminders;
      })
      .flat()
      .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

  }
  
  return (
    <BrowserRouter>
      <Navbar />
      <div className="page-container">
        {loading && (
        <div className="loading-screen">
          Loading applications...
        </div>
      )}
      <main className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setToken={setToken}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute> 
            <Dashboard applications={applications}/>
          </ProtectedRoute>
        } 
        />
        <Route path="/applications" element={
          <ProtectedRoute> 
            <Applications applications={applications} setApplications={setApplications}/> 
          </ProtectedRoute>
        }
        />
        <Route path="/reminders" element={
          <ProtectedRoute>
            <Reminders reminders={reminders} />
          </ProtectedRoute>
        }
        />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditApplication
                applications={applications}
                setApplications={setApplications}/>
            </ProtectedRoute> 
          }
        />
      </Routes>
      </main>
      <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;