var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/user");
var Chapters = require("../models/chapter");
var Bans = require("../models/bans");
const multer = require('multer');
const path = require('path');

// Set Storage Engine for mutler
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  //limits: { fileSize: 1000000 }, // 10MB max file size
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('profile_pic');

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

var userController = {};

// Restrict access to root page
userController.home = function (req, res) {
  res.render('intro');
};

userController.main = function (req, res) {
  // get chapters 
  Chapters.find().then(function (chapters) {
    //console.log(req.session.username+'mainfk');
    console.log(req.user+"requseronmain");
   
      return res.render('main', { user: req.user, chapters: chapters });
  
     
    
  })
};

userController.forumenter = function(req,res){

  return res.render('forums', {user:req.user});

}

userController.modal = function(req,res){
  return res.render('modal');
}

userController.chapterlinks = function(req,res){

  Chapters.find().then(function(chapters){
    //console.log(chapters)
    res.render('chapterlinks', {user: req.user, chapters: chapters})
  })
}

// Go to registration page
userController.register = function (req, res) {
  res.render('register');
};

// Goto profile page
userController.profile = function (req, res) {
  
  res.render('profile', { user: req.user });
};


// Post registration
userController.doRegister = function (req, res) {
  upload(req, res, (err) => {
    if (err) {
      res.send({
        msg: err
      });
    } else {
      if (req.file == undefined) {
        res.send({
          msg: 'Error: No File Selected!'
        });
      } else {
        var role = req.body.role ? 'admin' : 'user';
        var adminPasscode = 3234;
        console.log(req.body.passCode)
        if (role === 'admin' && req.body.passCode == 3234){
          User.register(new User({ username: req.body.username, name: req.body.name, profile_pic: req.file.filename, role: role }), req.body.password, function (err, user) {
            if (err) {
              return res.send({ error: err });
            }
            passport.authenticate('local')(req, res, function () {
              res.redirect('/main');
            });
          });
        } 
         else if (role === 'user') {
        User.register(new User({ username: req.body.username, name: req.body.name, profile_pic: req.file.filename, role: role }), req.body.password, function (err, user) {
          if (err) {
            return res.send({ error: err });
          }
          passport.authenticate('local')(req, res, function () {
            res.redirect('/main');
          });
        });
      }
      else{
        res.send({message: "You don't have admin previlledges!"})
      }
    }
    }
  });
};

// update profile
userController.updateProfile = function (req, res) {
  var username = req.session.passport.user
  var newPass = req.body.password
  User.findByIdAndUpdate({ _id: req.user.id }, req.body, { new: true }, function (err, data) {
    if (err) console.log(err);
    User.findByUsername(username).then(function (sanitizedUser) {
      if (sanitizedUser) {
        sanitizedUser.setPassword(newPass, function () {  //Check if user exists before setting password.
          sanitizedUser.save();
          res.render("profile", {
            user: data
          });
        });
      } else {
        res.send('user does not exist');
      }
    }, function (err) {
      console.error(err);
    })
  });
}

// Go to login page
userController.login = function (req, res) {

  
      res.render('login');
  
};



  


// Post login
userController.doLogin = function (req, res) {
  passport.authenticate('local')(req, res, function () {

    Bans.find({"username": req.body.username}).then(function(data){

      console.log('checking for bans wtf');
      console.log(data+"data");
    if(data.length>0){
      res.send('Sorry, you are banned until:' + data[0].untildate);
    }else{

      console.log(req.user+"dologinuser");
      res.render('main', {user:req.user});
      
    }

  });
});
};
// logout
userController.logout = function (req, res) {
 
  req.logout();
  res.redirect('/main');
};

module.exports = userController;