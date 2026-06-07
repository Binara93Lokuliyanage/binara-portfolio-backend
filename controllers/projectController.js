const Project = require("../models/Project");

exports.getFeaturedProjects = async (req, res) => {
  try {
    const projects = await Project.find({ featured: true });

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch featured projects",
      error: error.message,
    });
  }
};

// GET all projects
exports.getProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

// GET single project
exports.getProjectBySlug = async (req, res) => {
  const project = await Project.findOne({
    slug: req.params.slug,
  });

  res.json(project);
};

// CREATE project
exports.createProject = async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json(project);
};