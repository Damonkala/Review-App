'use strict';

var gulp = require('gulp');
var rimraf = require('rimraf');
var bower = require('gulp-bower');
var gutil = require('gulp-util');
var run = require('gulp-run');
var concat = require('gulp-concat');
var addsrc = require('gulp-add-src');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');

gulp.task('default', ['build', 'watch', 'serve'])

gulp.task('sass', function () {
  return gulp.src('source/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/scss'));
});

gulp.task('watch', function() {
	gulp.watch('source/**/*', ['build']);
});

gulp.task('serve', () => {
  nodemon({
    ignore: ['client', 'public', 'Gulpfile.js']
  });
});

gulp.task('build', ['clean'], function(){
	gulp.src('source/**/*.js')
		.pipe(concat("bundle.js"))
		.pipe(addsrc("source/**/*.html"))
		.pipe(gulp.dest('public'))
	gulp.src('source/scss/*.scss')
	  .pipe(sass().on('error', sass.logError))
	  .pipe(gulp.dest('public/scss'));
	gulp.src('assets/**/*')
		.pipe(gulp.dest('public/assets'))
		.on('error', gutil.log)
})

gulp.task('clean', function(cb) {
	rimraf('public', cb);
})
gulp.task('bower', function(cb) {
	gulp.src('assets')
	.pipe(gulp.dest('public'))
})
