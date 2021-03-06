var express 				= require("express"),
	app						= express(),
	bodyParser				= require("body-parser"),
	flash					= require("connect-flash"),
    cookieParser            = require("cookie-parser"),
	passport				= require("passport"),
	LocalStrategy			= require("passport-local"),
	mongoose				= require("mongoose"),
	methodOverride			= require("method-override"),
	passportLocalMongoose	= require("passport-local-mongoose");

	
// Defined Shcema
var UserModel           = require("./models/user"),
    UserInfoModel       = require("./models/userInfo"),
    PostModel           = require("./models/post"),
    CommentModel        = require("./models/comment"),
    LikeModel           = require("./models/postlike");

// requring routes 
var homeRoutes 		= require("./routes/home"),
	loginRoutes		= require("./routes/login"),
    commentRoutes  	= require("./routes/comment"),
	likeRoutes     	= require("./routes/likes"),
	profileRoutes	= require("./routes/profile");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://dastan:intel@ds111565.mlab.com:11565/gamer");
//mongoose.connect("mongodb://localhost/Gamer_V2");


app.use(express.static( __dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(cookieParser('secret'));

app.use(require("express-session")({
	secret: "my name is Dastan",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use( new LocalStrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


// used routes
app.use(loginRoutes);
app.use(commentRoutes);
app.use(homeRoutes);
app.use(likeRoutes);
app.use(profileRoutes);


// app request listener
app.listen(process.env.PORT, process.env.IP, function(req, res){
	console.log("Sever is started...!!");
});