var mongoose = require("mongoose");
var Chapter = require("../models/chapter");
var Comment = require("../models/comments");
var User = require("../models/user");
var Ban = require("../models/bans");

var banController = {};


banController.banuser = function(req,res){

	var admin = req.body.admin;
	var comid = req.body.comid;
	var reason = req.body.reason;
	var untildate = req.body.untildate;
	var user = req.body.userbanid;
	var username;
	var adminname;


    console.log(untildate+"untildate");

    if(typeof user === 'undefined'){

	Comment.find({_id:comid}).then(function(data){

		console.log(data[0].by +"comid find user by");

			

			
		 return user = data[0].by;
		
	}).then(function(){

		return User.find({_id: user}).then(function(data1){

			console.log(data1[0].username + "username find")
			username = data1[0].username;

		})
		

	}).then(function(){


		mongoose.connection.db.collection('sessions').deleteMany({

			"session.passport.user": username


		}).then(function(){
			console.log("ok mongo");
			return

		})

			
			

	}).then(function(){

		User.find({_id: admin}).then(function(data2){

			adminname = data2[0].username;

			var newban = new Ban();
			newban.admin = admin;
			newban.userbanned = user;
			newban.reason = reason;
			newban.untildate = untildate;
			newban.adminname = adminname;
			newban.username = username;
			newban.save();
			console.log('newbansaved without initial user' + newban);




			return res.send({sack:'lulacopter'})





		})

			

	})


}else{

	User.find({_id: admin}).then(function(data){

		return adminname = data[0].username;


	}).then(function(){

		return User.find({_id: user}).then(function(data){

			username = data[0].username
		})

	}).then(function(){

		var newban = new Ban();
		newban.admin = admin;
		newban.userbanned = user;
		newban.reason = reason;
		newban.untildate = untildate;
		newban.adminname = adminname;
		newban.username = username;
		newban.save();
		console.log('newban saved with initial user' + newban);

		return res.send({sack:'lulacopter'});

	})


    
}

	





}


module.exports = banController;