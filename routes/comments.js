var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");




//comments new
router.get("/new", middleware.isLoggedIn,  function(req, res){
	Campground.findById(req.params.id, function(err,campground){
		if(err){
			console.log(err);
		} else{
			res.render("comments/new",{campground: campground});
		}
	});
});


//coments create
router.post("/", middleware.isLoggedIn, function(req, res){
	//lookup cg using ID
	//create a new comment
	//connect new comment to cag
	//redirect to cg show page

	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					req.flash("error","Something went Wrong!!");
					console.log(err);
				} else {
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.date = now();
					console.log("Creating Comment : "+ comment);

					//save comment
					comment.save()
					campground.comments.push(comment);
					campground.save();
					req.flash("success","Comment created successfully!");
					res.redirect("/campgrounds/"+campground._id);
				}
			});
		}

	});
});
//comment edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Campground.findById(req.params.id , function(err, foundcampground){
		if(err){
			res.redirect("back");
		} else
		{
			Comment.findById(req.params.comment_id, function(err, foundcomment){
				if(err){
					res.redirect("back");
				} else{
					res.render("comments/edit",{campground: foundcampground, comment: foundcomment});		
				}
			})
					
		}
	})
	
})
//comment update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedcomment){
		if(err){
			res.redirect("back");
		} else {
			req.flash("info","Comment added!")
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});


//comment delete
router.delete("/:comment_id",middleware.checkCommentOwnership, function(req, res) {
	//find by id and remove
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			req.flash("success","Comment Deleted!");
			res.redirect("/campgrounds/"+ req.params.id);
		}
	});
});





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