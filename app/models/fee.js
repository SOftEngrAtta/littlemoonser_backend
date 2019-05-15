const mongoose = require("mongoose");
const {
    String,
    Number,
    Boolean,
    Date,
    Mixed,
    ObjectId
} = mongoose.Schema.Types;


const feeSchema = new mongoose.Schema({
   
    className: String,
    admissionFee: String,
    annualCharges: String,
    monthlyFee: String,
    cardForm: String,
    totalAmount: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    
});

module.exports = mongoose.model("feeModel", feeSchema);