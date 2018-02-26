var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PK = mongoose.Types.ObjectId;
var RK = mongoose.Schema.ObjectId;

var CommentSchema = Schema({
	body: {type: String},
	chapterId: {type: RK, ref: 'Chapter'},
	by: {type: RK, ref: 'User'},
	children: [{
		type: RK,
		ref: 'Comment'

	 }]
}, {timestamps: true});

function autoPopulateComment() {
	this.populate('by');
}




CommentSchema.
pre('findOne', autoPopulateComment).
pre('find', autoPopulateComment);

module.exports = mongoose.model('Comment', CommentSchema);

// :::::::::::: EXPORTS SECTION END :::::::::::://

