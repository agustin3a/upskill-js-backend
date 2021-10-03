const express = require("express");
const app = express();
const port = 1337;

app.get("/", (req, res) => {
  res.send("Upskill JS Backend Project");
});

app.get("/version", (req, res) => {
  res.send(process.env.npm_package_version);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
