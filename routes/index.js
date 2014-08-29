var express = require('express')
  , path = require('path');

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index', { title: 'Express' });
    });

    var users = require('./users_controller');
    app.get('/users', users.getUsers);
    app.post('/user/days/subtract', users.subtractUserDays);
    app.post('/user/days/add', users.addUserDays);
};
