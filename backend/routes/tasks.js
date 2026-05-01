const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");


// 🔥 GET ALL TASKS (user-wise)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// 🔥 CREATE TASK
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ msg: "Title is required" });
    }

    const task = new Task({
      title,
      description,
      status,
      dueDate,
      user: req.user.id,
    });

    await task.save();
    res.status(201).json(task);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// 🔥 UPDATE STATUS
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // ✅ security fix
      { status: req.body.status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.status(200).json(task);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// 🔥 DELETE TASK
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id, // ✅ security
    });

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.status(200).json({ msg: "Task deleted successfully" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


module.exports = router;