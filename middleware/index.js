var PostModel       = require("../models/post"),
    CommentModel    = require("../models/comment");
// all the middleare gose here
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}

middlewareObj.checkOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        PostModel.findById(req.params.id, function(err, data){
            if(err){
                res.redirect("back");
            } else {
                if(data.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        CommentModel.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = middlewareObj;