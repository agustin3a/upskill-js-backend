module.exports.createTransactionSchema = {
  expense: {
    in: ["body"],
    isBoolean: true,
    toBoolean: true,
  },
  amount: {
    in: ["body"],
    isFloat: true,
    toFloat: true,
  },
  transaction_date: {
    in: ["body"],
    isDate: true,
    toDate: true,
  },
  recipient: {
    in: ["body"],
    isString: true,
    toString: true,
  },
  display: {
    in: ["body"],
    isBoolean: true,
    toBoolean: true,
  },
  currency_id: {
    in: ["body"],
    isInt: true,
    toInt: true,
  },
  account_id: {
    in: ["body"],
    isInt: true,
    toInt: true,
  },
  category_id: {
    in: ["body"],
    isInt: true,
    toInt: true,
  },
};

module.exports.updateTransactionSchema = {
  expense: {
    in: ["body"],
    isBoolean: true,
    toBoolean: true,
  },
  amount: {
    in: ["body"],
    isFloat: true,
    toFloat: true,
  },
  transaction_date: {
    in: ["body"],
    isDate: true,
    toDate: true,
  },
  recipient: {
    in: ["body"],
    isString: true,
    toString: true,
  },
  display: {
    in: ["body"],
    isBoolean: true,
    toBoolean: true,
  },
  category_id: {
    in: ["body"],
    isInt: true,
    toInt: true,
  },
};
