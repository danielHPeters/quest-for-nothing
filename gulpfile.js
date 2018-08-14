'use strict'

const spawn = require('child_process').spawn
const gulp = require('gulp')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const gulpWebpack = require('webpack-stream')
const ts = require('gulp-typescript')
const tsProject = ts.createProject('tsconfig.json')
const tsLint = require('gulp-tslint')

// Define sources, destination and config file locations here
const configuration = {
  ts: {
    source: 'src/**/*ts',
    tests: 'test/**/*ts'
  },
  js: {
    coverage: 'coverage',
    bundledSource: 'src/entry.js',
    destination: 'public/js'
  }
}

/**
 * Webpack compiles the js files in client folder into one js file.
 * Babel then translates the ES6+ syntax into javascript that all the latest 2 versions of the most popular browser
 * can understand. The configurations are in the 'webpack.config.js' and '.babelrc' files.
 * After that, the js wil be minified.
 * Source maps are generated to allow source debugging in the consoles of most browsers.
 */
gulp.task('build:client', () => {
  return gulp.src(configuration.js.bundledSource, { allowEmpty: true })
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest(configuration.js.destination))
})

/**
 * Generates the server JavaScript files from TypeScript and puts them in the dist folder.
 */
gulp.task('build:server', () => {
  return tsProject.src()
    .pipe(tsProject())
    .js
    .pipe(gulp.dest('dist'))
})

/**
 * Lint all typescript source files.
 * The standard used is standard.js as defined in the 'tslint.json' file.
 */
gulp.task('lint', () =>
  gulp.src(configuration.ts.source)
    .pipe(tsLint({
      formatter: 'verbose'
    }))
    .pipe(tsLint.report())
)

/**
 * Run npm test task which runs mocha with nyc coverage reporter.
 */
gulp.task('test', (cb) => {
  const npm = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['test'], { shell: true, stdio: 'inherit' })
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
 * Watch changes in ts files.
 */
gulp.task('watch', () => {
  gulp.watch(configuration.ts.source, ['build:client', 'build:server'])
})

/**
 * Default task to perform all previously defined tasks.
 */
gulp.task('default', gulp.series('lint', 'build:server', 'build:client', 'test'))
