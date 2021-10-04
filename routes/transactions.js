var express = require("express");
var router = express.Router();

// Dummy categories list
const categories = [
  "Groceries",
  "Entertainment",
  "Transfer",
  "Transport",
  "Gifts",
  "Medicine",
  "Studies",
  "Services",
];

// Dummy bank accounts
const bankAccounts = ["2342342", "2112223", "11132344"];

// Dummy transactions generator
const generateTransactionItems = (numberOfItems) => {
  let stores = [
    "Budget",
    "Walmart",
    "Apple store",
    "Spotify",
    "Movies",
    "Laptop",
    "React.js Upskill Program",
    "Gas",
    "Max",
  ];
  let transactionTypes = ["Expense", "Income"];
  let currencies = ["USD", "GTQ"];
  let transactionItems = [];
  for (let i = 0; i < numberOfItems; i++) {
    transactionItems.push({
      transactionType:
        transactionTypes[(Math.random() * transactionTypes.length) | 0],
      category: categories[(Math.random() * categories.length) | 0],
      targetAccountName: stores[(Math.random() * stores.length) | 0],
      bankAccount: bankAccounts[(Math.random() * bankAccounts.length) | 0],
      currency: currencies[(Math.random() * currencies.length) | 0],
      amount: Math.random() * (i + 1) * 100,
      date: new Date(),
      key: i,
    });
  }
  return transactionItems;
};

// get transactions
router.get("/", (req, res) => {
  let transactions = generateTransactionItems(10);
  let payload = { status: true, transactions };
  res.status(200).json(payload);
});

// create transaction
router.post("/", (req, res) => {
  let { body } = req;
  let payload = { status: true, transaction: body };
  res.status(200).json(payload);
});

// update transaction
router.put("/:transactionId", (req, res) => {
  let { transactionId } = req.params;
  let { body } = req;
  let payload = { status: true, transactionId, transaction: body };
  res.status(200).json(payload);
});

// delete transaction
router.delete("/:transactionId", (req, res) => {
  let { transactionId } = req.params;
  let { body } = req;
  let payload = { status: true, transactionId, transaction: body };
  res.status(200).json(payload);
});

module.exports = router;
