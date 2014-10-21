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

function updateDays(results) {
    users.update({ username: results[0]._id }, { $set: { days: results[0].total }}, 
        function(err, results) {
            if (err) {
                console.log(err);
            } else {
                console.log(results);
            }          
        });
}

function aggregateDays(username) {
    events.aggregate({$match: {username: username}},         
        { $project: { _id: 0, username: '$username', days: { $add: [{ $divide: [{ $subtract: [ '$end', '$start' ]}, 86400000]}, 1]}}},
        { $group: { _id: '$username', total: { $sum: "$days" }}},
        function(err, results) {
            if (err) {
                console.log(err);
            } else {
                console.log(results);
                if (!results.length) {  // deleted all of the events for that user
                    results = [{ _id: username, total: 0 }];
                }
                updateDays(results);
            }
        });
}

exports.getUsers = function(req, res) {
    users.find({}, { _id: 0 }).toArray(function(err, users) {
        if (!users) {
            res.json(404, { err: 'Users Not Found.' });
        } else {
            res.json(users);
        }
    });
};

exports.getEvents = function(req, res) {
    events.find({}).toArray(function(err, events) {
        if (!events) {
            console.log(err);
        } else {
            res.json(events);
        }
    });
};

exports.createEvent = function(req, res) {
    req.body.start = new Date(req.body.start);
    req.body.end = new Date(req.body.end);

    events.insert(req.body, function(err, event) {
        if (err) {
            console.log(err);
        } else {
            console.log('Event Created.');
            aggregateDays(req.body.username);
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
            aggregateDays(req.body.username);
            res.json(event);
        }
    });
};

exports.updateEvent = function(req, res) {
    events.update({ _id: new ObjectId(req.body._id) }, { $set: { title: req.body.title, 
            start: new Date(req.body.start), end: new Date(req.body.end) }}, function(err, event) {
        if (err) {
            console.log(err);
        } else {
            console.log('Event Updated.');
            aggregateDays(req.body.username);
            res.json(event);
        }
    });
};

