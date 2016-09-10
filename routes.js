//routes index file, this file is used to make managing route controllers easier. 

var chordsRoutes = require('./server/controllers/chords');
var homeRoutes = require('./server/controllers/home');
var songsRoutes = require('./server/controllers/songs');
var uploadsRoutes = require('./server/controllers/uploads-ctrl');

//takes an express() app variable and tells it which routes to use for the server side and which route controller
//is to be used for each route. the route controllers contain the CRUD operations
module.exports = function routes(app){
	app.use('/api/chords', chordsRoutes);
	app.use('/api/songs', songsRoutes);
	app.use('/api/uploads', uploadsRoutes);
	app.use('/', homeRoutes);
};