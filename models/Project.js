const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    ctaDescription: String,
    description: String,
    image: String,
    video: String,
    techStack: [],
    liveUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);