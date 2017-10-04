let gulp = require('gulp')
let filter = require('gulp-filter')
let gulpUglify = require('gulp-uglify')
let minifycss = require('gulp-csso')
let htmlmin = require('gulp-htmlmin')
let webpack = require('webpack-stream')
let sourceMaps = require('gulp-sourcemaps')
let rename = require('gulp-rename')

gulp.task('css', () => {
  return gulp.src('./src/css/**/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest('./public/css'))
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

gulp.task('html', () => {
  return gulp.src('src/view/*.html')
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest('public'))
})

gulp.task('default', ['css', 'js', 'html'])
