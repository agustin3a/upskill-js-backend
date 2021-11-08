const { Account, AccountType, Currency } = require("../../models");
const { validationResult } = require("express-validator");
const _ = require("lodash");
const InternalServerErrorPayload = {
  status: false,
  message: "Internal server error",
};
const AccountNotFoundErrorPayload = {
  status: false,
  message: "Account not found",
};
const AccountParams = [
  "holder",
  "number",
  "bank",
  "active",
  "balance",
  "account_type_id",
  "currency_id",
];

module.exports = {
  // Create account
  async create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ status: false, errors: errors.array(), message: 'Fields are not valid' });
    }
    let newAccountParams = _.pick(req.body, AccountParams);
    newAccountParams.user_id = req.user.uid;
    try {
      let account = await Account.create(newAccountParams);
      let AccountType = await account.getAccountType();
      let Currency = await account.getCurrency();
      account.AccountType = AccountType;
      account.Currency = Currency;
      return res.status(200).send({ status: true, account : { ...account.dataValues, Currency, AccountType } });
    } catch(err) {
      console.error(err);
      return res.status(500).json({ status: false, message: err.parent.detail });
    }
  },

  // Get all accounts
  list(req, res) {
    let uid = req.user.uid;
    Account.findAll({
      where: { user_id: uid },
      include: [
        { model: AccountType, required: true },
        { model: Currency, required: true }, 
      ],
      order: [["createdAt", "DESC"]]
    })
      .then((accounts) => {
        let payload = { status: true, accounts };
        res.status(200).json(payload);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(InternalServerErrorPayload);
      });
  },

  // Get account by id
  find(req, res) {
    let { id } = req.params;
    let uid = req.user.uid;
    Account.findAll({
      where: { id , user_id: uid },
      include: [
        { model: AccountType, required: true },
        { model: Currency, required: true },
      ],
    })
      .then((accounts) => {
        if (accounts.length > 0) {
          res.status(200).json({ status: true, account: accounts[0] });
        } else {
          res.status(404).json(AccountNotFoundErrorPayload);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(InternalServerErrorPayload);
      });
  },

  // Update account
  async update(req, res) {
    let { id } = req.params;
    let uid = req.user.uid;
    let { holder, number, bank, active, account_type_id } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ status: false, errors: errors.array() });
    }
    try {
      let accounts = await Account.findAll({ where: { id, user_id: uid } });
      if (accounts.length > 0) {
        let account = accounts[0];
        account.holder = holder;
        account.number = number;
        account.bank = bank;
        account.active = active;
        account.account_type_id = account_type_id;
        await account.save();
        let AccountType = await account.getAccountType();
        let Currency = await account.getCurrency();
        res.status(200).json({ status: true, account : { ...account.dataValues, Currency, AccountType } });
      } else {
        res.status(404).json(AccountNotFoundErrorPayload);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(InternalServerErrorPayload);
    }
  },
};
