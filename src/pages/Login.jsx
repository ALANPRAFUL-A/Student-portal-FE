import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://student-portal-1-571f.onrender.com/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token); 
      onLogin({
        ...res.data.student,
        token: res.data.token,
        });

      navigate("/dashboard");
    } catch (err) {
      alert("Login failed: " + err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="loginform">
      <h2 className="loginheading">Login</h2>
      <form onSubmit={handleLogin} className="login-form">
      
      <input
        className="logininput"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="logininput"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="submitbutton">Login</button>
    </form></div>
    
  );
}

export default Login;
