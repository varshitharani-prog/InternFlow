import { useState,useEffect } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    cgpa: "",
    skills: "",
    goal: "",
    resume:"",
    cgpaSheet:""
  });
  const [files, setFiles] = useState({
    resume: null,
    cgpaSheet: null
  });

  async function fetchProfile() {
    try {
      const res = await fetch("http://localhost:5000/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = await res.json();
      console.log("Profile data:", data);

      
      setProfile({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        college: data.college || "",
        cgpa: data.cgpa || "",
        skills: data.skills || "",
        goal: data.goal || "",
        resume: data.resume || "",
        cgpaSheet: data.cgpaSheet || ""
      });

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
  fetchProfile();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setProfile({
      ...profile,
      [name]: value
    });
  }

  async function handleSubmit(e) {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("name", profile.name);
    formData.append("email", profile.email);
    formData.append("phone", profile.phone);
    formData.append("college", profile.college);
    formData.append("cgpa", profile.cgpa);
    formData.append("skills", profile.skills);
    formData.append("goal", profile.goal);

    if (files.resume) {
      formData.append("resume", files.resume);
    }

    if (files.cgpaSheet) {
      formData.append("cgpaSheet", files.cgpaSheet);
    }

    const res = await fetch("http://localhost:5000/profile", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: formData
    });

    const data = await res.json();
    await fetchProfile();
    console.log("Saved:", data);
    alert("Profile saved!");
  } catch (error) {
    console.log(error);
  }

}
  return (
    <div className="profile">
      <h1>Profile</h1>

      {profile.name && (
        <h3>Welcome, {profile.name}</h3>
      )}

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <br />
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={profile.name}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Email</label>
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={profile.email}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Phone</label>
        <br />
        <input
          type="tel"
          name="phone"
          placeholder="Enter Phone Number"
          value={profile.phone}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>College</label>
        <br />
        <input
          type="text"
          name="college"
          placeholder="Enter College Name"
          value={profile.college}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>CGPA</label>
        <br />
        <input
          type="text"
          name="cgpa"
          placeholder="Enter CGPA"
          value={profile.cgpa}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Skills</label>
        <br />
        <input
          type="text"
          name="skills"
          placeholder="Enter Skills"
          value={profile.skills}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Career Goal</label>
        <br />
        <textarea
          name="goal"
          placeholder="Enter Career Goal"
          value={profile.goal}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Resume</label>
        <input
          type="file"
          id="resume"
          style={{display:"none"}}
          onChange={(e) =>
            setFiles({ ...files, resume: e.target.files[0] })
          }
        />
        <label htmlFor="resume" className="btn" style={{color:"#2563eb",fontSize:14}}>
          Choose Resume
        </label>
        {profile.resume && (
        <p>
          <a href={`http://localhost:5000/${profile.resume}`} target="_blank">
            View Resume
          </a>
        </p>
      )}

        <label>CGPA Sheet</label>
        <input
          type="file"
          id="cgpa"
          style={{display:"none"}}
          onChange={(e) =>
            setFiles({ ...files, cgpaSheet: e.target.files[0] })
          }
        />
  
        <label htmlFor="cgpa" className="btn" style={{color:"#2563eb",fontSize:14}}>
          Choose CGPA Sheet
        </label>
        {profile.cgpaSheet && (
        <p>
          <a href={`http://localhost:5000/${profile.cgpaSheet}`} target="_blank">
            View CGPA Sheet
          </a>
        </p>
      )}
        <button type="submit">
          Save Profile
        </button>
      </form>
  
    </div>
  );
}

export default Profile;