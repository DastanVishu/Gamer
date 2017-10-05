var mongoose    = require("mongoose");

var UserInfoSchema = new mongoose.Schema({
    
    fullname: String,
    email: String,
    phone: String,
    Sex: String,
    dob: String
   
});

module.exports = mongoose.model("UserInfo", UserInfoSchema);