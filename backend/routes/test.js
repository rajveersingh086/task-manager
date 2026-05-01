const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "Test route working" });
});

module.exports = router;