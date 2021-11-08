var express = require("express");
var router = express.Router();
const { checkSchema } = require('express-validator');
const AccountsController = require("../controllers/accounts");
const accountsValidationSchemas = require('../validation/accounts');

// get accounts
router.get("/accounts", AccountsController.list);

// get account
router.get("/account/:id", AccountsController.find);

// update account
router.put("/account/:id", checkSchema(accountsValidationSchemas.updateAccountSchema), AccountsController.update);

// create account
router.post("/account", checkSchema(accountsValidationSchemas.createAccountSchema), AccountsController.create);

module.exports = router;
  