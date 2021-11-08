const { AccountType } = require("../../models");
const { validationResult } = require("express-validator");
const _ = require("lodash");
const InternalServerErrorPayload = {
  status: false,
  message: "Internal server error",
};
const AccountTypeNotFoundErrorPayload = {
  status: false,
  message: "Account type not found",
};
const AccountTypeParams = ["description"];

module.exports = {
  // Create account type
  create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ status: false, errors: errors.array() });
    }
    let newAccountTypeParams = _.pick(req.body, AccountTypeParams);
    AccountType.create(newAccountTypeParams)
      .then((accountType) => {
        res.status(200).send({ status: true, accountType });
      })
      .catch((error) => {
        res.status(500).json(InternalServerErrorPayload);
      });
  },

  // Get all account types
  list(req, res) {
    AccountType.findAll()
      .then((accountTypes) => {
        let payload = { status: true, accountTypes };
        res.status(200).json(payload);
      })
      .catch((err) => {
        console.error(error);
        res.status(500).json(InternalServerErrorPayload);
      });
  },

  // Get account type by id
  find(req, res) {
    let { id } = req.params;
    AccountType.findAll({ where: { id } })
      .then((accountTypes) => {
        if (accountTypes.length > 0) {
          res.status(200).json({ status: true, accountType: accountTypes[0] });
        } else {
          res.status(404).json(AccountTypeNotFoundErrorPayload);
        }
      })
      .catch((err) => {
        res.status(500).json(InternalServerErrorPayload);
      });
  },

  // Update account
  async update(req, res) {
    let { id } = req.params;
    let { description } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ status: false, errors: errors.array() });
    }
    try {
      let accountTypes = await AccountType.findAll({ where: { id } });
      if (accountTypes.length > 0) {
        let accountType = accountTypes[0];
        accountType.description = description;
        await accountType.save();
        res.status(200).json({ status: true, accountType });
      } else {
        res.status(404).json(AccountTypeNotFoundErrorPayload);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(InternalServerErrorPayload);
    }
  }
};
