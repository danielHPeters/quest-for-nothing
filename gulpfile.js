'use strict'
const spawn = require('child_process').spawn
const gulp = require('gulp')
const filter = require('gulp-filter')
const gulpUglify = require('gulp-uglify')
const webpack = require('webpack-stream')
const sourceMaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const esLint = require('gulp-eslint')
const ts = require('gulp-typescript')
const tsProject = ts.createProject('tsconfig.json')
const babel = require('gulp-babel')

// Define sources, destination and config file locations here
const configuration = {
  js: {
    source: 'src/**/*.js',
    testSource: 'test/**/*.js',
    coverage: 'coverage',
    bundledSource: 'src/entry.js',
    destination: 'public/js'
  },
  webpack: {
    config: './webpack.config.js'
  },
  esLint: {
    config: '.eslintrc'
  }
}

/**
 * Webpack compiles the js files in client folder into one js file.
 * Babel then translates the ES6+ syntax into javascript that all the latest 2 versions of the most popular browser
 * can understand. The configurations are in the 'webpack.config.js' and '.babelrc' files.
 * After that, the js wil be minified.
 * Source maps are generated to allow source debugging in the consoles of most browsers.
 */
gulp.task('js', () => {
  return gulp.src(configuration.js.bundledSource)
    .pipe(webpack(require(configuration.webpack.config)))
    .pipe(gulp.dest(configuration.js.destination))
    .pipe(filter('**/*.js'))
    .pipe(sourceMaps.init())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(sourceMaps.write('.'))
    .pipe(filter('**/*.js'))
    .pipe(gulpUglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest(configuration.js.destination))
})

gulp.task('build', () => {
  return tsProject.src()
    .pipe(tsProject())
    .js
    .pipe(gulp.dest('dist'))
})

/**
 * Lint all js source files.
 * The standard used is standard.js as defined in the '.eslintrc' file
 * with the addition of server.io globals
 */
gulp.task('lint', () => {
  return gulp.src([configuration.js.source, '!node_modules/**'])
    .pipe(esLint({
      configFile: configuration.esLint.config
    }))
    .pipe(esLint.format())
    .pipe(esLint.failAfterError())
})

/**
 * Run npm test task which runs mocha with nyc coverage reporter.
 */
gulp.task('test', (cb) => {
  const npm = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['test'], {shell: true, stdio: 'inherit'})
  npm.on('close', code => {
    console.log('test exited with code ' + code)
    cb(code)
  })
})

/**
 * Send coverage information to coveralls.io.
 */
gulp.task('coveralls', (cb) => {
  const npm = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'coveralls'], {
    shell: true,
    stdio: 'inherit'
  })
  npm.on('close', code => {
    console.log('coveralls exited with code ' + code)
    cb(code)
  })
})

/**
 * Watch changes in js files.
 */
gulp.task('watch-js', () => {
  gulp.watch(configuration.js.source, ['js'])
})

/**
 * Start all file watcher tasks
 */
gulp.task('watch-all', ['watch-js'])

/**
 * Default task to perform all previously defined tasks
 */
gulp.task('default', ['js', 'build'])
