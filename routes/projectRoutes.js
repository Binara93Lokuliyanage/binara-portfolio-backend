const express = require("express");
const router = express.Router();

const {
  getProjects,
  getProjectBySlug,
  createProject,
  getProjectsWithCustomVideos,
} = require("../controllers/projectController");

router.get("/", getProjects);
router.get("/:slug", getProjectBySlug);
router.post("/", createProject);
router.get("/featured", getProjectsWithCustomVideos);

module.exports = router;