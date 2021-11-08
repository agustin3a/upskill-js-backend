var express = require("express");
var router = express.Router();
const { checkSchema } = require('express-validator');
const transferController = require('../controllers/transfers');
const transferValidationSchemas = require('../validation/transfer');

router.post("/transfer/validate",checkSchema(transferValidationSchemas.validateTransferSchema), transferController.validate);

// create transaction
router.post("/transfer",checkSchema(transferValidationSchemas.validateTransferSchema), transferController.create);

// get transaction
router.get("/transfer/:id", transferController.find);



module.exports = router;
