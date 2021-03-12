'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var map = require('gulp-sourcemaps');
var gts = require('gulp-typescript');

var packageJSON = require('./package.json');
var dependencies = Object.keys(packageJSON && packageJSON.dependencies || {});
var tsProject = gts.createProject({
  declaration: true,
})

gulp.task('vendor', gulp.series(function() {
  return browserify()
    .require(dependencies)
    .bundle()
    .pipe(source('vendor.bundle.js'))
    .pipe(gulp.dest(__dirname + '/dist/'));
}));

gulp.task('ts', gulp.series(function() {
  return gulp.src('src/*.ts')
      .pipe(tsProject())
      .pipe(gulp.dest('tsbuild'));
}));

gulp.task('app', gulp.series(function() {
  return browserify('tsbuild/webstropop.js')
    .external(dependencies)
    .bundle()
    .pipe(source('webstropop.js'))
    .pipe(map.write('./'))
    .pipe(gulp.dest(__dirname + '/dist/'));
}));

gulp.task('watch', gulp.parallel(function() {
  gulp.watch('src/**', gulp.series('ts', 'app'));
}));

gulp.task('default', gulp.series('app', 'watch'));
