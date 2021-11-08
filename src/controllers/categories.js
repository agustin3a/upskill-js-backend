const { Category } = require("../../models");
const { validationResult } = require("express-validator");
const _ = require("lodash");
const InternalServerErrorPayload = {
  status: false,
  message: "Internal server error",
};
const CategoryNotFoundErrorPayload = {
  status: false,
  message: "Category not found",
};
const CategoryParams = ["description","display"];

module.exports = {

  // Create category
  create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ status: false, errors: errors.array() });
    }
    let newCategoryParams = _.pick(req.body, CategoryParams);
    Category.create(newCategoryParams)
      .then((category) => {
        res.status(200).send({ status: true, category });
      })
      .catch((error) => {
        res.status(500).json(InternalServerErrorPayload);
      });
  },

  // Get all categories enable to be displayed 
  list(req, res) {
    Category.findAll({ where : { display: true } })
      .then((categories) => {
        let payload = { status: true, categories };
        res.status(200).json(payload);
      })
      .catch((err) => {
        console.error(error);
        res.status(500).json(InternalServerErrorPayload);
      });
  },

  // Get category by id
  find(req, res) {
    let { id } = req.params;
    Category.findAll({ where: { id } })
      .then((categories) => {
        if (categories.length > 0) {
          res.status(200).json({ status: true, category: categories[0] });
        } else {
          res.status(404).json(CategoryNotFoundErrorPayload);
        }
      })
      .catch((err) => {
        res.status(500).json(InternalServerErrorPayload);
      });
  },

  // Update category
  async update(req, res) {
    let { id } = req.params;
    let { description, display } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ status: false, errors: errors.array() });
    }
    try {
      let categories = await Category.findAll({ where: { id } });
      if (categories.length > 0) {
        let category = categories[0];
        category.description = description;
        category.display = display;
        await category.save();
        res.status(200).json({ status: true, category });
      } else {
        res.status(404).json(CategoryNotFoundErrorPayload);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(InternalServerErrorPayload);
    }
  }
};