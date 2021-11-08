var express = require("express");
var router = express.Router();
const { checkSchema } = require('express-validator');
const { AccountType } = require("../../models");
const AccountTypesController = require("../controllers/accountTypes");
const AccountTypesValidationSchemas = require('../validation/accountTypes');

// Find all account types
router.get("/accountTypes",  AccountTypesController.list);

// Find all account types
router.get("/accountType/:id", AccountTypesController.find);

// Delete account type
router.put("/accountType/:id", checkSchema(AccountTypesValidationSchemas.createAccountTypeSchema), AccountTypesController.update);

// Create account type
router.post("/accountType", checkSchema(AccountTypesValidationSchemas.createAccountTypeSchema), AccountTypesController.create);


module.exports = router;
