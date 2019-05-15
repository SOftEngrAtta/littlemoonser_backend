const mongoose = require("mongoose");
// const  bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const {
  String,
    Number,
    Boolean,
    Date,
    Mixed,
    ObjectId
} = mongoose.Schema.Types;


const usersSchema = new mongoose.Schema({
    created_at: { type: Date, default: Date.now },
    username: String ,
    password: String,
    salt: String,
});

usersSchema.pre('save', function(next){
    var user = this;
    if (!user.isModified('password')) return next();
 
    // bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
    //     if(err) return next(err);
    //     bcrypt.hash(user.password, salt, function(err, hash){
    //         if(err) return next(err);
 
    //         user.password = hash;
    //         user.salt = salt ;
    //         next();
    //     });
    // });
});

module.exports = mongoose.model("users", usersSchema);