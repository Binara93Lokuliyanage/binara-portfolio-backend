const Project = require("../models/Project");

const DEFAULT_CARD_VIDEO = "/projects/videos/card-videos/project-video.mp4";

exports.getProjectsWithCustomVideos = async (req, res) => {
  try {
    const projects = await Project.find({
      cardVideo: { $ne: DEFAULT_CARD_VIDEO },
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch projects with custom videos",
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