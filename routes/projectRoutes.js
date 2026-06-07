const express = require("express");
const router = express.Router();

const {
  getProjects,
  getProjectBySlug,
  createProject,
  getFeaturedProjects,
} = require("../controllers/projectController");

router.get("/", getProjects);
router.get("/:slug", getProjectBySlug);
router.post("/", createProject);
router.get("/featured", getFeaturedProjects);

module.exports = router;