const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");


// ✅ CREATE TASK
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, projectId, assignedTo, dueDate } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    const task = new Task({
      title,
      description,
      project: projectId,
      assignedTo,
      dueDate
    });

    await task.save();
    res.json(task);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// ✅ DASHBOARD (⚠️ ALWAYS FIRST)
router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find();

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "completed").length;
    const pending = tasks.filter(t => t.status === "pending").length;

    const overdue = tasks.filter(t =>
      t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "completed"
    ).length;

    res.json({ total, completed, pending, overdue });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// ✅ GET TASKS BY PROJECT (⚠️ ONLY ONCE)
router.get("/:projectId", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// ✅ UPDATE TASK
router.put("/:taskId", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json(task);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// ✅ DELETE TASK (ADMIN ONLY)
router.delete("/:taskId", authMiddleware, role("admin"), async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.taskId);

    if (!task) {
      return res.status(200).json({ msg: "Task already deleted" });
    }

    res.json({ msg: "Task deleted successfully" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// ✅ EXPORT LAST
module.exports = router;