var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");



//root route
router.get("/",function(req, res){
	res.render("landing");
});





//register form route
router.get("/register", function(req, res){
	res.render("register");
});

//handle signup route
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username})
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err)
			req.flash("error",err.message);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function() {
			req.flash("success","Successfully Signed in as " + user.username.toUpperCase() + ".");
			res.redirect("/campgrounds");
		});
	});
});


//show login form
router.get("/login", function(req, res){
	res.render("login");
});
//login post req.
router.post("/login", passport.authenticate("local", 
	{
		//req.flash("success","Logged in successfully! ");
		successRedirect: "/campgrounds",
		//req.flash("error","Cannot Login!");
		failureRedirect: "/login"
	}), function(req, res){
	res.send("loggin in...") 
});


//logout
router.get("/logout",function(req, res){
	req.logout();
	req.flash("info","You just Logged Out!");
	res.redirect("/campgrounds");
});



module.exports = router;
