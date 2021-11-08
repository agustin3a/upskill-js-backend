var express = require("express");
var router = express.Router();
const { checkSchema } = require('express-validator');
const UsersController = require("../controllers/users");
const UserValidationSchemas = require('../validation/users');

// Find user by id
router.get("/user/", UsersController.find);

// Update user
router.put("/user/", checkSchema(UserValidationSchemas.updateUserSchema), UsersController.update);

// Create user
router.post("/user", checkSchema(UserValidationSchemas.createUserSchema), UsersController.create);


module.exports = router;