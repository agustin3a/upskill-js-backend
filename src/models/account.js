var { ACCOUNTS } = require("../util/dummyData");
const { v4: uuidv4 } = require("uuid");

module.exports = class Account {
  constructor(number) {
    this.number = number;
    this.id = uuidv4();
  }

  save() {
    ACCOUNTS.push(this);
  }

  update(number) {
    this.number = number;
    ACCOUNTS = ACCOUNTS.map((account) => {
      if(account.id == this.id) account.number = number;
      return account;
    });
    return this;
  }

  delete() {
    ACCOUNTS = ACCOUNTS.filter((account) => {
      return account.id != this.id;
    });
    return this;
  }

  static findById(id) {
    return ACCOUNTS.filter((account) => id == account.id );
  }

  static fetchAll() {
      return ACCOUNTS;
  }

};
