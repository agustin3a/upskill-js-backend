const express = require("express");
const transactionsRoutes = require("./src/routes/transactions");
const accountsRoutes =  require("./src/routes/accounts");
const categoriesRoutes = require("./src/routes/categories");
const app = express();
const port = 1337;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(transactionsRoutes);

app.use(accountsRoutes);

app.use(categoriesRoutes);

app.get("/", (req, res) => {
  res.send("Upskill JS Backend Project");
});

app.get("/version", (req, res) => {
  res.send(process.env.npm_package_version);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
