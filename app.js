// Creates and configures the server
var express = require('express')
  , path = require('path')
  , favicon = require('static-favicon')
  , logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , expressSession = require('express-session')
  , mongoStore = require('connect-mongo')({session: expressSession})
  , dbConn = require('./db/db_connection');

dbConn.getDBConnection(function(currentDB) {
    var app = express();

    // view engine setup
    app.set('views', path.join(__dirname, 'app'));
    app.set('view engine', 'ejs');

    app.set('port', process.env.PORT || 9000);

    app.use(favicon());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());
    app.use(require('less-middleware')(path.join(__dirname, 'app')));
    app.use(express.static(path.join(__dirname, 'app')));
    app.use('/bower_components',  express.static(__dirname + '/bower_components'));

    require('./routes/index')(app);

    require('http').createServer(app).listen(app.get('port'), function () {
        console.log('Listening on port '+app.get('port'));
    });
});