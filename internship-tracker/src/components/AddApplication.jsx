import { useState } from "react";

function AddApplication({ setApplications }) {

  const [form, setForm] = useState({
    company: "",
    role: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  }

  async function handleAdd() {
    if (!form.company || !form.role) return;

    const newApplication = {
      company: form.company,
      role: form.role,
      status: "Applied",
      location: "",
      oaDateTime: "",
      interviewDateTime: "",
      notes: ""
    };

    try {
      const res = await fetch(
        "http://localhost:5000/applications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(newApplication)
        }
      );

      const data = await res.json();

      console.log("Saved to backend:", data);

      // update UI with backend response
      setApplications(prev => [...prev, data]);

      // reset form
      setForm({
        company: "",
        role: ""
      });

    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <div>
      <h2 style={{ color: "white" }}>
        Add Application
      </h2>
      <input
        type="text"
        name="company"
        placeholder="Company"
        value={form.company}
        onChange={handleChange}
      />

      <input
        type="text"
        name="role"
        placeholder="Role"
        value={form.role}
        onChange={handleChange}
      />
      <br/>

      <button className="add" onClick={handleAdd}>
        Add Application
      </button>
    </div>
  );
}

export default AddApplication;
