// Variables
var server = {
    host: 'localhost',
    port: '8001',
    https: false
}

// Global Packages
var gulp = require('gulp');
var rename = require('gulp-rename');

// Stylesheet Packages
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

// Webserver packages
var browserSync = require('browser-sync').create();

// Stylesheet Tasks
gulp.task('sass-dev', function () {
    return gulp.src([
        './assets/dev/scss/*.scss',
      ])
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./assets/bin/cache')) 
});

// Post CSS Task
gulp.task('post-css',['sass-dev'], function () {
    return gulp.src([
        './assets/bin/cache/*.css',
      ])
      .pipe(postcss([ autoprefixer() ]))
      .pipe(gulp.dest('./assets/bin'))
      .pipe(browserSync.stream());      
});

// Watch Tasks
gulp.task('watch',['post-css'], function () {
    browserSync.init({
        server: "."
    });
    gulp.watch('./assets/dev/scss/**/*.scss', ['post-css']);
    gulp.watch("./**/*.html").on('change', browserSync.reload);
});

//Default task
gulp.task('default', ['watch']);
