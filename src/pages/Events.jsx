import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Events.css"

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("https://student-portal-1-571f.onrender.com/api/events");
        setEvents(res.data);
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
  try {
    await fetch(`https://student-portal-1-571f.onrender.com/api/events/${id}`, {
      method: "DELETE",
    });
    setEvents(events.filter((event) => event._id !== id)); 
  } catch (error) {
    console.error("Failed to delete event", error);
  }
};


  return (
    <div className="event">
      <h2>Upcoming Events</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event._id}>  
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {event.location}</p>
              {event.image && <img src={event.image} alt={event.title} width="200" />}
              <button onClick={() => handleDelete(event._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Events;
