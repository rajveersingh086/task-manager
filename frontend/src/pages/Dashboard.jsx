import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await API.get("/tasks");

      const tasks = res.data;

      const total = tasks.length;
      const completed = tasks.filter(
        (t) => t.status === "completed"
      ).length;

      const pending = tasks.filter(
        (t) => t.status === "pending"
      ).length;

      const now = new Date();
      const overdue = tasks.filter(
        (t) =>
          t.dueDate &&
          new Date(t.dueDate) < now &&
          t.status !== "completed"
      ).length;

      setStats({ total, completed, pending, overdue });

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard 🚀</h1>

      {/* 🔥 Stats */}
      <div style={{ marginBottom: "20px" }}>
        <p>Total Tasks: {stats.total}</p>
        <p>Completed: {stats.completed}</p>
        <p>Pending: {stats.pending}</p>
        <p>Overdue: {stats.overdue}</p>
      </div>

      {/* 🔥 Buttons */}
      <button onClick={() => navigate("/tasks")}>
        Go to Tasks
      </button>

      <br /><br />

      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;