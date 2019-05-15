const mongoose = require("mongoose");
const {
    String,
    Number,
    Boolean,
    Date,
    Mixed,
    ObjectId
} = mongoose.Schema.Types;


const notificationSchema = new mongoose.Schema({
    status: {type: Number, enum :[0, 1]},/* 0 - disabled, 1 - enabled*/
    created_at: {
        type: Date,
        default: Date.now
    },
    created_by: String,
    created_by_id: ObjectId,
    category: {type : String, enum : ["MotivationalQuote", "Bulletin"]},
    notificationText: String
});

module.exports = mongoose.model("notifications", notificationSchema);