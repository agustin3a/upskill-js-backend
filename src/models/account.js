var { ACCOUNTS } = require("../util/dummyData");
const { v4: uuidv4 } = require("uuid");

module.exports = class Account {
  constructor(number,name,type) {
    this.number = number;
    this.name = name;
    this.type = type;
    this.id = uuidv4();
    this.balance = 0;
  }

  save() {
    ACCOUNTS.push(this);
  }

  update(number,name,type) {
    this.number = number;
    this.name = name;
    this.type = type;
    ACCOUNTS = ACCOUNTS.map((account) => {
      if(account.id == this.id) return this;
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
