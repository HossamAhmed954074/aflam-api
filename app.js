const express = require("express");
// enable CORS -> Cross-Origin Resource Sharing
const cors = require("cors");
// security middleware
const helmet = require("helmet");
// rate limiter middleware
const rateLimit = require("./middleware/limeterMiddleware");
// create express app
const app = express();
// load environment variables from .env file
require("dotenv").config();

// set port
const port = process.env.PORT || 3000;
const aflamRouter = require("./router/aflam_router");
const catigoriesRouter = require("./router/catigories_router");
const httpStatusConstant = require("./utils/httpStatusConstant");
const userRouter = require("./router/user_router");

app.use(rateLimit);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", aflamRouter);
app.use("/api/v1", catigoriesRouter);
app.use("/api/v1", userRouter);

app.get("/", (req, res) => {
  res.send("Hello world in aflam api");
});

// fallback handler for unknown routes
// use app.use with no path so we don't pass a string route into path-to-regexp
app.use((req, res) => {
  res.status(404).json({
    status: httpStatusConstant.ERROR,
    message: "The Route not found",
  });
});

// global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.statusText || httpStatusConstant.ERROR,
    message: err.message || "Internal Server Error",
  });
});

// start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
