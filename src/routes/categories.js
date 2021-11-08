var express = require("express");
var router = express.Router();
const { checkSchema } = require('express-validator');
const CategoriesController = require("../controllers/categories");
const CategoryValidationSchemas = require('../validation/categories');

// Find all categories
router.get("/categories",  CategoriesController.list);

// Find category by id
router.get("/category/:id", CategoriesController.find);

// Delete category
router.put("/category/:id", checkSchema(CategoryValidationSchemas.manipulateCategory), CategoriesController.update);

// Create category
router.post("/category", checkSchema(CategoryValidationSchemas.manipulateCategory), CategoriesController.create);


module.exports = router;