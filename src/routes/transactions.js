var express = require("express");
var router = express.Router();
const { checkSchema } = require('express-validator');
const transactionController = require('../controllers/transactions');
const transactionsValidationSchemas = require('../validation/transaction');

// get transactions
router.get("/transactions", transactionController.list);

// get transaction
router.get("/transaction/:id", transactionController.find);

// create transaction
router.post("/transaction",checkSchema(transactionsValidationSchemas.createTransactionSchema), transactionController.create);

// update transaction
router.put("/transaction/:id", checkSchema(transactionsValidationSchemas.updateTransactionSchema),transactionController.update);

module.exports = router;
