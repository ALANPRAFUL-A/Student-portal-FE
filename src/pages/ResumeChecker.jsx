import { useState } from "react";
import axios from "axios";
import '../styles/ResumeChecker.css'

function ResumeChecker() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("resume", file);
    try {
      const res = await axios.post("https://student-portal-be.onrender.com/upload", formData);
      setResult(res.data);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };
  return (
    <div className="resumecheckerform" style={{ padding: 20 }}>
      <h1 className="resumecheckerheading">Resume ATS Checker</h1>
      <div className="resumechecker-form">
        <label for="file" className="resumecheckerlable">Uplode Resume</label>
        <input name="file" id="file" type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button className="submitbutton" onClick={handleUpload}>Check Resume</button>
      </div>
      

      {result && (
        <div style={{ marginTop: 20 }}>
          <h2>ATS Score: {result.atsScore}/100</h2>
          <h3>Suggestions:</h3>
          <ul>
            {result.suggestions.length === 0
              ? <li style={{ color: "green" }}>Looks perfect! 🚀</li>
              : result.suggestions.map((s, i) => (
                  <li key={i} style={{ color: "red" }}>{s}</li>
                ))
            }
          </ul>
        </div>
      )}
    </div>
  );
}

export default ResumeChecker;
