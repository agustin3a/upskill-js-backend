var express = require("express");
var router = express.Router();
var categoriesController = require("../controllers/categories");

// get categories
router.get("/categories", categoriesController.getCategories);
  
module.exports = router;
  