const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const aflamRouter = require("./router/aflam_router");
const catigoriesRouter = require("./router/catigories_router");
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", aflamRouter);
app.use("/api/v1", catigoriesRouter);


app.get("/", (req, res) => {
  res.send("Hello world in aflam api");
});

app.listen(port, () => {
  console.log("the server live in port" + port);
});
