import { useEffect, useState } from "react";
import API from "../services/api";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // 🔹 Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // 🔹 Create task
  const createTask = async () => {
    if (!title) return alert("Enter task title");

    try {
      await API.post("/tasks", {
        title,
        status: "pending",
      });

      setTitle("");
      fetchTasks();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // 🔹 Update task status
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, { status });
      fetchTasks();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // 🔹 Delete task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Tasks 📋</h2>

      {/* Create Task */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Task"
        style={{ padding: "8px", marginRight: "10px" }}
      />
      <button onClick={createTask}>Add</button>

      {/* List */}
      {tasks.length === 0 ? (
        <p>No tasks</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "8px",
            }}
          >
            <h4>{task.title}</h4>
            <p>Status: {task.status}</p>

            <button
              onClick={() => updateStatus(task._id, "completed")}
              style={{ marginRight: "10px" }}
            >
              Complete
            </button>

            <button onClick={() => deleteTask(task._id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Tasks;