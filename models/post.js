var mongoose    = require("mongoose");

var PostSchema = new mongoose.Schema({
    
    status: String,
    image: String,
    video: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
			ref:"UserId"
        },
        username: String
    },
    
    comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	],
    
    likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Like"
		}
	],
    
    
});

module.exports = mongoose.model("UserPost", PostSchema);