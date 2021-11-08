const { User } = require("../../models");
const { validationResult } = require("express-validator");
const _ = require("lodash");
const InternalServerErrorPayload = {
  status: false,
  message: "Internal server error",
};
const UserNotFoundErrorPayload = {
  status: false,
  message: "User not found",
};
const CreateUserParams = ["first_name", "last_name", "email"];

module.exports = {
  // Create user
  create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ status: false, errors: errors.array() });
    }
    let newUserParams = _.pick(req.body, CreateUserParams);
    newUserParams.uid = req.user.uid;
    User.create(newUserParams)
      .then((user) => {
        res.status(200).send({ status: true, user });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(InternalServerErrorPayload);
      });
  },

  // Find user by id
  find(req, res) {
    let uid = req.user.uid;
    User.findAll({ where: { uid } })
      .then((users) => {
        if (users.length > 0) {
          res.status(200).json({ status: true, user: users[0] });
        } else {
          res.status(404).json(UserNotFoundErrorPayload);
        }
      })
      .catch((err) => {
        res.status(500).json(InternalServerErrorPayload);
      });
  },

  // Update user
  async update(req, res) {
    let uid = req.user.uid;
    let { first_name, last_name } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ status: false, errors: errors.array() });
    }
    try {
      let users = await User.findAll({ where: { uid } });
      if (users.length > 0) {
        let user = users[0];
        user.first_name = first_name;
        user.last_name = last_name;
        await user.save();
        res.status(200).json({ status: true, user });
      } else {
        res.status(404).json(UserNotFoundErrorPayload);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(InternalServerErrorPayload);
    }
  },
};
