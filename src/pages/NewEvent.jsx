import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/NewEvent.css"

function NewEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    image: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://student-portal-be.onrender.com/api/events", formData);
      alert("Event created successfully!");
      navigate("/events");
    } catch (error) {
      console.error("Error creating event", error);
      alert("Failed to create event");
    }
  };

  return (
    <div className="eventform">
      <h2 className="eventheading">Create a New Event</h2>
      <form onSubmit={handleSubmit} className="event-form">
        <input
          className="eventinput"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        
        <textarea
          className="eventinput"
          name="description"
          placeholder="Event Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        
        <input
          
          className="eventinput"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        
        <input
          className="eventinput"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        
        <input
          className="eventinput"
          name="image"
          placeholder="Image URL (optional)"
          value={formData.image}
          onChange={handleChange}
        />
        
        <button type="submit" className="submitbutton">Create Event</button>
      </form>
    </div>
  );
}

export default NewEvent;
