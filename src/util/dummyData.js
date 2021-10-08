const { v4: uuidv4 } = require("uuid");

module.exports.CATEGORIES = [
  { id: 1, displayName: "Groceries" },
  { id: 2, displayName: "Entertainment" },
  { id: 3, displayName: "Transfer" },
  { id: 4, displayName: "Transport" },
  { id: 5, displayName: "Gifts" },
  { id: 6, displayName: "Medicine" },
  { id: 7, displayName: "Studies" },
  { id: 8, displayName: "Services" },
];

module.exports.ACCOUNTS = [
  { id: 1, number: "2342342", type: 2, name: "Edward", balance: 0 },
  { id: 2, number: "2112223", type: 2, name: "Alphonse", balance: 100 },
  { id: 3, number: "11132344", type: 1, name: "John", balance: 500 },
];

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
      category: module.exports.CATEGORIES[(Math.random() * module.exports.CATEGORIES.length) | 0].id,
      targetAccountName: stores[(Math.random() * stores.length) | 0],
      account: module.exports.ACCOUNTS[(Math.random() * module.exports.ACCOUNTS.length) | 0].id,
      currency: currencies[(Math.random() * currencies.length) | 0],
      amount: Math.random() * (i + 1) * 100,
      date: new Date(),
      id: uuidv4(),
    });
  }
  return transactionItems;
};

module.exports.TRANSACTIONS = generateTransactionItems(10);
