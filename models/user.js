var mongoose				= require("mongoose"),
	passportLocalMongoose	= require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	UserName: String,
	password: String,
    userinfo:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserInfo"
        }]
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("UserId", UserSchema);
	