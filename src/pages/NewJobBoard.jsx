import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/NewJobBoard.css'

function NewJobBoard() {
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    location: "",
    contact: "",
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
      await axios.post("https://student-portal-1-571f.onrender.com/api/jobs", formData);
      alert("Job created successfully!");
      navigate("/jobs");
    } catch (error) {
      console.error("Error creating job", error);
      alert("Failed to create job");
    }
  };

  return (
    <div className="jobboardform">
      <h2 className="jobboardheading">Create a New Job</h2>
      <form onSubmit={handleSubmit} className="jobboard-form">
        <input
          className="jobboardinput"
          type ="text"
          name="role"
          placeholder=" Enter Job role"
          value={formData.role}
          onChange={handleChange}
          required
        />
        
        <input
          className="jobboardinput"
          type="text"
          name="company"
          placeholder="Enter company"
          value={formData.company}
          onChange={handleChange}
          required
        />
        
       <input
          
          className="jobboardinput"
          type="text"
          name="location"
          placeholder="Enter location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        
       <input
          className="jobboardinput"
          type="text"
          name="contact"
          placeholder="Enter contact"
          value={formData.contact}
          onChange={handleChange}
          required
        />
        
        <button type="submit" className="submitbutton">Create Job</button>
      </form>
    </div>
  );
}

export default NewJobBoard;
