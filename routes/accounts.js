var express = require("express");
var router = express.Router();

// Dummy bank accounts
const bankAccounts = ["2342342", "2112223", "11132344"];

// get accounts
router.get("/", (req, res) => {
    let payload = { status: true, bankAccounts };
    res.status(200).json(payload);
  });
  
  // create account
  router.post("/", (req, res) => {
    let { body } = req;
    let payload = { status: true, transaction: body };
    res.status(200).json(payload);
  });
  
  // update account
  router.put("/:accountId", (req, res) => {
    let { accountId } = req.params;
    let { body } = req;
    let payload = { status: true, accountId, transaction: body };
    res.status(200).json(payload);
  });
  
  // delete account
  router.delete("/:accountId", (req, res) => {
    let { accountId } = req.params;
    let { body } = req;
    let payload = { status: true, accountId, transaction: body };
    res.status(200).json(payload);
  });
  
  module.exports = router;
  