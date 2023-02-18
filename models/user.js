const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
  
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      text: true,
      unique: true,
    },

    mobile: {
      type: Number,
      required: [true, "mobile number is required"],
      trim: true,
    },
  
    password: {
      type: String,
      required: [true, "password is required"],
    },
    isMember: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
