var express = require('express')
  , path = require('path');

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index', { title: 'Express' });
    });

    var db_controller = require('./db_controller');
    app.get('/users', db_controller.getUsers);
    app.post('/user/days/update', db_controller.updateUserDays);
    app.get('/events/:username', db_controller.getEvents);
    app.post('/event/create', db_controller.createEvent);
    app.post('/event/delete/:id', db_controller.deleteEvent);
    app.post('/event/update', db_controller.updateEvent);
};
