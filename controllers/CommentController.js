var mongoose = require("mongoose");
var Comment = require("../models/comments");
var Chapter = require("../models/chapter");

var commentController = {};


commentController.findreply = function(req,res){

  var mainid = req.body.send;
  var childreply = [];
  var childmain;
  //console.log(mainid+'mainid');
 

  Comment.find({ _id:mainid }).then(function(data){

   
    //console.log(data+'data');
    childmain = data[0];

    return Promise.all(data[0].children.map(child => {


      return Comment.find({_id: child})

      .then((childsingle) => {
        console.log(childreply+'childreplynow');
        childreply.push(childsingle[0]);
      })
    }))

  })
  .then(() => {

    console.log(childreply._id+"hiimchildreply");
    //console.log(childmain+"hiiimchildmain");

    return res.send({childr:childreply, childm:childmain})
  })

}

commentController.deletecomment = function(req,res){

    var parent = req.body.sen1;
    var mainid = req.body.sen;
    var recom = req.body.recom;
    var childz = [];
    var chap = req.body.chap;
    var only;
    var grandpa = req.body.gr;
    console.log(grandpa+"grandpastart");

    console.log(mainid+"mainid");
    var comList = [];

  
  Comment.find({ _id:mainid }).then(function(data){

   
   
    return Promise.all(data[0].children.map(child => {


      return Comment.deleteOne({_id: child})

    
    }))

  }).then(() => {

if(grandpa != 0){
  console.log(grandpa+'grandpa');

return Comment.update(
  {_id: grandpa},
  {$pull: {children:mainid}}
 
 )

}else{

  if(recom != 0 ){


  console.log('grandpa'+grandpa);
  console.log('parentreached'+parent);


    return Comment.update(
    {_id: parent},
    {$pull: {children: mainid}},
    function(err, numberAffected){

      return Comment.remove({_id: mainid});
      console.log(numberAffected);
})


  }else{

    return 
  }

  


}


  }).then(() => {


  return Comment.remove({_id: mainid});


 }).then(() => {


if(recom == 0){
  console.log('undefinedrecom')
  return Comment.find({chapterId:chap}).then(function(data){

              comList = data;

      })

}else{
      return Comment.find({_id: recom})
            .exec()
            .then(onlydata => {
                    only = onlydata[0];
                    
                    return Promise.all(onlydata[0].children.map(child => {
                            return Comment.find({_id: child})
                            .exec()
                            .then((onlydatac) => {
                                  childz.push(onlydatac[0]);
                            });
                  }));
            })

    }

 }).then(() => {


      return Comment.find({chapterId:chap}).then(function(data){

              comList = data;
              console.log(comList+'comlist');

      })


  }).then(() => {


      //console.log(only.children+"onlychildrenmissinglul");
      return res.send({childs: childz, main: only, commentList: comList});



  })

  
}


commentController.reply = function(req,res){
  
   console.log(req.body.comid);
   console.log(req.body.by);
  var commentList;
  var newComment = new Comment(req.body);
  newComment.save();
  //console.log(newComment);
  var commid = req.body.comid;
  var dataa;
  var only;
 
  //console.log(req.body.body);
  //console.log(req.body.xxchid);
  


Comment.findByIdAndUpdate(commid, {$push: {children: newComment}}, {new: true})
.exec()
.then(post => {
    var childz = [];
    return Comment.find({chapterId: req.body.xxchid})
    .exec()
    .then(function(data){
            var dataa = data; 
            return Comment.find({_id: commid})
            .exec()
            .then(onlydata => {
                    only = onlydata[0];
                    return Promise.all(onlydata[0].children.map(child => {
                            return Comment.find({_id: child})
                            .exec()
                            .then((onlydatac) => {
                                  childz.push(onlydatac[0]);
                            });
                  }));
            })
            .then(() => {
                    console.log(childz);
                    return res.send({commentList: dataa, mainonly:only, childs: childz})
            });
    });



})

}





commentController.save = function (req, res) {
  var newComment = new Comment(req.body);
 
  var chapterId = req.body.chapterId;
  console.log(chapterId);
  var query = {chapterId: chapterId};
  newComment.save().then(function (data) {
    // res.send({success:true, message: 'Comment has been saved', comment: data});
    Chapter.find({ _id: chapterId }).then(function (chapter) {
      var chapter = chapter;
      Comment.find(query).then(function (data) {

        Chapter.find().then(function(chapterz){
        return res.send({ commentList: data, user: req.user, chapter: chapter , chapters:chapterz});
        })
      });
    })
  });
};

// List comments for specified chapter id.
commentController.list = function (req, res) {
  var chapterId = req.params.chapterId;
  var query = { chapterId: chapterId };
  Chapter.find({ _id: chapterId }).then(function (chapter) {
    var chapter = chapter;
    Comment.find(query).then(function (data) {
      console.log(data)
      //console.log(chapter);
      //we can do, if chapter.chapterNumber == 1    1through 10, then render a specific page design.
        //returns an array when you use find

        Chapter.find().then(function(chapters){
          return res.send({ commentList: data, user: req.user, chapter: chapter});

        })
          
    });

  })
};


module.exports = commentController;
