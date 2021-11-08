module.exports.createUserSchema = {
  first_name: {
    in: ["body"],
    isString: true,
    toString: true,
  },
  last_name: {
    in: ["body"],
    isString: true,
    toString: true,
  },
  email: {
    in: ["body"],
    isEmail: true,
    toString: true,
  },
};

module.exports.updateUserSchema = {
  first_name: {
    in: ["body"],
    isString: true,
    toString: true,
  },
  last_name: {
    in: ["body"],
    isString: true,
    toString: true,
  },
};
