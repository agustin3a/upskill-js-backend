module.exports.validateTransferSchema = {
  sender_amount: {
    in: ["body"],
    isFloat: true,
    toFloat: true,
  },
  sender_account_id: {
    in: ["body"],
    isInt: true,
    toInt: true,
  },
  recipient_account_number: {
    in: ["body"],
    isString: true,
    toString: true,
  },
  recipient_email: {
    in: ["body"],
    isEmail: true,
    toString: true,
  }
};
