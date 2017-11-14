var express         = require("express"),
    router          = express(),
    PostModel       = require("../models/post"),
    PostLikeModel   = require("../models/postlike"),
    middleware      = require("../middleware");
    
router.get("/profile", function(req, res){
    res.render("profiles/profile");
});

module.exports = router;

