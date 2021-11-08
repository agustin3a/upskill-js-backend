const { Currency } = require("../../models");
const { validationResult } = require("express-validator");
const _ = require("lodash");
const InternalServerErrorPayload = {
  status: false,
  message: "Internal server error",
};
const CurrencyNotFoundErrorPayload = {
  status: false,
  message: "Currency not found",
};
const CurrencyParams = ["code"];

module.exports = {
  // Create category
  create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ status: false, errors: errors.array() });
    }
    let newCurrencyParams = _.pick(req.body, CurrencyParams);
    Currency.create(newCurrencyParams)
      .then((currency) => {
        res.status(200).send({ status: true, currency });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(InternalServerErrorPayload);
      });
  },

  // Get all categories enable to be displayed
  list(req, res) {
    Currency.findAll()
      .then((currencies) => {
        let payload = { status: true, currencies };
        res.status(200).json(payload);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(InternalServerErrorPayload);
      });
  },

  // Get category by id
  find(req, res) {
    let { id } = req.params;
    Currency.findAll({ where: { id } })
      .then((currencies) => {
        if (currencies.length > 0) {
          res.status(200).json({ status: true, category: currencies[0] });
        } else {
          res.status(404).json(CurrencyNotFoundErrorPayload);
        }
      })
      .catch((err) => {
        console.err(err);
        res.status(500).json(InternalServerErrorPayload);
      });
  },

  // Update category
  async update(req, res) {
    let { id } = req.params;
    let { code } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ status: false, errors: errors.array() });
    }
    try {
      let currencies = await Currency.findAll({ where: { id } });
      if (currencies.length > 0) {
        let currency = currencies[0];
        currency.code = code;
        await currency.save();
        res.status(200).json({ status: true, currency });
      } else {
        res.status(404).json(CurrencyNotFoundErrorPayload);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(InternalServerErrorPayload);
    }
  },
};
