var express = require("express");
var router = express.Router();
var accountsController = require("../controllers/accounts");

// get accounts
router.get("/accounts", accountsController.getAccounts);

// get account
router.get("/account/:accountId", accountsController.getAccount);

// update account
router.put("/account/:accountId", accountsController.updateAccount);

// create account
router.post("/account", accountsController.createAccount);

// delete account
router.delete("/account/:accountId", accountsController.deleteAccount);
  
module.exports = router;
  