const {
  Account,
  Currency,
  CurrencyExchageRate,
  User,
  Transfer,
} = require("../../models");
const moment = require("moment");
const { Op } = require("sequelize");

module.exports = {
  async validateTransfer(
    uid,
    sender_account_id,
    recipient_email,
    recipient_account_number,
    sender_amount
  ) {
    let payload = { status: false };
    let recipient_amount = 0;
    let exchangeRate = 1;
    let exchangeRateApplied = true;
    try {
      // Get recipient user
      let recipientUser = await User.findOne({
        where: { email: recipient_email },
      });
      if (recipientUser == null) throw new Error("Recipient user not found");

      // Get recipient account
      let recipientAccount = await Account.findOne({
        where: {
          number: recipient_account_number,
          user_id: recipientUser.uid,
          active: true,
        },
        include: [{ model: Currency, required: true }],
      });
      if (recipientAccount == null)
        throw new Error("Recipient account not found");

      // Get sender account
      let senderAccount = await Account.findOne({
        where: { id: sender_account_id, user_id: uid, active: true },
        include: [{ model: Currency, required: true }],
      });
      if (senderAccount == null) throw new Error("Sender account not found");

      // Validate that the sender and recipient accounts are not the same
      if (senderAccount.id == recipientAccount.id)
        throw new Error(
          "Receipient's account cannot be the same as sender's account"
        );

      // Validate exchange rates
      if (recipientAccount.Currency.id == senderAccount.Currency.id) {
        recipient_amount = sender_amount.toFixed(2);
        exchangeRateApplied = false;
      } else {
        let leftExchangeRate = await CurrencyExchageRate.findOne({
          where: {
            from_currency_id: senderAccount.Currency.id,
            to_currency_id: recipientAccount.Currency.id,
          },
        });
        let rightExchangeRate = await CurrencyExchageRate.findOne({
          where: {
            from_currency_id: recipientAccount.Currency.id,
            to_currency_id: senderAccount.Currency.id,
          },
        });
        if (leftExchangeRate) exchangeRate = leftExchangeRate.exchange_rate;
        if (rightExchangeRate)
          exchangeRate =
            rightExchangeRate.exchange_rate != 0
              ? 1 / rightExchangeRate.exchange_rate
              : 1;
        recipient_amount = (sender_amount * exchangeRate).toFixed(2) * 1;
        exchangeRateApplied = true;
        exchangeRate = exchangeRate.toFixed(2) * 1;
      }
      let transfer = {
        recipient_account: recipientAccount,
        sender_account: senderAccount,
        sender_amount,
        recipient_amount,
        exchangeRateApplied,
        exchangeRate,
      };
      payload = { status: true, transfer };
    } catch (err) {
      console.error(err);
      payload = { status: false, message: err.message };
    }
    return payload;
  },

  async getTransferTransaction(uid, from, to) {
    let transfers = null;
    try {
      // Set find criteria
      let outgoingTransfersFind = {
        attributes: [
          "sender_user_id",
          "sender_currency_id",
          "sender_account_id",
          "createdAt",
          "sender_amount",
        ],
        where: { sender_user_id: uid },
        include: [
          { model: Currency, required: true, as: "sender_currency" },
          { model: Account, required: true, as: "sender_account" },
        ],
        order: [["createdAt", "DESC"]],
      };
      let incomingTransfersFind = {
        attributes: [
          "recipient_user_id",
          "recipient_currency_id",
          "recipient_account_id",
          "createdAt",
          "recipient_amount",
        ],
        where: { recipient_user_id: uid },
        include: [
          { model: Currency, required: true, as: "recipient_currency" },
          { model: Account, required: true, as: "recipient_account" },
        ],
        order: [["createdAt", "DESC"]],
      };
      if (from && moment(from).isValid()) {
        let fromDate = moment(from).toDate();
        let toDate =
          to && moment(to).isValid() ? moment(to).toDate() : moment().toDate();
        outgoingTransfersFind.where.createdAt = {
          [Op.between]: [fromDate, toDate],
        };
        incomingTransfersFind.where.createdAt = {
          [Op.between]: [fromDate, toDate],
        };
      } else {
        outgoingTransfersFind.limit = 10;
        incomingTransfersFind.limit = 10;
      }
      // Outgoing transfers
      let outgoingTrasfers = await Transfer.findAll(outgoingTransfersFind);
      outgoingTrasfers = outgoingTrasfers.map((transfer) => {
        let transferNewFormat = {};
        transferNewFormat.expense = true;
        transferNewFormat.amount = transfer.sender_amount;
        transferNewFormat.transaction_date = transfer.createdAt;
        transferNewFormat.recipient = "Budget Transfer";
        transferNewFormat.transfer = true;
        transferNewFormat.Currency = transfer.sender_currency;
        transferNewFormat.Account = transfer.sender_account;
        transferNewFormat.Category = { description: "Transfer" };
        return transferNewFormat;
      });
      // incoming transfers
      let incomingTransfers = await Transfer.findAll(incomingTransfersFind);
      incomingTransfers = incomingTransfers.map((transfer) => {
        let transferNewFormat = {};
        transferNewFormat.expense = false;
        transferNewFormat.amount = transfer.recipient_amount;
        transferNewFormat.transaction_date = transfer.createdAt;
        transferNewFormat.recipient = "Budget Transfer";
        transferNewFormat.transfer = true;
        transferNewFormat.Currency = transfer.recipient_currency;
        transferNewFormat.Account = transfer.recipient_account;
        transferNewFormat.Category = { description: "Transfer" };
        return transferNewFormat;
      });
      transfers = outgoingTrasfers.concat(incomingTransfers);
    } catch (err) {
      console.error(err);
      transfers = null;
    }
    return transfers;
  },
};
