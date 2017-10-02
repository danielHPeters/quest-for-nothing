let gulp = require('gulp')
let gulpUglify = require('gulp-uglify');
let minifycss = require('gulp-csso')
let webpack = require('webpack-stream')

gulp.task('css', function () {
  return gulp.src('./src/css/**/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest('./public/css'))
})

gulp.task('js', function () {
  return gulp.src('src/entry.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulpUglify())
    .pipe(gulp.dest('./'))
})

gulp.task('default', ['css', 'js'])
