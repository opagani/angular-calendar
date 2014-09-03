angular-calendar
================

Angular calendar based on Arshaw FullCalendar and Joshkurz ui-calendar directive.

The Angular calendar application uses the MEAN stack:  MongoDB, Express.js, Angular.js and Node.js.

# Requirements
- ([AngularJS](http://code.angularjs.org/1.2.23/angular.js))
- ([fullcalendar.js 1.6.4 and it's dependencies](http://arshaw.com/fullcalendar/download/))
- ([gcal-plugin](http://arshaw.com/js/fullcalendar-1.5.3/fullcalendar/gcal.js))

# Testing

We use karma, jasmine and grunt to ensure the quality of the code.

## Setup

### Install Node.js >= 0.8.x

If Node.js version 0.8.x (preferably 0.10.x) is not already installed on your system, install it so you can run this app.

#### Check if it's installed

The command `which node` will return a path to your installed version of Node.js, if it exists on your system.

    $ which node
    /usr/local/bin/node

If it is installed, make sure it's at least version 0.8.x, and preferably 0.10.x.

    $ node --version
    v0.10.31

#### To install

Go to the [nodejs.org](http://nodejs.org/download/) and download the binary to install on your system.

### Install MongoDB

Go to the [mongodb.org](http://www.mongodb.org/downloads) and download the binary to install on your system.

Unpack the package into your web development folder (~/*Documents/Development or /Users/yourname or any other). If you want, you could install MongoDB into the /usr/local/mongodb folder.

If you would like to access MongoDB commands from anywhere on your system, you need to add your
mongodb path to the $PATH variable. For Mac OS X, you need the open-system paths file with:

$ sudo vi /etc/paths

Or, if you prefer Sublime:

$ sudo subl /etc/paths

Then, add the following line to the /etc/paths file:

/Users/yourname/mongodb/bin

or 

/usr/local/mongodb/bin

Create a data folder; by default, MongoDB uses /data/db.

$ sudo mkdir -p /data/db
$ sudo chown `id -u` /data/db

### Run the Mongo Server

$ ./bin/mongod  --dbpath /data/db

Or, if you added $PATH for the MongoDB location, type the following:

$ mongod --dbpath /data/db

If you see something like
MongoDB starting: pid =7218 port=27017...
this means the MongoDB database server is running. By default, it’s listening to http://localhost:27017.

### Import data into the Mongo Server (needed for this application)

$ mongoimport --type json --file ./data/data.json --db calendar --collection users

### Data Manipulation from the Mongo Console

$ ./bin/mongod

Or, if you added $PATH for the MongoDB location, type the following:

$ mongod

You should see something like this:

bash-3.2$ mongo
MongoDB shell version: 2.6.4
connecting to: test

Then, runs these commands to make sure that the db calendar and collection users were created and the data was imported.

> use calendar
switched to db calendar
> db.collections.find()
> db.collection.find()
> use calendar
switched to db calendar
> db.users.find()
{ "_id" : ObjectId("5406708e4349f7b8a02c460d"), "name" : "Oscar Pagani", "days" : 6 }
{ "_id" : ObjectId("5406708e4349f7b8a02c460e"), "name" : "Joe Perez", "days" : 6 }
...
> 

### Install Bower

All client side dependencies are installed with
[bower](http://bower.io/).

You may need to use sudo to install bower globally.

    $ npm install -g bower

### Install `grunt-cli`

This app uses [Grunt](http://gruntjs.com/) to build its assets. To run Grunt, we need to install the `grunt-cli` package globally on your system using NPM.


You may need to use sudo to install grunt-cli globally.

    $ npm install -g grunt-cli

### Install Grunt

You may need to use sudo to install grunt globally.

    $ npm install -g grunt

### Run `npm install` to install local dependencies

    cd to your angular-calendar directory

    % cd angular-calendar

    $ npm install

### Run `bower install` to install client side dependencies

    $ bower install

### Run the app!

#### You will build our app using Grunt

    $ grunt

#### You will start the server and run our app

    $ grunt server

#### You will build our app and run tests using Jasmine

    $ grunt test

## License

MIT