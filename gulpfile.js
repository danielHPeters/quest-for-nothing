'use strict'
let gulp = require('gulp')
let filter = require('gulp-filter')
let gulpUglify = require('gulp-uglify')
let minifycss = require('gulp-csso')
let webpack = require('webpack-stream')
let sourceMaps = require('gulp-sourcemaps')
let rename = require('gulp-rename')
let pug = require('gulp-pug2')

gulp.task('css', () => {
  return gulp.src('./src/css/**/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest('./public/css'))
})

gulp.task('pug', () => {
  return gulp.src('./src/views/*.pug')
    .pipe(filter('error.pug'))
    .pipe(pug())
    .pipe(gulp.dest('public'))
})

gulp.task('js', () => {
  return gulp.src('src/entry.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(sourceMaps.init({loadMaps: true}))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('./'))
    .pipe(filter('**/*.js'))
    .pipe(gulpUglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('./'))
})

gulp.task('default', ['css', 'js', 'pug'])
