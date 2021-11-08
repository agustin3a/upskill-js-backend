"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AccountType extends Model {}
  AccountType.init({
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "AccountType",
      tableName: 'account_type',
    }
  );
  return AccountType;
};
