var express = require("express");
var router = express.Router();
const { checkSchema } = require('express-validator');
var accountsController = require("../controllers/accounts");
const accountsValidationSchemas = require('../validation/accounts');

// get accounts
router.get("/accounts", accountsController.getAccounts);

// get account
router.get("/account/:accountId", accountsController.getAccount);

// update account
router.put("/account/:accountId", checkSchema(accountsValidationSchemas.updateAccountSchema), accountsController.updateAccount);

// delete account
router.delete("/account/:accountId", accountsController.deleteAccount);

// create account
router.post("/account", checkSchema(accountsValidationSchemas.createAccountSchema), accountsController.createAccount);

module.exports = router;
  