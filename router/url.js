const express = require("express");
const router = express.Router();
const {
  handleGenerateNewShortURL,
  handleGetShortId,
  handleGetSAnalytics,
} = require("../controllers/url");

router.post("/", handleGenerateNewShortURL);

router.get("/:shortId", handleGetShortId);
router.get("/analytics/:shortId", handleGetSAnalytics);
module.exports = router;
