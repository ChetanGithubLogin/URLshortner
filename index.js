require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const urlRouter = require("./router/url");
const app = express();
const path = require("path");
const URL = require("./models/url");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use("/api/url", urlRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB111"))
  .catch((err) => console.log(err));

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", { allUrls });
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
