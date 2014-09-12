var MongoClient = require('mongodb').MongoClient
  , currentConn = null;

exports.getDBConnection = function(callback) {
   if (currentConn) {
     callback(currentConn);
    } else {
        MongoClient.connect('mongodb://localhost/', function(err, db) {
            callback(db.db('calendar'));
        });
    }
};