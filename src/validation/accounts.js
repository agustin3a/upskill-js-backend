module.exports.createAccountSchema = {
  number: {
    in: ["body"],
    isString: true,
    toString: true
  },
  name: {
    in: ["body"],
    isString: true,
    toString: true
  },
  type: {
    in: ["body"],
    isInt: true,
    toInt: true,
  }
};

module.exports.updateAccountSchema = {
  accountId: {
    in: ["params"],
    isString: true,
  },
  number: {
    in: ["body"],
    isString: true,
    toString: true
  },
  name: {
    in: ["body"],
    isString: true,
    toString: true
  },
  type: {
    in: ["body"],
    isInt: true,
    toInt: true,
  }
};