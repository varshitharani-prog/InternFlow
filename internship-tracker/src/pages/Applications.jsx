import { useState } from "react";
import {useNavigate} from "react-router-dom";
import AddApplication from "../components/AddApplication";

function Applications({
  applications,
  setApplications
}) {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [filter, setFilter] = useState("All");
  const navigate=useNavigate();
  

  // UPDATE STATUS
  async function updateStatus(id, newStatus) {
    try{
      await fetch(
      `http://localhost:5000/applications/${id}`,
      {
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body:JSON.stringify({
        status:newStatus,
      }),
      }
      );
      setApplications(prev=>
        prev.map(app=>
          app._id===id?{...app,status:newStatus}:app
        )
      );
    }
    catch(error){
      console.log(error);
    }
  }

  // DELETE
  async function deleteApplication(id) {
    try{
      await fetch(
        `http://localhost:5000/applications/${id}`,
        {
        method:"DELETE",
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
        }
      );
      setApplications(prev=> prev.filter(app=>app._id!==id));
    }
    catch(error){
      console.log(error);
    }
  }

  // FILTER APPLICATIONS
  const filteredApplications = applications.filter((app)=>{
    const matchSearch=
    search===""||
    app.company.toLowerCase().includes(search.toLowerCase()) ||
    app.role.toLowerCase().includes(search.toLowerCase());
    
    const matchFilter=filter==="All"||app.status===filter;
    return matchSearch&&matchFilter;
  });
  
  let sortedApplications=[...filteredApplications];
  if(sortOrder==="newest"){
    sortedApplications.reverse();
  }
  function formatDateTime(dateTime) {
    if (!dateTime) return "";
    const [date, time] = dateTime.split("T");
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year} ${time}`;
  }

  return (
    <div className="app-container">
      <div className="applications-header">
        <h1>Applications</h1>

        <p>
          Manage and track all your internship applications in one place.
          Stay organized by monitoring application statuses, interview
          schedules, assessments, and recruitment progress throughout your
          internship journey.
        </p>
      </div>

      <AddApplication
        applications={applications}
        setApplications={setApplications}
      />

      <br />
      
      <div className="list-header">
        <h2>Applications List</h2>

        <p>
          View, search, filter, and update your internship applications.
          Keep track of every opportunity and stay on top of upcoming
          assessments and interviews.
        </p>
      </div>
      <input
        type="text"
        placeholder="Search company or role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
      <option value="newest">Newest First</option>
      <option value="oldest">Oldest First</option>
      </select>

      <select
        value={filter}
        onChange={(e) =>
          setFilter(e.target.value)
        }
      >
        <option value="All">All</option>

        <option value="Applied">
          Applied
        </option>

        <option value="OA Scheduled">
          OA Scheduled
        </option>

        <option value="OA Completed">
          OA Completed
        </option>

        <option value="Interview Scheduled">
          Interview Scheduled
        </option>

        <option value="Interview Completed">
          Interview Completed
        </option>

        <option value="Selected">
          Selected
        </option>

        <option value="Accepted">
          Accepted
        </option>

        <option value="Rejected">
          Rejected
        </option>
      </select>

      {filteredApplications.length === 0 ? (
        <p style={{color:"white"}}>No applications found</p>
      ) : (
        sortedApplications.map((app) => {

          return (
            <div
              key={app._id}
              className="card"
            >
              <p>
                <strong>Company:</strong>{" "}
                {app.company}
              </p>

              <p>
                <strong>Role:</strong>{" "}
                {app.role}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className={`status status-${app.status.toLowerCase().replace(" ", "-")}`}>
                  {app.status}
                </span>
              </p>

              {app.location && (
               <p>
               <strong>Location:</strong> {app.location}
               </p>
              )}

              {app.oaDateTime && (
               <p>
               <strong>OA Date&Time:</strong>{" "}{formatDateTime(app.oaDateTime)}
               </p>
              )}

              {app.interviewDateTime && (
               <p>
               <strong>Interview Date&Time:</strong> {" "} {formatDateTime(app.interviewDateTime)}
               </p>
              )}

              {app.notes && (
               <p>
                <strong>Notes:</strong> {app.notes}
                </p>
              )}

              <select
                value={app.status}
                onChange={(e) =>
                  updateStatus(
                    app._id,
                    e.target.value
                  )
                }
              >
                
                <option value="Applied">
                  Applied
                </option>

                <option value="OA Scheduled">
                  OA Scheduled
                </option>

                <option value="OA Completed">
                  OA Completed
                </option>

                <option value="Interview Scheduled">
                  Interview Scheduled
                </option>

                <option value="Interview Completed">
                  Interview Completed
                </option>

                <option value="Selected">
                  Selected
                </option>

                <option value="Accepted">
                  Accepted
                </option>

                <option value="Rejected">
                  Rejected
                </option>
                
              </select>

              <button
                onClick={() =>
                  navigate(`/edit/${app._id}`)
                }
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteApplication(
                    app._id
                  )
                }
              >
                Delete
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Applications;