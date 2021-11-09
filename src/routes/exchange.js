var express = require("express");
var router = express.Router();
const exchangeController = require('../controllers/exchange');

router.get("/exchange/init", exchangeController.init);

module.exports = router;
