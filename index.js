require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const urlRouter = require("./router/url");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/url", urlRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB111"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
