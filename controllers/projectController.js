const Project = require("../models/Project");

// GET all projects
exports.getProjects = async (req, res) => {
  const projects = await Project.find();

  const sortedProjects = projects.sort((a, b) => {
    const defaultVideo = "/projects/videos/card-videos/project-video.mp4";

    const aIsDefault = a.cardVideo === defaultVideo;
    const bIsDefault = b.cardVideo === defaultVideo;

    if (aIsDefault && !bIsDefault) return 1;
    if (!aIsDefault && bIsDefault) return -1;

    return 0;
  });

  res.json(sortedProjects);
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