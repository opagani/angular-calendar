var ObjectID = require('mongodb').ObjectID
  , dbConn = require('../db_connection')
  , myDB = null
  , users = null;

dbConn.getDBConnection(function(currentDB) {
    myDB = currentDB;
    users = myDB.collection('users');
});

exports.getUsers = function(req, res) {
    var fieldsToExclude = { _id: false };
    var options = {fields: fieldsToExclude};   
    users.find({}, options).toArray(function(err, users) {
        if (!users){
            res.json(404, {err: 'Users Not Found.'});
        } else {
            console.log(users);
            res.json(users);
        }
    });
};

exports.subtractUserDays = function(req, res) {
    users.findOne({ name: req.body.name }, function(err, user) {
        user.name = req.body.name;
        users.update(user, {'$inc': {days: -1}}, function(err) {
            if (err){
                console.log(err);
            } else {
                console.log('User Updated.');
                res.json(user);
            }
        });
    });
};

exports.addUserDays = function(req, res) {
    users.findOne({ name: req.body.name }, function(err, user) {
        user.name = req.body.name;
        users.update(user, {'$inc': {days: 1}}, function(err) {
            if (err){
                console.log(err);
            } else {
                console.log('User Updated.');
                res.json(user);
            }
        });
    });
};