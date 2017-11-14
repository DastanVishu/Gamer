var express         = require("express"),
    router          = express(),
    CommentModel    = require("../models/comment"),
    PostModel       = require("../models/post"),
    PostLikeModel   = require("../models/postlike"),
    middleware      = require("../middleware");

router.get("/comments/:id", middleware.isLoggedIn,function(req, res){
          PostModel.findById(req.params.id).populate("comments").exec(function(err, founded){
       if(err){
             console.log(err);
         } else {
           PostLikeModel.find({}, function(err, allPostlike){
                if(err){
                    console.log(err);
                } else {
                    res.render("comments/comment", {data: founded, likes: allPostlike});
                }
            })
         }
    });
});


router.post("/comments/:id", middleware.isLoggedIn, function(req, res){
   PostModel.findById(req.params.id, function(err, postmodel){
      
       if(err){
           console.log(err);
           res.redirect("/home");
       } else {           
           var text = req.body.text,
               author = {
                   id: req.user._id,
                   username: req.user.username
               };
           var value = { text: text, author: author };
            CommentModel.create(value, function(err, comment){
               if(err){
                   req.flash("error", "Something went wrong"); 
                   console.log(err);
               } else {
                   postmodel.comments.push(comment);
                   postmodel.save();
                   req.flash("success", "Successfully added comment");
                   res.redirect("/comments/" + postmodel._id);
               }
            });
       }
   });
    
});

router.put("/comments/:id/edit", middleware.checkOwnership,function(req, res){
    PostModel.findByIdAndUpdate(req.params.id, req.body.userpost, function(err, updatedData){
        if(err){
            res.redirect("/home");
        } else {
            res.redirect("/comments/" + req.params.id);
        }
    });
});

router.delete("/comments/:id", middleware.checkOwnership, function(req,res){
   PostModel.findByIdAndRemove(req.params.id, function(err){
       if(err){
                     res.redirect("/comments/" + req.params.id);
       } else{
            res.redirect("/home");

       }
   }) 
});

router.get("/comments/:id/edit", middleware.checkOwnership,function(req, res){
     PostModel.findById(req.params.id, function(err, data){
         res.render("home/edit",{data: data});
     });
});

router.get("/comments/:id/comment/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
     CommentModel.findById(req.params.comment_id, function(err, found){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit",{dataId: req.params.id, comment: found});
        }
    })
   
});

// COMMENT UPDATE
router.put("/comments/:id/comment/:comment_id", middleware.checkCommentOwnership, function(req, res){
    
    CommentModel.findByIdAndUpdate(req.params.comment_id, {text: req.body.text}, function(err, updated){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/comments/" + req.params.id);
        }
    });
});

// COMMENT DESTROY ROUTE
router.delete("/comments/:id/comment/:comment_id", middleware.checkCommentOwnership, function(req, res){
    CommentModel.findByIdAndRemove(req.params.comment_id, function(err, commentModelRemoved){
        if(err){
            res.redirect("/comments/" + req.params.id);
        } else{
            PostModel.findOneAndUpdate({_id: req.params.id}, {$pull: { comments: req.params.comment_id}},function(err, data){
                if(err){
                    console.log(err);
                    res.redirect("/comments/" + req.params.id);
                }
                res.flash("success", "Comment deleted");
                res.redirect("/comments/" + req.params.id);
            });
        }
    });

});




















module.exports = router;