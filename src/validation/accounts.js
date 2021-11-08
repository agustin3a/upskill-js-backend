module.exports.createAccountSchema = {
  holder: {
    in: ["body"],
    isString: true,
    toString: true,
  },
  number: {
    in: ["body"],
    isString: true,
    toString: true,
  },
  bank: {
    in: ["body"],
    isString: true,
    toString: true,
  },
  active: {
    in: ["body"],
    isBoolean: true,
    toBoolean: true,
  },
  balance: {
    in: ["body"],
    isFloat: true,
    toFloat: true,
  },
  account_type_id: {
    in: ["body"],
    isInt: true,
    toInt: true,
  },
  currency_id: {
    in: ["body"],
    isInt: true,
    toInt: true,
  },
};

module.exports.updateAccountSchema = {
  holder: {
    in: ["body"],
    isString: true,
    toString: true,
  },
  number: {
    in: ["body"],
    isString: true,
    toString: true,
  },
  bank: {
    in: ["body"],
    isString: true,
    toString: true,
  },
  active: {
    in: ["body"],
    isBoolean: true,
    toBoolean: true,
  },
  account_type_id: {
    in: ["body"],
    isInt: true,
    toInt: true,
  }
};
