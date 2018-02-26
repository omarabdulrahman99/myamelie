var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// chapter's schema
var chapterSchema = new Schema({
    chapterNumber: {type: Number},
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }],
     chapterTitle: String,
     chapterStory: String
})

module.exports = mongoose.model('Chapter', chapterSchema);
