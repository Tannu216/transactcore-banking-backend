const mongoose = require("mongoose")

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "Account must be associated with a user"],
        index: true  //for fast searching of account
    },
    status:{
        type: String,
        enums: {
            values:["ACTIVE","FROZEN","CLOSED"],
            messages: "Status can be either ACTIVE, FROZEN or CLOSED",
        },
        default:"ACTIVE"
    },
    currency:{
        type: String,
        required: [true,"Currency is required for creating account"],
        default: "INR"
    }
},{
    timestamps:true
})

accountSchema.index({user: 1,status: 1})

const accountModel = mongoose.model("account",accountSchema)

module.exports = accountModel