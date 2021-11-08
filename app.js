const express = require("express");
const cors = require("cors");
const transactionsRoutes = require("./src/routes/transactions");
const accountsRoutes = require("./src/routes/accounts");
const categoriesRoutes = require("./src/routes/categories");
const accountTypesRoutes = require("./src/routes/accountTypes");
const userRoutes = require("./src/routes/users");
const currenciesRoutes = require("./src/routes/currencies");
const transfersRoutes = require("./src/routes/transfers");
const firebaseGuard = require("./src/guard/fb-guard");

const app = express();
const port = 1337;


var logger = function (req, res, next) {
  let time = new Date();
  let { method, path } = req;
  console.log(`${time} ${method} ${path}`);
  next();
};

// Middlewares
app.use(logger);
app.use(cors());
app.use(firebaseGuard);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(transactionsRoutes);
app.use(accountsRoutes);
app.use(categoriesRoutes);
app.use(accountTypesRoutes);
app.use(userRoutes);
app.use(currenciesRoutes);
app.use(transfersRoutes);

app.get("/", (req, res) => {
  res.send("Upskill JS Backend Project");
});

app.get("/version", (req, res) => {
  res.send(process.env.npm_package_version);
});

// Error handler
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json({ status: false, message: 'Internal sever error'});
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
