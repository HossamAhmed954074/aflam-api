const express = require("express");
var cors = require('cors')
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;
const aflamRouter = require("./router/aflam_router");
const catigoriesRouter = require("./router/catigories_router");

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
  res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
