var ObjectId = require('mongodb').ObjectID
  , dbConn = require('../db/db_connection')
  , myDB = null
  , users = null
  , events = null;

dbConn.getDBConnection(function(currentDB) {
    myDB = currentDB;
    users = myDB.collection('users');
    events = myDB.collection('events');
});

exports.getUsers = function(req, res) {
    users.find({}, { _id: 0 }).toArray(function(err, users) {
        if (!users) {
            res.json(404, { err: 'Users Not Found.' });
        } else {
            console.log(users);
            res.json(users);
        }
    });
};

exports.updateUserDays = function(req, res) {
    users.update({ name: req.body.name }, {'$inc': { days: req.body.dayDelta }}, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            console.log('User Updated.');
            res.json(user);
        }
    });
};

exports.getEvents = function(req, res) {
    events.find({ username: req.params.username }).toArray(function(err, events) {
        if (!events) {
            console.log(err);
        } else {
            res.json(events);
        }
    });
};

exports.createEvent = function(req, res) {
    events.insert(req.body, function(err, event) {
        if (err) {
            console.log(err);
        } else {
            console.log('Event Created.');
            res.json(event[0]);
        }
    });
};

exports.deleteEvent = function(req, res) {
    events.remove({ _id: new ObjectId(req.params.id) }, function(err, event) {
        if (err) {
            console.log(err);
        } else {
            console.log('Event Deleted.');
            res.json(event);
        }
    });
};

exports.updateEvent = function(req, res) {
    events.update({ _id: new ObjectId(req.body._id) }, { $set: { title: req.body.title, 
            start: req.body.start, end: req.body.end }}, function(err, event) {
        if (err) {
            console.log(err);
        } else {
            console.log('Event Updated.');
            res.json(event);
        }
    });
};