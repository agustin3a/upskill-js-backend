const {
  Transaction,
  Account,
  Category,
  Currency,
  Transfer,
} = require("../../models");
const { validationResult } = require("express-validator");
const _ = require("lodash");
const TransferSevice = require("../services/transferService");
const AccountService = require("../services/accountService");
const InternalServerErrorPayload = {
  status: false,
  message: "Internal server error",
};
const TransferNotFoundErrorPayload = {
  status: false,
  message: "Transfer not found",
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
  // Create trasnfer
  async create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({
        status: false,
        errors: errors.array(),
        message: "Fields are not valid",
      });
    }
    try {
      let {
        sender_amount,
        sender_account_id,
        recipient_account_number,
        recipient_email,
      } = req.body;
      let uid = req.user.uid;
      let transferValidate = await TransferSevice.validateTransfer(
        uid,
        sender_account_id,
        recipient_email,
        recipient_account_number,
        sender_amount
      );
      if (!transferValidate.status) return res.status(500).json(payload);
      let transfer = await Transfer.create({
        sender_user_id: uid,
        sender_currency_id:
          transferValidate.transfer.sender_account.Currency.id,
        sender_account_id: transferValidate.transfer.sender_account.id,
        recipient_user_id: transferValidate.transfer.recipient_account.user_id,
        recipient_currency_id:
          transferValidate.transfer.recipient_account.Currency.id,
        recipient_account_id: transferValidate.transfer.recipient_account.id,
        sender_amount: transferValidate.transfer.sender_amount,
        recipient_amount: transferValidate.transfer.recipient_amount,
      });
      // Update account balances
      await AccountService.updateBalance(
        uid,
        transfer.sender_account_id,
        transfer.sender_amount * -1
      );
      await AccountService.updateBalance(
        transfer.recipient_user_id,
        transfer.recipient_account_id,
        transfer.recipient_amount
      );
      return res.status(200).json({ status: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json(InternalServerErrorPayload);
    }
  },

  async validate(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({
        status: false,
        errors: errors.array(),
        message: "Fields are not valid",
      });
    }
    let {
      sender_amount,
      sender_account_id,
      recipient_account_number,
      recipient_email,
    } = req.body;
    let uid = req.user.uid;
    let payload = await TransferSevice.validateTransfer(
      uid,
      sender_account_id,
      recipient_email,
      recipient_account_number,
      sender_amount
    );
    let statusCode = payload.status ? 200 : 500;
    if (payload.status) {
      payload.transfer.recipient_account = _.pick(
        payload.transfer.recipient_account,
        ["holder", "number", "currency_id", "Currency", "bank"]
      );
    }
    return res.status(statusCode).json(payload);
  },

  // Get trasnfer by id
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
          res.status(404).json(TransferNotFoundErrorPayload);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(InternalServerErrorPayload);
      });
  },
};
