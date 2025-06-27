import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/NewClub.css"

function NewClub() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    membersCount: "",
    president: "",
    image: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ 
      ...formData,
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://student-portal-1-571f.onrender.com/api/clubs", formData);
      navigate("/clubs");
    } catch (err) {
      console.error("Error creating club", err);
    }
  };

  return (
    
    <div className="clubform">
      <h2 className="clubheading">Create a New Club</h2>
      <form onSubmit={handleSubmit}
      className="club-form">
        <input name="name" placeholder="Club Name" onChange={handleChange} required className="clubinput"/>
        <textarea name="description" placeholder="Description" onChange={handleChange} className="clubinput"/>
        <input name="membersCount" type="number" placeholder="Members Count" onChange={handleChange}className="clubinput" />
        <input name="president" placeholder="President Name" onChange={handleChange} className="clubinput" />
        <input name="image" placeholder="Image URL (optional)" onChange={handleChange} className="clubinput" />
        <button type="submit" className="submitbutton">Create Club</button>
      </form>
    </div>
  );
}

export default NewClub;
