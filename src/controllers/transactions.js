const Transaction = require("../models/transaction");
const { validationResult } = require('express-validator');

// Return all transactions
module.exports.getTransactions = (req, res) => {
  let payload = { status: true, transactions: Transaction.fetchAll() };
  return res.status(200).json(payload);
};

// Search a transaction by id
module.exports.getTransaction = (req, res) => {
    let { transactionId } = req.params;
    let transaction = Transaction.findById(transactionId);
    let payload = { status: true, transaction }
    let statusCode = 200;
    if(transaction.length === 0) {
        payload.status =  false;
        payload.errorMessage = "Transaction not found";
        statusCode = 404;
    }
    return res.status(statusCode).json(payload);
};

module.exports.createTransaction = (req, res) => {
  const errors = validationResult(req);
  let { transactionType, category, targetAccountName, account, currency, amount, date } = req.body;
  if (!errors.isEmpty()) {
    return res.status(500).json({ status: false, errors: errors.array() });
  }
  let transaction = new Transaction(transactionType,category,targetAccountName,account,currency,amount,date);
  transaction.save();
  return res.status(200).json({ status :  true, transaction });
}

module.exports.updateTransaction = (req, res) => {
  const errors = validationResult(req);
  let { transactionType, category, targetAccountName, account, currency, amount, date } = req.body;
  let { transactionId } = req.params;
  let payload = { status: true };
  let statusCode = 200;
  if (!errors.isEmpty()) {
    return res.status(500).json({ status: false, errors: errors.array() });
  }
  let transactionsList = Transaction.findById(transactionId);
  if(transactionsList.length > 0) {
    let transaction = transactionsList[0];
    transaction.update(transactionType, category, targetAccountName, account, currency, amount, date);
    payload.transaction = [ transaction ];
  } else {
    payload.status =  false;
    payload.errorMessage = "Transaction not found";
    statusCode = 404;
  }
  return res.status(statusCode).json(payload);
}

module.exports.deleteTransaction = (req, res) => {
  let { transactionId } = req.params;
  let payload = { status: true };
  let statusCode = 200;
  let transactionsList = Transaction.findById(transactionId);
  if(transactionsList.length > 0) {
    let transaction = transactionsList[0];
    transaction.delete();
    payload.transaction = [ transaction ];
  } else {
    payload.status =  false;
    payload.errorMessage = "Transaction not found";
    statusCode = 404;
  }
  return res.status(statusCode).json(payload);
}
