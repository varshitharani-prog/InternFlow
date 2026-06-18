import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({setToken}) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/", {
        state: { message: "Login successful" }
      });
    } catch (err) {
      setError("Something went wrong. Try again later.");
    }
  }

  return (
    <div className="log-container">
      <h1>Login Page</h1>

      {/* ERROR */}
      {error && <div className="error-msg">{error}</div>}

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
        />

        <br /><br />

        <label>Password</label>
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;