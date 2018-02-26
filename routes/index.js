var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })


/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/chapter1', function(req, res, next) {
  res.render('chapter1', { title: 'Express' });
});

module.exports = router;
*/


  

var auth = require("../controllers/AuthController.js");
var comment = require("../controllers/CommentController.js");
var chapter = require("../controllers/chapterController.js");
var ban = require("../controllers/BanController.js");

// restrict index for logged in user only
router.get('/', auth.home);

//route to main page
router.get('/main', auth.main);

router.get('/chapterlinks', auth.chapterlinks);
// route to register page
router.get('/register', auth.register);

// route for register action
router.post('/register', auth.doRegister);

// route to login page
router.get('/login', auth.login);

// route for login action
router.post('/login', auth.doLogin);

// ban user
router.post('/banuser', ban.banuser);

// route to profile page
router.get('/profile', isLoggedIn,  auth.profile);

// route to update profile
router.post('/profile', isLoggedIn,  auth.updateProfile);

//enter the forums
router.get('/forums', isLoggedIn, auth.forumenter);

// route for logout action
router.get('/logout', auth.logout);

// post comment
router.post('/comment', isLoggedIn, comment.save);

// Goto chapters
router.get('/chapters', isAdmin, chapter.listChapters);

// Add chapter
router.post('/add-chapters', isAdmin, chapter.save);

//Edit chapter
router.post('/edit-chapters', isAdmin, chapter.edit);

// up chapter likes
router.post('/uplikes', isLoggedIn, chapter.likeChapter); 

//post a reply
router.post('/comreply', isLoggedIn, comment.reply);

//find reply id and return to display
router.post('/findreply', comment.findreply);

// Delete chapter
router.get('/deleteLinks/:chapterId', isAdmin, chapter.delete);

// Goto chapter detail page
router.get('/chapterLinks/:chapterId', comment.list);

// Add comment
router.post('/add-comment', isLoggedIn, comment.save)

//Delete a comment
router.post('/delete-comment', isAdmin, comment.deletecomment)
// list comments
router.get('/comment', isLoggedIn, comment.list);

router.get('/modal', auth.modal);

router.get('/checktoggle/:chapterId', chapter.checktoggle);




function isLoggedIn(req, res, next) {
	console.log('checkng ... isAuthenticated ', req.isAuthenticated());
	if (req.isAuthenticated())
		return next();
	res.redirect('/login');
}

function isAdmin(req, res, next){
	console.log('checkng ... isAuthenticated ', req.isAuthenticated());
	if (req.isAuthenticated() && req.user.role[0] === 'admin')
		return next();
	res.send({message: 'Unauthorised!'});
}
module.exports = router;