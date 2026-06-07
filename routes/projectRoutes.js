const express = require("express");
const router = express.Router();

const {
  getProjects,
  getProjectBySlug,
  createProject,
  getFeaturedProjects,
} = require("../controllers/projectController");

router.get("/", getProjects);
router.post("/", createProject);
router.get("/featured", getFeaturedProjects);
router.get("/:slug", getProjectBySlug);

module.exports = router;