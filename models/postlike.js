var mongoose        = require("mongoose");

var LikeSchema    = new mongoose.Schema({
    postid: String,
    author: 
    {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserId"
        },
        username: String
    }
});

module.exports = mongoose.model("Like", LikeSchema);