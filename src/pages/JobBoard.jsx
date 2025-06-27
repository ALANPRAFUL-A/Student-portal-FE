import { useEffect, useState } from "react";
import axios from "axios";


function JobBoard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("https://student-portal-1-571f.onrender.com/api/jobs");
        setJobs(res.data);
      } catch (error) {
        console.error("Failed to fetch Jobs", error);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
  try {
    await fetch(`https://student-portal-1-571f.onrender.com/api/jobs/${id}`, {
      method: "DELETE",
    });
    setJobs(jobs.filter((job) => job._id !== id));
  } catch (error) {
    console.error("Failed to delete Jobs", error);
  }
};


  return (
    <div>
      <h2>Upcoming Jobs</h2>
      {jobs.length === 0 ? (
        <p>No Jobs found.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job._id}>  
              <h3>{job.role}</h3>
              <p>{job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Contact :</strong> {job.contact}</p>
              <button onClick={() => handleDelete(job._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default JobBoard;
