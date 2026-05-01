import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

    console.log(res.data);

    // 🔥 IMPORTANT LINE
    localStorage.setItem("token", res.data.token);

    navigate("/dashboard");

  } catch (err) {
    alert(err.response?.data?.msg || "Login failed");
  }
};

  return (
    <div className="container">
      <div className="card">
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to continue</p>

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p className="link" onClick={() => navigate("/register")}>
          Don't have an account? Register
        </p>
      </div>
    </div>
  );
}

export default Login;