const { check } = require("express-validator");

exports.RegisterValidation = [
  check("username")
    .isLength({ min: 4 })
    .withMessage("username must have 4 characters."),
  check("mobile")
    .isMobilePhone("en-IN")
    .withMessage("Must be a valid Mobile number"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Must be at least 6 characters"),
];
