function Reminders({ reminders }) {
  function formatDateTime(dateTime) {
    if (!dateTime) return "";

    const date = new Date(dateTime);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }

  function isUrgent(dateTime) {
    const now = new Date();
    const eventTime = new Date(dateTime);

    const diffHours = (eventTime - now) / (1000 * 60 * 60);

    return diffHours > 0 && diffHours <= 24;
  }

  function isPast(dateTime) {
    return new Date(dateTime) < new Date();
  }

  return (
    <div className=" rem-container">
      <h1 className="rem-head">Upcoming Events</h1>
      <p className="rem-text">
        Never miss an important opportunity. View upcoming Online Assessments and Interviews, with urgent events highlighted for quick attention.
      </p>
      {reminders.length === 0 ? (
        <p>No Reminders</p>
      ) : (
        reminders
          .filter((r) => !isPast(r.dateTime))   
          .map((r, index) => (
            <div
              key={index}
              className={`card ${isUrgent(r.dateTime) ? "urgent" : "normal"}`}
            >
              <h3>{r.title}</h3>
              <p>{r.type}</p>
              <p>{formatDateTime(r.dateTime)}</p>
            </div>
          ))
      )}
    </div>
  );
}

export default Reminders;