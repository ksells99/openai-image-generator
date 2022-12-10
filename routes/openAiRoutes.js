const express = require("express");
const { generateImage } = require("../controllers/openAiController");
const router = express.Router();

router.post("/generate-image", generateImage);

module.exports = router;
