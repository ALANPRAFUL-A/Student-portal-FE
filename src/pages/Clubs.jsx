import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Clubs.css"

function Clubs() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await axios.get("https://student-portal-1-571f.onrender.com/api/clubs");
        setClubs(res.data);
      } catch (err) {
        console.error("Failed to load clubs", err);
      }
    };

    fetchClubs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://student-portal-1-571f.onrender.com/api/clubs/${id}`);
      setClubs(clubs.filter((club) => club._id !== id));
    } catch (err) {
      console.error("Failed to delete club", err);
    }
  };

  return (
    <div className="club">
      <h2>Student Clubs</h2>
      {clubs.length === 0 ? (
        <p>No clubs found.</p>
      ) : (
        <ul>
          {clubs.map((club) => (
            <li key={club._id}>
              <h3>{club.name}</h3>
              <p>{club.description}</p>
              <p><strong>President:</strong> {club.president}</p>
              <p><strong>Members:</strong> {club.membersCount}</p>
              {club.image && <img src={club.image} alt={club.name} width="200" />}
              <button onClick={() => handleDelete(club._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Clubs;
