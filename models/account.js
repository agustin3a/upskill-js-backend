"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account.belongsTo(models.User, { foreignKey: "user_id" });
      Account.belongsTo(models.AccountType, {  foreignKey: "account_type_id" });
      Account.belongsTo(models.Currency,{  foreignKey: "currency_id"  });
    }
  }
  Account.init(
    {
      holder: DataTypes.STRING,
      number: DataTypes.STRING,
      bank: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      balance: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Account",
      tableName: "accounts",
    }
  );
  return Account;
};
