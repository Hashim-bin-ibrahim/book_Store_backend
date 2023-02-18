const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const donationSchema = mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: [true, "amount  is required"],
      trim: true,
    },

    transactionId: {
      type: String,
      // required: [true, "transactionId is required"],
    },
    comment: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Donation", donationSchema);
