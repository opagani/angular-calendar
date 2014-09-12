angular-calendar
================

This is a sample app based on Arshaw FullCalendar and Joshkurz ui-calendar directive that uses the MEAN stack:  MongoDB, Express.js, AngularJS and Node.js.

The app shows a list of users, drills down to an individual user showing its calendar events and number of days left to complete a project.  The app let's you add, change and delete events for a user.  The data is persistent and it is kept in the MongoDB database.

Every user starts with a fixed number of days (let's say 10 days).  Every time you add a day event in the calendar for a user, the number of days decreases by one.  If you delete a day event for a particular user, the number of days increases accordingly. 

After cloning/downloading the app, you need to follow all the installation steps including the MongoDB installation.  Then, you need to run the Mongo Server, import data into the Mongo Database and start the  app server.

Requirements
------------
- ([AngularJS](http://code.angularjs.org/1.2.23/angular.js))
- ([fullcalendar.js 1.6.4 and it's dependencies](https://github.com/arshaw/fullcalendar/releases/tag/v1.6.4))
- ([ui-calendar](http://angular-ui.github.io/ui-calendar/))
- ([node.js v0.10.x](http://nodejs.org/download/))

Installation
------------

```bash
$ npm install -g bower
$ npm install -g grunt-cli
$ npm install -g grunt
$ cd angular-calendar
$ npm install
$ grunt
```

Install MongoDB
---------------

Go to the [mongodb.org](http://www.mongodb.org/downloads) and download the binary to install on your system.

Unpack the package into your web development folder (~/*Documents/Development or /Users/yourname or any other). If you want, you could install MongoDB into the /usr/local/mongodb folder.

If you would like to access MongoDB commands from anywhere on your system, you need to add your
mongodb path to the $PATH variable. For Mac OS X, you need the open-system paths file with:

```bash
$ sudo vi /etc/paths
  * Add the following line:  /Users/yourname/mongodb/bin or /usr/local/mongodb/bin
```

Create a data folder; by default, MongoDB uses /data/db.

```bash
$ sudo mkdir -p /data/db
$ sudo chown `id -u` /data/db
```

Run the Mongo Server
--------------------

Make sure you added $PATH for the MongoDB location

```bash
$ mongod --dbpath /data/db
MongoDB starting : pid=49735 port=27017 dbpath=/data/db ...
waiting for connections on port 27017
... 
```

Import data into the Mongo Database
---------------------------------

$ mongoimport --type json --file ./data/users.json --db calendar --collection users

Database Models
---------------
```
Users
    username: "opagani"
    name: "Oscar Pagani"
    days: 10
```
```
Events
    username: "opagani"
    id: 999
    title: "Repeating Event"
    start: new Date(y, m, d + 1, 19, 0)
    end: new Date(y, m, d + 1, 22, 30)
    allDay: false
```

How to manipulate data from the Mongo Console
---------------------------------------------

```bash
$ mongod
  * MongoDB shell version: 2.6.4
    connecting to: test
```

Then, runs these commands to make sure that the db calendar and collection users were created and the data was imported.

```bash
> use calendar
switched to db calendar
> db.users.find()
{ "_id" : ObjectId("5412317f4a47123b2b8eae8c"), "username" : "opagani", "name" : "Oscar Pagani", "days" : 10 }
{ "_id" : ObjectId("5412317f4a47123b2b8eae8d"), "username" : "jperez", "name" : "Joe Perez", "days" : 10 }
...
```

Start the server and run our app
--------------------------------

```bash
$ grunt server
```

Testing
-------

We use karma, jasmine and grunt to ensure the quality of the code.

```bash
$ grunt test
```

License
-------

MIT