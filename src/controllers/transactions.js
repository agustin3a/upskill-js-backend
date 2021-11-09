const { Transaction, Account, Category, Currency } = require("../../models");
const { validationResult } = require("express-validator");
const TransferSevice = require("../services/transferService");
const AccountService = require("../services/accountService");
const { Op } = require("sequelize");
const _ = require("lodash");
const moment = require("moment");
const InternalServerErrorPayload = {
  status: false,
  message: "Internal server error",
};
const TransactionNotFoundErrorPayload = {
  status: false,
  message: "Transaction not found",
};
const TransactionParams = [
  "expense",
  "amount",
  "transaction_date",
  "recipient",
  "display",
  "currency_id",
  "account_id",
  "category_id",
];

module.exports = {
  // Create transaction
  async create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({
        status: false,
        errors: errors.array(),
        message: "Fields are not valid",
      });
    }
    let newTransactionParams = _.pick(req.body, TransactionParams);
    newTransactionParams.user_id = req.user.uid;
    try {
      let transaction = await Transaction.create(newTransactionParams);
      let Category = await transaction.getCategory();
      let Currency = await transaction.getCurrency();
      // Update account's balance
      let transactionAmount = transaction.expense
        ? transaction.amount * -1
        : transaction.amount;
      await AccountService.updateBalance(
        transaction.user_id,
        transaction.account_id,
        transactionAmount
      );
      let Account = await transaction.getAccount();
      return res.status(200).send({
        status: true,
        transaction: {
          ...transaction.dataValues,
          Currency,
          Account,
          Category,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json(InternalServerErrorPayload);
    }
  },

  // Get all transactions
  async list(req, res) {
    let uid = req.user.uid;
    let { from, to } = req.query;
    try {
      let transactionFind = {
        where: { user_id: uid, display: true },
        include: [
          { model: Category, required: true },
          { model: Currency, required: true },
          { model: Account, required: true },
        ],
        order: [["transaction_date", "DESC"]],
      };
      if (from && moment(from).isValid()) {
        let fromDate = moment(from).toDate();
        let toDate =
          to && moment(to).isValid() ? moment(to).toDate() : moment().toDate();
        transactionFind.where.transaction_date = {
          [Op.between]: [fromDate, toDate],
        };
      } else {
        transactionFind.limit = 10;
      }
      let transactions = await Transaction.findAll(transactionFind);
      let transfers = await TransferSevice.getTransferTransaction(
        uid,
        from,
        to
      );
      transactions = transactions.concat(transfers);
      transactions.sort((a, b) => {
        let aDate = new Date(a.transaction_date);
        let bDate = new Date(b.transaction_date);
        return aDate.getTime() > bDate.getTime()
          ? -1
          : aDate.getTime() < bDate.getTime()
          ? 1
          : 0;
      });
      let payload = { status: true, transactions };
      return res.status(200).json(payload);
    } catch (err) {
      console.error(err);
      return res.status(500).json(InternalServerErrorPayload);
    }
  },

  // Get transaction by id
  find(req, res) {
    let { id } = req.params;
    let uid = req.user.uid;
    Transaction.findAll({
      where: { id, user_id: uid, display: true },
      include: [
        { model: Category, required: true },
        { model: Currency, required: true },
        { model: Account, required: true },
      ],
    })
      .then((transactions) => {
        if (transactions.length > 0) {
          res.status(200).json({ status: true, transaction: transactions[0] });
        } else {
          res.status(404).json(TransactionNotFoundErrorPayload);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(InternalServerErrorPayload);
      });
  },

  // Update transaction
  async update(req, res) {
    let { id } = req.params;
    let uid = req.user.uid;
    let { expense, recipient, transaction_date, category_id, amount, display } =
      req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({
        status: false,
        errors: errors.array(),
        message: "Fields are not valid",
      });
    }
    try {
      let transactions = await Transaction.findAll({
        where: { id, user_id: uid },
      });
      if (transactions.length > 0) {
        let transaction = transactions[0];
        transaction.expense = expense;
        transaction.recipient = recipient;
        transaction.transaction_date = transaction_date;
        transaction.category_id = category_id;
        transaction.amount = amount;
        transaction.display = display;
        await transaction.save();
        let Category = await transaction.getCategory();
        let Currency = await transaction.getCurrency();
        let Account = await transaction.getAccount();
        res.status(200).json({
          status: true,
          transaction: {
            ...transaction.dataValues,
            Category,
            Currency,
            Account,
          },
        });
      } else {
        res.status(404).json(TransactionNotFoundErrorPayload);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(InternalServerErrorPayload);
    }
  },
};
