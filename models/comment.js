var mongoose        = require("mongoose");

var CommentSchema    = new mongoose.Schema({
    text: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserId"
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", CommentSchema);