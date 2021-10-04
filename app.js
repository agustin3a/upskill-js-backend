const express = require("express");
const transactions = require("./routes/transactions");
const accounts =  require("./routes/accounts");
const app = express();
const port = 1337;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Upskill JS Backend Project");
});

app.get("/version", (req, res) => {
  res.send(process.env.npm_package_version);
});

app.use('/transactions', transactions);

app.use('/accounts',accounts);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
