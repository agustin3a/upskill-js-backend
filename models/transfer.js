"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transfer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Sender associations
      Transfer.belongsTo(models.User, {
        as: "sender_user",
        foreignKey: "sender_user_id",
      });
      Transfer.belongsTo(models.Currency, {
        as: "sender_currency",
        foreignKey: "sender_currency_id",
      });
      Transfer.belongsTo(models.Account, {
        as: "sender_account",
        foreignKey: "sender_account_id",
      });
      // Recipient associantions
      Transfer.belongsTo(models.User, {
        as: "recipient_user",
        foreignKey: "recipient_user_id",
      });
      Transfer.belongsTo(models.Currency, {
        as: "recipient_currency",
        foreignKey: "recipient_currency_id",
      });
      Transfer.belongsTo(models.Account, {
        as: 'recipient_account',
        foreignKey: "recipient_account_id",
      });
    }
  }
  Transfer.init(
    {
      sender_amount: DataTypes.FLOAT,
      recipient_amount: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Transfer",
      tableName: "transfers",
    }
  );
  return Transfer;
};
