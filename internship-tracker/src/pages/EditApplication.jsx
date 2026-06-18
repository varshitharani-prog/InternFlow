import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditApplication({ setApplications }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company: "",
    role: "",
    location: "",
    oaDateTime: "",
    interviewDateTime: "",
    notes: ""
  });

  useEffect(() => {
    async function fetchApplication() {
      try {
        const res = await fetch(
          `http://localhost:5000/applications/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        const data = await res.json();

        console.log("Data:", data);

        if (!res.ok) {
          console.log(data);
          return;
        }

        setForm({
          company: data.company || "",
          role: data.role || "",
          location: data.location || "",
          oaDateTime: data.oaDateTime || "",
          interviewDateTime: data.interviewDateTime || "",
          notes: data.notes || ""
        });

      } catch (error) {
        console.log(error);
      }
    }

    fetchApplication();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSave() {
    try {
      const res = await fetch(
        `http://localhost:5000/applications/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(form)
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log(data);
        return;
      }

      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? data : app
        )
      );

      navigate("/applications");

    } catch (error) {
      console.log("Save error:", error);
    }
  }

  return (
    <div className="edit-container">
      <h1>Edit Application</h1>

      <input
        type="text"
        name="company"
        value={form.company}
        onChange={handleChange}
        placeholder="Company"
      />

      <input
        type="text"
        name="role"
        value={form.role}
        onChange={handleChange}
        placeholder="Role"
      />

      <input
        type="text"
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Location"
      />
      <div className="form-group">
      <label>OA Date&Time</label>
      <input
        type="datetime-local"
        name="oaDateTime"
        value={form.oaDateTime}
        onChange={handleChange}
      />
      </div>
      <div className="form-group">
      <label>Interview Date&Time</label>
      <input
        type="datetime-local"
        name="interviewDateTime"
        value={form.interviewDateTime}
        onChange={handleChange}
      />
      </div>
      <textarea
        name="notes"
        value={form.notes}
        onChange={handleChange}
        placeholder="Notes"
      />

      <button onClick={handleSave}>
        Save Changes
      </button>

      <button onClick={() => navigate("/applications")}>
        Cancel
      </button>
    </div>
  );
}

export default EditApplication;