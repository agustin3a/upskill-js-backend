var express = require("express");
var router = express.Router();
const { checkSchema } = require('express-validator');
const CurrenciesController = require("../controllers/currencies");
const CurrencyValidationSchemas = require('../validation/currencies');

// Find all currencies
router.get("/currencies",  CurrenciesController.list);

// Find currency by id
router.get("/currency/:id", CurrenciesController.find);

// Update currency
router.put("/currency/:id", checkSchema(CurrencyValidationSchemas.manipulateCurrencySchema), CurrenciesController.update);

// Create currency
router.post("/currency", checkSchema(CurrencyValidationSchemas.manipulateCurrencySchema), CurrenciesController.create);


module.exports = router;