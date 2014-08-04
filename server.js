var express = require('express'),
    path = require('path');

var app = require('./app');

app.set('port', process.env.PORT || 9000);

require('http').createServer(app).listen(app.get('port'), function () {
    console.log('Listening on port '+app.get('port'));
});