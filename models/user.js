var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({

	username: {type:String, unique: true},
	profile_pic: String,
  password: String,
  role:{type: [{
    type: String,
    enum: ['user', 'admin']
    }],
    default: ['user']
}
});


UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
 /* var Likes = new Schema({
    like_id: ObjectId,
    name: String,
    date_liked: Date
  });
  exports.Likes = mongoose.model('Likes', Likes);

  var Comments = new Schema({
    comment_id: ObjectId,
    user: String,
    user_photo: String,
    body: String,
    date_commented: Date
  });
  exports.Comments = mongoose.model('Comments', Comments);

  var Posts = new Schema({
    post_id: ObjectId,
    body: String,
    title: String,
    date: Date,
    submitted_by: String,
    submitted_by_photo: String,
    likes: [Likes],
    comments: [Comments]
  });

  exports.Posts = mongoose.model('Posts', Posts);

  */