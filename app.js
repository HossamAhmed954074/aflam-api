const express = require("express");
const cors = require("cors");
const helmt = require('helmet');
const { rateLimit } = require("express-rate-limit");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;
const aflamRouter = require("./router/aflam_router");
const catigoriesRouter = require("./router/catigories_router");
const httpStatusConstant = require("./utils/httpStatusConstant");


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  message : "To Many Requstes From This IP , Please Try Again Later .."
  // store: ... , // Redis, Memcached, etc. See below.
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);
app.use(helmt())
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", aflamRouter);
app.use("/api/v1", catigoriesRouter);

app.get("/", (req, res) => {
  res.send("Hello world in aflam api");
});

// fallback handler for unknown routes
// use app.use with no path so we don't pass a string route into path-to-regexp
app.use((req, res) => {
  res.status(404).json({
    status: httpStatusConstant.ERROR,
    error: "The Route not found",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
