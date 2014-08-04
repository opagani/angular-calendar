// Loads required dependencies
var gulp = require('gulp'),
    path = require('path'),
    rename = require('gulp-rename'),
    less = require('gulp-less'),
    prefix = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglifyjs'),
    livereload = require('gulp-livereload'),
    server = require('tiny-lr')(),
    nodemon = require('gulp-nodemon');

// Sets up file paths for reuse in task/watch config
var filepaths = {
    scripts: [ 'app/js/**/*.js', '!app/js/combined*.js' ]
};

// Handles task relating to styles
gulp.task('styles', function(){
    gulp.src('app/less/main.less')
        
        // Compiles LESS files to CSS and minifies it
        .pipe(less({
            cleancss: true
        }))

        // Adds vendor prefixes to CSS
        .pipe(prefix())

        // Renames the CSS file and saves it in the proper place
        .pipe(rename('combined-gulp.min.css'))
        .pipe(gulp.dest('app/css/'))

        // Triggers a live reload to show changes immediately
        .pipe(livereload());
});

// Handles tasks relating to scripts
gulp.task('scripts', function(){
    gulp.src(filepaths.scripts)

        // Checks JS files for issues
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))

        // Combines and minifies scripts
        .pipe(uglify('combined-gulp.min.js', { mangle: false }))

        // Saves the minified JS
        .pipe(gulp.dest('app/js/'))

        // Triggers a live reload to show changes immediately
        .pipe(livereload());
});

// Watches front-end files for changes and reruns tasks as needed
gulp.task('watch', [ 'nodemon' ], function(){
    livereload.listen();

    gulp.watch('app/less/**/*.less', [ 'styles' ]);
    gulp.watch(filepaths.scripts, [ 'scripts' ]);
});

// Watches back-end files for changes, restarts the server
gulp.task('nodemon', function(){
    nodemon({ script: 'server.js' });
});

gulp.task('default', [ 'watch' ]);