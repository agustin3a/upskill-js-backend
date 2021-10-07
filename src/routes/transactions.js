var express = require("express");
var router = express.Router();
const { checkSchema, check } = require('express-validator');
const transactionController = require('../controllers/transactions');
const transactionsValidationSchemas = require('../validation/transaction');

// get transactions
router.get("/transactions", transactionController.getTransactions);

// get transaction
router.get("/transaction/:transactionId", transactionController.getTransaction);

// create transaction
router.post("/transaction",checkSchema(transactionsValidationSchemas.createTransactionSchema), transactionController.createTransaction);

// update transaction
router.put("/transaction/:transactionId", checkSchema(transactionsValidationSchemas.updateTransactionSchema),transactionController.updateTransaction);

// delete transaction
router.delete("/transaction/:transactionId",transactionController.deleteTransaction);

module.exports = router;
