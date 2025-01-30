const shortid = require("shortid");
const URL = require("../models/url");
async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.redirecURL) {
    return res.status(400).json({ message: "redirecURL is required" });
  }
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.redirecURL,
    visitHistory: [],
  });
  return res.status(200).json({ id: shortID });
}

async function handleGetShortId(req, res) {
  const shortId = req.params.shortId;
  if (!shortId) {
    return res.status(400).json({ message: "redirecURL is required" });
  }
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
}

async function handleGetSAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  res.status(200).json({
    totalClicks: result.visitHistory.length,
    visitHistory: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetShortId,
  handleGetSAnalytics,
};
