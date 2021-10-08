const Account = require("../models/account");
const { validationResult } = require("express-validator");

module.exports.getAccounts = (req, res) => {
  let payload = { status: true, accounts: Account.fetchAll() };
  res.status(200).json(payload);
};

module.exports.getAccount = (req, res) => {
  let payload = { status: true };
  let statusCode = 200;
  let { accountId } = req.params;
  let account = Account.findById(accountId);
  payload.account = account;
  if (account.length === 0) {
    payload.status = false;
    payload.errorMessage = "Account not found";
    statusCode = 404;
  }
  res.status(statusCode).json(payload);
};

module.exports.createAccount = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ status: false, errors: errors.array() });
  }
  let { number, name, type } = req.body;
  let account = new Account(number, name, type);
  account.save();
  let payload = { status: true, account };
  let statusCode = 200;

  res.status(statusCode).json(payload);
};

module.exports.updateAccount = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ status: false, errors: errors.array() });
  }
  let payload = { status: true };
  let statusCode = 200;
  let { accountId } = req.params;
  let { number, name, type } = req.body;
  let accountList = Account.findById(accountId);
  if (accountList.length > 0) {
    let account = accountList[0];
    account.update(number,name,type);
    payload.account = account;
  } else {
    payload.status = false;
    payload.errorMessage = "Account not found";
    statusCode = 404;
  }
  res.status(statusCode).json(payload);
};

module.exports.deleteAccount = (req, res) => {
  let payload = { status: true };
  let statusCode = 200;
  let { accountId } = req.params;
  let accountList = Account.findById(accountId);
  if (accountList.length > 0) {
    let account = accountList[0];
    account.delete();
    payload.account = account;
  } else {
    payload.status = false;
    payload.errorMessage = "Account not found";
    statusCode = 404;
  }
  res.status(statusCode).json(payload);
};
