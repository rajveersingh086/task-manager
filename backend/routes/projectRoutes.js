const express = require("express");
const router = express.Router();

const Project = require("../models/Project");
const auth = require("../middleware/authMiddleware");


// ✅ 1. CREATE PROJECT (tu already bana chuka hai)
router.post("/", auth, async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = new Project({
      name,
      description,
      owner: req.user.id,
      members: [{ user: req.user.id, role: "admin" }]
    });

    await project.save();
    res.json(project);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// ✅ 2. GET ALL PROJECTS
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find({
      "members.user": req.user.id
    });

    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// ✅ 3. GET SINGLE PROJECT
router.get("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// ✅ 4. ADD MEMBER
router.post("/:id/add-member", auth, async (req, res) => {
  try {
    const { userId, role } = req.body;

    const project = await Project.findById(req.params.id);

    const isAdmin = project.members.find(
      m => m.user.toString() === req.user.id && m.role === "admin"
    );

    if (!isAdmin) {
      return res.status(403).json({ msg: "Only admin can add members" });
    }

    project.members.push({
      user: userId,
      role: role || "member"
    });

    await project.save();

    res.json(project);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// ✅ 5. DELETE PROJECT
router.delete("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    const isAdmin = project.members.find(
      m => m.user.toString() === req.user.id && m.role === "admin"
    );

    if (!isAdmin) {
      return res.status(403).json({ msg: "Only admin can delete" });
    }

    await project.deleteOne();

    res.json({ msg: "Project deleted" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


module.exports = router;