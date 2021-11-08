module.exports.manipulateCategory = {
  description: {
    in: ["body"],
    isString: true,
    toString: true,
  },
  display: {
    in: ["body"],
    isBoolean: true,
    toBoolean: true,
  },
};
