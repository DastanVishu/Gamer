var express = require("express"),
	router	= express.Router(),
	passport	= require("passport"),
	UserModel	= require("../models/user"),
    UserInfoModel = require("../models/userInfo"),
    middleware  = require("../middleware")

// Handle the login logic
router.get("/", function(req, res){
	res.render("login");
});

router.post("/", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/"
}), function(req, res){
});

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
})

// handle sign up logic
router.get("/register", function(req, res){
	res.render("signup");
});

router.post("/register", function(req, res){
	UserModel.register(new UserModel({username: req.body.username }), req.body.password, function(err, user){
		if(err){
            req.flash("error", err.message);
			return res.render("signup");
		} else {
			passport.authenticate("local")(req, res, function(){
                UserInfoModel.create({
                    fullname: req.body.fullname,
                    email: req.body.email,
                    phone: req.body.phone,
                    Sex: req.body.sex,
                    dob: req.body.dob
                },function(err, post){
                    
                    UserModel.findOne({username: req.body.username},function(err, foundUser){
                        if(err){
                            console.log(err);
                        } else {
                            foundUser.userinfo.push(post);
                            foundUser.save();
                        }
                    });
                });
                req.flash("success", "Welcome to Game_Post_Page " + user.username);
				res.redirect("/home");
			});
		}
	});
	
});


module.exports = router;