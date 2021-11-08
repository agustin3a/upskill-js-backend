'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CurrencyExchageRate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CurrencyExchageRate.belongsTo(models.Currency, { foreignKey: "from_currency_id" });
      CurrencyExchageRate.belongsTo(models.Currency, {  foreignKey: "to_currency_id" });
    }
  };
  CurrencyExchageRate.init({
    exchange_rate: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'CurrencyExchageRate',
    tableName: 'currency_exchage_rates'
  });
  return CurrencyExchageRate;
};