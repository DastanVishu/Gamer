var express = require("express"),
    router  = express(),
    PostLikeModel   = require("../models/postlike"),
    PostModel       = require("../models/post"),
    middleware      = require("../middleware");

router.get("/likes/:id", middleware.isLoggedIn, function(req, res){
    PostModel.findById(req.params.id).populate("likes").exec(function(err, postmodel){
        if(err){
            console.log(err);
         } else {
             var a = 0;
             postmodel.likes.forEach(function(users){
                 if(users.author.id.toString() == req.user._id){
                     a=1;
                 }
             });
             if(a===0){
                var postid = req.params.id,
                    author = {
                    id: req.user._id,
                    username: req.user.username
                    }
                PostLikeModel.create({postid: postid, author: author}, function(err, created){
                    if(err){
                        console.log(err);
                    } else{
                        postmodel.likes.push(created);
                        postmodel.save();
                        res.redirect("back");
                    }
                }); 
             } else{
                 res.redirect("back");
             }
         }
    }); 
});

router.get("/likes/disliker/:id", middleware.isLoggedIn, function(req, res){
    // find the postmodel by id
  PostModel.findById(req.params.id).populate("likes").exec(function(err, likeslist){
     if(err){
         console.log(err);
         res.redirect("back");
     } else {
         // find the likes list from the postmodel
         likeslist.likes.forEach(function(founded){
             // find the author id from likeslist and compare with current login id one by one
             if(founded.author.id.equals(req.user._id)){
                // if author id is equal to current user id then delete the PostLikeModel
                PostLikeModel.findByIdAndRemove(founded._id, function(err, removed){
                    if(err){
                        res.redirect("back");
                    } else{
                        // remove the deleted model id from the PostModel of array list (likes)
                        PostModel.findOneAndUpdate({_id: req.params.id}, {$pull: { likes: founded._id}},function(err, data){
                            if(err){
                                res.redirect("back");
                            } else {
                                res.redirect("back");
                            }
                        });
                    }
                });
             }
         });
     }
  });
});



router.get("/likes/:id/liker", middleware.isLoggedIn, function(req, res){
    PostModel.findById(req.params.id).populate("likes").exec(function(err, lists){
        if(err){
            res.redirect("back");
        } else{
           res.render("list", { lists: lists.likes});
        } 
    });
});















module.exports = router;