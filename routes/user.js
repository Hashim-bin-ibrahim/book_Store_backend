const express = require("express");
const axios = require("axios");

const {
  SignUp,
  Login,
  Donate,
  getDetails,
  Beneficiary,
  getDonationDetails,
} = require("../controllers/user");
const { RegisterValidation } = require("../validator");
const router = express.Router();

router.post("/signup", RegisterValidation, SignUp);
router.post("/login", RegisterValidation, Login);
// router.get("/getDetails", getDetails);
router.get("/getDetails",getDetails);

module.exports = router;
