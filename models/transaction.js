'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.User, { foreignKey: "user_id" });
      Transaction.belongsTo(models.Currency,{  foreignKey: "currency_id"  });
      Transaction.belongsTo(models.Account, { foreignKey: "account_id" });
      Transaction.belongsTo(models.Category, { foreignKey: "category_id" } )
    }
  };
  Transaction.init({
    expense: DataTypes.BOOLEAN,
    amount: DataTypes.FLOAT,
    transaction_date: DataTypes.DATE,
    recipient: DataTypes.STRING,
    display: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions'
  });
  return Transaction;
};