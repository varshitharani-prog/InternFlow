import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
    setOpen(false);
  }

  function closeMenu() {
    setOpen(false);
  }

  return (
    <>
      <nav className="navbar">

        <div className="nav-left">
          <img src="/logo1.jpeg" alt="Logo" className="logo" />
        </div>

        <div className="nav-center desktop">
          <Link className="nav-btn" to="/">Home</Link>

          {token && (
            <>
              <Link className="nav-btn" to="/dashboard">Dashboard</Link>
              <Link className="nav-btn" to="/applications">Applications</Link>
              <Link className="nav-btn" to="/reminders">Reminders</Link>
              <Link className="nav-btn" to="/profile">Profile</Link>
            </>
          )}
        </div>

        <div className="nav-right desktop">
          {!token ? (
            <>
              <Link className="nav-btn" to="/login">Login</Link>
              <Link className="nav-btn" to="/register">Register</Link>
            </>
          ) : (
            <button className="nav-btn logout" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>

        <div className="hamburger" onClick={() => setOpen(true)}>
          ☰
        </div>
      </nav>

      {open && <div className="overlay" onClick={closeMenu}></div>}

      <div className={`sidebar ${open ? "active" : ""}`}>

        <span className="close" onClick={closeMenu}>✖</span>

        <Link className="nav-btn" to="/" onClick={closeMenu}>
          Home
        </Link>

        {token && (
          <>
            <Link className="nav-btn" to="/dashboard" onClick={closeMenu}>
              Dashboard
            </Link>
            <Link className="nav-btn" to="/applications" onClick={closeMenu}>
              Applications
            </Link>
            <Link className="nav-btn" to="/reminders" onClick={closeMenu}>
              Reminders
            </Link>
            <Link className="nav-btn" to="/profile" onClick={closeMenu}>
              Profile
            </Link>
          </>
        )}

        {!token ? (
          <>
            <Link className="nav-btn" to="/login" onClick={closeMenu}>
              Login
            </Link>
            <Link className="nav-btn" to="/register" onClick={closeMenu}>
              Register
            </Link>
          </>
        ) : (
          <button className="nav-btn logout" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </>
  );
}

export default Navbar;