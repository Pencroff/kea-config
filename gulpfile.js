/**
 * Created by Pencroff on 11.12.2014.
 */

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var istanbul = require('gulp-istanbul');
var clean = require('gulp-clean');
var benchmark = require('gulp-bench');

var jsdoc2md = require("gulp-jsdoc-to-markdown");
var rename = require("gulp-rename");

var Gitdown = require('gitdown');

gulp.task('default', ['watch-mocha'], function() {
    // place code for your default task here
    console.log('gulp started');
});

gulp.task('clear-coverage', function() {
    return gulp.src(['./coverage'], {read: false})
        .pipe(clean());
});

gulp.task('clear-benchmark', function() {
    return gulp.src(['./benchmark'], {read: false})
        .pipe(clean());
});

gulp.task('mocha', function() {
    return gulp.src(['./test/*-test.js'], { read: false })
        .pipe(mocha({ reporter: 'list' }));
});

gulp.task('watch-mocha', function() {
    gulp.watch(['src/**', 'test/**'], ['mocha']);
});

gulp.task('cover', ['clear-coverage'], function (cb) {
    gulp.src(['src/*.js'])
        .pipe(istanbul()) // Covering files
        .pipe(istanbul.hookRequire()) // Force `require` to return covered files
        .on('finish', function () {
            gulp.src(['./test/*-test.js'])
                .pipe(mocha())
                .pipe(istanbul.writeReports({reporters: [ 'lcov', 'text', 'text-summary', 'clover' ]})) // Creating the reports after tests runned
                .on('end', cb)
                .on('error', gutil.log);
        });
});

gulp.task('benchmark', ['clear-benchmark'], function () {
    gulp.src(['./test/*-benchmark.js'], {read: false})
        .pipe(benchmark({
            outputFormat: 'json'
        }))
        .pipe(gulp.dest('./benchmark'));
});

gulp.task('jsdocs', function() {
    return gulp.src('./src/*.js')
        .pipe(jsdoc2md())
        .on('error', function(err){
            gutil.log(gutil.colors.red('jsdoc2md failed'), err.message)
        })
        .pipe(rename(function(path){
            path.extname = '.md';
        }))
        .pipe(gulp.dest('./documentation'));
});

gulp.task('readme', ['jsdocs'], function () {
    return Gitdown
        .read('./documentation/README.md')
        .write('README.md');
});