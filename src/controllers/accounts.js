const Account = require('../models/account');

module.exports.getAccounts = (req, res) => {
  let payload = { status: true, accounts: Account.fetchAll()};
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
  let { number } = req.body;
  let payload = { status: true };
  let statusCode = 200;
  if (number) {
    let account = new Account(number);
    account.save();
    payload.account = account;
  } else {
    payload.errorMessage = "Invalid payload";
    payload.status = false;
    statusCode = 500;
  }
  res.status(statusCode).json(payload);
};

module.exports.updateAccount = (req, res) => {
  let payload = { status: true };
  let statusCode = 200;
  let { accountId } = req.params;
  let { number } = req.body;
  let accountList = Account.findById(accountId);
  if (accountList.length > 0) {
      let account = accountList[0];
      if(number) {
        account.update(number);
        payload.account = account;
      } else {
        payload.errorMessage = "Invalid payload";
        payload.status = false;
        statusCode = 500;
      }
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