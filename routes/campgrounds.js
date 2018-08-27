var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");







//get all campgrounds
router.get("/",function(req, res){
	//get all campgrounds from Db
	Campground.find({},function(err, allCampgrounds){
		if(err){
			console.log(err);
		}else {
			res.render("campgrounds/campgrounds",{campgrounds: allCampgrounds, currentUser: req.user});

		}
	})
});

//new campground
router.post("/", middleware.isLoggedIn, function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var price = req.body.price;
//==========================Get Date=====================================	
	var date = now();
//=======================================================================
	var author = {
		id : req.user._id,
		username :req.user.username
	};

	var newCampground = {name: name, image: image, date: date, price: price ,description: desc, author: author};

	console.log(req.user);
	Campground.create(newCampground, function(err, campground){
		if(err){
			console.log(err)
		} else{
			console.log("reading from db :"+campground);
			res.redirect("/campgrounds");
		}
	});
});

//get request for new campground
router.get("/new",middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});


//display camground specific
router.get("/:id",function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundcampground){
		if(err){
			console.log(err);
		} else{
			res.render("campgrounds/show",{campground: foundcampground});
		}
	});
	
});

//Edit campground route

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	//is user logged in?
	Campground.findById(req.params.id, function(err, foundcampground){
		res.render("campgrounds/edit", {campground: foundcampground});
	}); 	
});	

//update campground route

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	//find and update current campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedcampground){
		if(err){
			req.flash("error","Campground not found!");
			res.redirect("/campgrounds");
		} else {
			req.flash("info","Campground edited successfully!")
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});


//destroy campground

router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){			
			req.flash("error","Campground not found!");
			res.redirect("/campgrounds");
		} else {
			req.flash("success","Campground Deleted!");
			res.redirect("/campgrounds");
		}
	})
})


function now(){
var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	var hh = today.getHours();
	var mn = today.getMinutes();
	if(dd<10) {
	    dd = '0'+dd
	} 

	if(mm<10) {
	    mm = '0'+mm
	} 

	if(hh<10) {
	    hh = '0'+hh
	} 

	if(mn<10) {
	    mn = '0'+mn
	} 

	today = hh +':'+ mn +' on ' +  dd + '/' + mm + '/' + yyyy;
return today;
}





module.exports = router;