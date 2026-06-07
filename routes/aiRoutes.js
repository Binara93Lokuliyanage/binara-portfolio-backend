const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController");

router.post("/job-match", aiController.jobMatch);

module.exports = router;