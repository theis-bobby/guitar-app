//Home page controller

var express = require('express'); //dependcy

var router = express.Router(); //init router

//---------------
//	Routes
//---------------
//get the home page info
//later on once user are created this page will display some info about which user is logged in
router.get('/', function(req, res){
	res.send('Hello from home.js');
});

//export Home Controller
module.exports = router;