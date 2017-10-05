var express         = require("express"),
	router	        = express.Router(),
    PostModel       = require("../models/post"),
    PostLikeModel   = require("../models/postlike"),
    middleware      = require("../middleware");
    

router.get("/home", middleware.isLoggedIn, function(req, res){
    PostModel.find({}, function(err, allPost){
        if(err){
            console.log(err);
        } else {
            PostLikeModel.find({}, function(err, allPostlike){
                if(err){
                    console.log(err);
                } else {
                    res.render("home/home", {Posts: allPost, likes: allPostlike});
                }
            })
            
        }
    })
	
});

router.post("/home", middleware.isLoggedIn, function(req, res){
    var status = req.body.status,
        image = null,
        video = null,
        author = {
            id: req.user._id,
            username: req.user.username
        }
    var newpost = {status: status, image: image, video: video ,author: author};
    PostModel.create(newpost, function(err, created){
        if(err){
            console.log(err);
        } else {
            res.redirect("/home");
        }
    });
   // res.redirect("/home");
});

router.get("/home/image", middleware.isLoggedIn, function(req, res){
     res.render("postdata/postimage");
});

router.post("/home/image", middleware.isLoggedIn, function(req, res){
   var status = req.body.status,
       image = req.body.image,
       video = null,
       author = {
           id: req.user._id,
           username: req.user.username
       }
   var newpost = { status: status, image: image, video: video, author: author };
    PostModel.create(newpost, function(err, created){
        if(err){
            console.log(err);
        } else {
            res.redirect("/home");
        }
    });
});

router.get("/home/videos", middleware.isLoggedIn, function(req, res){
    res.render("postdata/postvideo");
//     res.send("video upload");
});

router.post("/home/videos", middleware.isLoggedIn, function(req, res){
    var status = req.body.status,
        image = null,
        video = req.body.video,
        author = {
            id: req.user._id,
            username: req.user.username
        };
     var newpost = {status: status, image: image, video: video ,author: author};
    PostModel.create(newpost, function(err, created){
        if(err){
            console.log(err);
        } else {
            res.redirect("/home");
        }
    });
//    res.send("video uploaded");
});





module.exports = router;