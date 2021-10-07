var { TRANSACTIONS } = require("../util/dummyData");
const { v4: uuidv4 } = require("uuid");

module.exports = class Transaction {
  constructor(transactionType,category,targetAccountName,account,currency,amount,date) {
    this.transactionType = transactionType;
    this.category = category;
    this.targetAccountName = targetAccountName;
    this.account = account;
    this.currency = currency;
    this.amount = amount;
    this.date = date;
    this.createdDate = new Date();
    this.id = uuidv4();
  }

  save() {
    TRANSACTIONS.push(this);
  }

  update(transactionType,category,targetAccountName,account,currency,amount,date) {
    this.transactionType = transactionType;
    this.category = category;
    this.targetAccountName = targetAccountName;
    this.account = account;
    this.currency = currency;
    this.amount = amount;
    this.date = date;
    TRANSACTIONS = TRANSACTIONS.map((transaction) => {
      if(transaction.id == this.id) return this;
      return transaction;
    });
    return this;
  }

  delete() {
    TRANSACTIONS = TRANSACTIONS.filter((transaction) => {
      return transaction.id != this.id;
    });
    return this;
  }

  static findById(id) {
    return TRANSACTIONS.filter((transaction) => id == transaction.id );
  }

  static fetchAll() {
      return TRANSACTIONS;
  }

};