require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const connectDB = require("./db/connect.js");
const authRouter = require("./routes/auth.js");
const campSiteRouter = require("./routes/campSite.js");
const authMiddleware = require("./middleware/authMiddleware.js");
const errorMiddleware = require("./middleware/errorMiddleware.js");

app.use(require("cors")());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("../YelpCampF"));

app.use("/yelpcamp/auth", authRouter);
app.use("/yelpcamp/", campSiteRouter);

app.use("/", errorMiddleware);
app.use("/", (req, res) =>
  res.send("<h1>The page you are looking for does not exist yet</h2>")
);

const start = async function () {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(5000, () => console.log("app is listening"));
  } catch (e) {
    console.log(e);
  }
};

start();
