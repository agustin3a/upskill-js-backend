const { Currency, CurrencyExchageRate } = require("../../models");

module.exports = {
  // Create transaction
  async init(req, res) {
    try {
      let currencyGTQ = await Currency.findOne({ where: { code: "GTQ" } });
      let curreyncUSD = await Currency.findOne({ where: { code: "USD" } });
      let currencyEUR = await Currency.findOne({ where: { code: "EUR" } });
      // USD -> GTQ
      if (curreyncUSD && currencyGTQ) {
        let exchangeUSDtoGTQ = await CurrencyExchageRate.findOne({
          where: {
            from_currency_id: curreyncUSD.id,
            to_currency_id: currencyGTQ.id,
          },
        });
        if (!exchangeUSDtoGTQ) {
          await CurrencyExchageRate.create({
            from_currency_id: curreyncUSD.id,
            to_currency_id: currencyGTQ.id,
            exchange_rate: 7.74,
          });
        }
      }
      // USD -> EUR
      if (curreyncUSD && currencyEUR) {
        let exchangeUSDtoEUR = await CurrencyExchageRate.findOne({
          where: {
            from_currency_id: curreyncUSD.id,
            to_currency_id: currencyEUR.id,
          },
        });
        if (!exchangeUSDtoEUR) {
          await CurrencyExchageRate.create({
            from_currency_id: curreyncUSD.id,
            to_currency_id: currencyEUR.id,
            exchange_rate: 0.86,
          });
        }
      }
      // EUR -> GTQ
      if (currencyEUR && currencyGTQ) {
        let exchangeEURtoGTQ = await CurrencyExchageRate.findOne({
          where: {
            from_currency_id: currencyEUR.id,
            to_currency_id: currencyGTQ.id,
          },
        });
        if (!exchangeEURtoGTQ) {
          await CurrencyExchageRate.create({
            from_currency_id: currencyEUR.id,
            to_currency_id: currencyGTQ.id,
            exchange_rate: 8.94,
          });
        }
      }

      return res.status(200).send({ status: true });
    } catch (err) {
      console.error(err);
      return res.status(200).json({ status: false });
    }
  },
};
