module.exports.createTransactionSchema = {
  transactionType: {
    in: ["body"],
    isString: true,
  },
  category: {
    in: ["body"],
    isInt: true,
    toInt: true,
  },
  targetAccountName: {
    in: ["body"],
    isString: true,
  },
  account: {
    in: ["body"],
    isInt: true,
    toInt: true,
  },
  currency: {
    in: ["body"],
    isString: true,
  },
  amount: {
    in: ["body"],
    isFloat: true,
    toFloat: true,
  },
  date: {
    in: ["body"],
    isDate: true,
    toDate: true,
  },
};

module.exports.updateTransactionSchema = {
  transactionId: {
    in: ["params"],
    isString: true,
  },
  transactionType: {
    in: ["body"],
    isString: true,
  },
  category: {
    in: ["body"],
    isInt: true,
    toInt: true,
  },
  targetAccountName: {
    in: ["body"],
    isString: true,
  },
  account: {
    in: ["body"],
    isInt: true,
    toInt: true,
  },
  currency: {
    in: ["body"],
    isString: true,
  },
  amount: {
    in: ["body"],
    isFloat: true,
    toFloat: true,
  },
  date: {
    in: ["body"],
    isDate: true,
    toDate: true,
  },
};
