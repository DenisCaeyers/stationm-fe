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

// HTML Packages
var render = require('gulp-nunjucks-render');

// Stylesheet Tasks
gulp.task('sass-dev', function () {
    return gulp.src([
        './assets/dev/scss/*.scss',
    ])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./assets/bin/css/cache'))
});

// Post CSS Task
gulp.task('post-css', ['sass-dev'], function () {
    return gulp.src([
        './assets/bin/css/cache/*.css',
    ])
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest('./assets/bin/css'))
        .pipe(browserSync.stream());
});

// HTML Tasks
gulp.task('nunjucks', function () {
    return gulp.src('assets/dev/html/*.html')
        .pipe(render({
            path: ['assets/dev/html/templates']
        }))
        .pipe(gulp.dest('assets/bin'))
});

// Watch Tasks
gulp.task('watch', ['post-css', 'nunjucks'], function () {
    browserSync.init({
        server: "."
    });
    gulp.watch('./assets/dev/scss/**/*.scss', ['post-css']);
    gulp.watch('./assets/dev/html/*.html', ['nunjucks']);
    gulp.watch("./assets/bin/*.html").on('change', browserSync.reload);
});

//Default task
gulp.task('default', ['watch']);
