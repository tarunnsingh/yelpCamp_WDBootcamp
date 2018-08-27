var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Hot Desert",
		image: "https://invinciblengo.org/upload/gallery/manali-summer-adventure-camp-12-jun-2017-gW7Hihu.JPG",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name: "Cold Desert",
		image: "https://invinciblengo.org/upload/gallery/manali-summer-adventure-camp-12-jun-2017-E4nTPba.JPG",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name: "Mild Desert",
		image: "https://invinciblengo.org/upload/gallery/manali-summer-adventure-camp-16-apr-2016-olbQOuI.jpg",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	}
]

function seedDB(){
	Campground.remove({},function(err){
		if(err){
			console.log(err);
		}else{
			console.log("removed campgrounds");

			data.forEach(function(seed){
			Campground.create((seed),function(err, data){
				if(err){
					console.log(err)
				}else {
					console.log("added a campground");
					Comment.create({
						text: "This is a nice place to enjoy but you will feel drizzy after long",
						author: "Tarun"
					},function(err, comment){
						if(err){
							console.log(err)
						}else {
							 data.comments.push(comment);
							 data.save();
							 console.log("Created new Comment!");
						}
					})
				}
				});
			});
		}
	});
}

module.exports = seedDB;	