var mongoose = require("mongoose");
var Chapter = require("../models/chapter");
var Comment = require("../models/comments");

var chapterController = {};

// Addd a chapter
chapterController.save = function (req, res) {

    var newChapter = new Chapter(req.body);
    //console.log(newChapter);
    newChapter.save().then(function (data){
        Chapter.find().then(function (chapters){

            return res.redirect('chapters')
        })
    })
}

chapterController.edit = function(req, res) {
  Chapter.findByIdAndUpdate( {_id: req.body.chapterId}, req.body, {new:true}, function(err,data){

    Chapter.find(req.body.chapterId).then(function(chapter){
      return res.redirect('chapters'); 
    })
  })

}

// Delete chapter
chapterController.delete = function(req, res){
    var query = {_id: req.params.chapterId};
    Chapter.remove(query).then(function(){
        Chapter.find().then(function (chapters){
            return res.render('chapters', {chapters: chapters, user: req.user});
        })
    })
}

// Get all chapters
chapterController.listChapters = function (req, res){
    Chapter.find().then(function (chapters){
        return res.render('chapters', {chapters: chapters, user: req.user})
    })
}

chapterController.checktoggle = function(req,res){
      
      var tog;
      var userId;
      var usera;
      var chapterId = req.params.chapterId;
      if (req.isAuthenticated()){

          //console.log(req.isAuthenticated())
          userId = req.user._id;
          usera = req.user;
          //console.log(userId);
        Chapter.findOne({
          _id: chapterId


      }, function(err,chap){
        if(chap.likes.indexOf(userId) !== -1){
          tog = true;
        }else{
          tog = false;
        }
        //console.log(usera);
        //console.log(tog);
        return res.send({user:usera, togg:tog})


      })
      }else{
        tog = false;
        return res.send({togg:tog})
      }
             
}

// Like a chapter
chapterController.likeChapter = function (req, res) {
    var userId = req.body.by;
    var chapterId = req.body.chapterId;
    var tog;
     

        Chapter.findOne({
          _id: chapterId


        }, function(err, chap){

          if(chap.likes.indexOf(userId) !== -1){
              chap.likes.pull(userId);
              tog = false;
              chap.save();

          }else{
            chap.likes.addToSet(userId);
            tog = true;
            chap.save();
          }
            chap.save();
            
            
            Comment.find({chapterId: chapterId}).then(function(data){
                //console.log(chap.likes + 'ddfwtf');
                return res.send({ commentList : data, user: req.user, chapter: chap, togg: tog});
                
            });
                    
         })

       


  
  };

module.exports = chapterController;