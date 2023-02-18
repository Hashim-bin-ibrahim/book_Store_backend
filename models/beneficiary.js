const mongoose = require('mongoose')

const beneficiarySchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"name of the beneficiary is required"],
            trim:true

        },
        location:{
            type:String,
            required:true,
            trim:true

        },
        type:{
            type:String,
            required:true,
            trim:true
        },
        amount:{
            type:Number,
            required:true,
            trim:true
        }
    },
    {
        timestamps: true,
      }
)

module.exports = mongoose.model("Beneficiary",beneficiarySchema)