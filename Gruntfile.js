'use strict';

module.exports = function(grunt) {

  // Dynamically loads all required grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Configures the tasks that can be run
  grunt.initConfig({

    // Compiles LESS files to CSS
    less: {
      dist: {
        options: {
          cleancss: true // Minifies CSS output
        },
        files: { 
          'app/css/combined-grunt.min.css': [
            'app/less/{,*/}*.less',
            'app/css/main.css'
          ]
        }
      }
    },

    // Adds vendor prefixes to CSS
    autoprefixer: {
      dist: {
        src: 'app/css/combined-grunt.min.css'
      }
    },

    // Combines and minifies JS files
    uglify: {
      options: {
        mangle: false,
        //compress: true,
        preserveComments: 'some'
      },
      scripts: {
        files: {
          'app/js/combined-grunt.min.js': [
            'app/js/{,*/}*.js',
            '!app/js/combined*.js'
          ]
        }
      }
    },

    // Checks JS for syntax issues using JSHint
    jshint: {
        dev: {
          options: {
            jshintrc: true,
            reporter: require('jshint-stylish'),
          },
          src: [ '{,*/}*.js', 'app/js/{,*/}*.js', '!app/js/combined*.js' ]
        }
    },

    // Looks for todo items and collects them in a file for reference
    todo: {
      options: {
        file: "_TODO.md"
      },
      src: [
        '**/*.js',
        'app/**/*.less',
        'app/**/*.ejs',
        'app/**/*.html',
        '!node_modules/**/*.*',
        '!bower_components/**/*.*'
      ],
    },

    // Watches front-end files for changes and reruns tasks as needed
    watch: {
      todo: {
        // NOTE Uses the todo file list to save time if the list changes
        files: [ '<%= todo.src %>' ],
        tasks: [ 'todo' ]
      },
      styles: {
        files: [ 'app/less/{,*/}*.less', 'app/css/main.css' ],
        tasks: [ 'less:dist', 'autoprefixer:dist' ],
        options: {
          livereload: true
        }
      },
      scripts: {
        files: [ 'app/js/{,*/}*.js', '!app/js/combined*.js' ],
        tasks: [ 'jshint:dev', 'uglify:scripts' ]
      },
      server: {
        files: ['.rebooted'],
        options: {
          livereload: true
        }
      } 
    },

    // Watches back-end files for changes, restarts the server
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          env: {
            PORT: 9000
          },
          ext: 'js,ejs,html',
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // opens browser on initial server start
            nodemon.on('config:update', function () {
              // Delay before server listens on port
              setTimeout(function() {
                require('open')('http://localhost:9000');
              }, 1000);
            });

            // refreshes browser when server reboots
            nodemon.on('restart', function () {
              // Delay before server listens on port
              setTimeout(function() {
                require('fs').writeFileSync('.rebooted', 'rebooted');
              }, 1000);
            });
          }
        }
      }
    },

    // Allows us to run watch and nodemon concurrently with logging
    concurrent: {
      dev: {
        tasks: [ 'nodemon:dev', 'watch' ],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    // Runs Karma test runner
    karma: {
      unit: {
        options: {
            configFile: 'test/karma.conf.js',
            keepalive: true
        }
      }
    },

  });

  // Compiles LESS/JS and checks for todos
  grunt.registerTask('default', [
    'less:dist',
    'autoprefixer:dist',
    'jshint:dev',
    'uglify:scripts',
    'todo',
    'karma'
  ]);

  // Starts a server and runs nodemon and watch using concurrent
  grunt.registerTask('server', [ 'concurrent:dev' ]);

};