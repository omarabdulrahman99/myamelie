var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RK = mongoose.Schema.ObjectId;

var BanSchema = new Schema({

	admin: {type:RK, ref:'User'},
	userbanned: {type: RK, ref: 'User'},
	untildate: String,
	reason: String,
	adminname: String,
	username: String

});


module.exports = mongoose.model('Bans', BanSchema);