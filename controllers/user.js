const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { generateToken } = require("../helpers/token");
const Donation = require("../models/donation");
const { ObjectID } = require("bson");
const Beneficiary = require("../models/beneficiary");
const axios  = require ("axios")

exports.SignUp = async (req, res) => {
  try {
    const { username, mobile, password } = req.body;

    const check = await User.findOne({ mobile });
    if (check) {
      return res.send({
        error: "This mobile number already exists.",
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.array() });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    const user = await new User({
      username,
      mobile,
      password: cryptedPassword,
    }).save();

    // const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      username: user.username,
      message: "Register Successfully Completed !",
    });
  } catch (error) {
    console.log("error message", error);
    res.send({ message: error.message });
  }
};

exports.Login = async (req, res) => {
  try {
    const { username, password, adminLogin } = req.body;

    let Member;
    let admin;
    if (!adminLogin) {
      Member = true;
    } else {
      admin = true;
    }
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({
        error: "This username not found.",
        param: "username",
      });
    }

    const check = await bcrypt.compare(password, user.password);

    if (!check) {
      return res.send({
        error: "Invalid credentials.Please try again.",
        param: "password",
      });
    }

    // const token = generateToken({ id: user._id.toString() }, "7d");
    // console.log("token", token);

    res.send({
      user,
      Member,
      admin,
      message: "Login Success",
      result: "OK",
    });
  } catch (error) {
    res.send({ message: error.message });
  }
};




exports.getDetails = async (req, res) => {

    console.log("a call from backend");
    const url = await axios.get(
      "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=tVxQIzVKDcPJTuNPbkRO27yiInD8xAGi"
    );
    console.log(url.data.results.books);
  res.json(url.data.results.books);
};

exports.getDonationDetails = async (req, res) => {
  const beneficiary = await Beneficiary.find()
  res.json(beneficiary);
};

exports.Beneficiary = async (req, res) => {
  try {
    const { name, location, type, amount } = req.body;

    const beneficiary = await new Beneficiary({
      name,
      location,
      type,
      amount,
    }).save();

    res.send({
      message: "beneficiary Successfully added !",
    });
  } catch (error) {
    console.log(error);
  }
};
