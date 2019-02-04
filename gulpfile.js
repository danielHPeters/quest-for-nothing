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
const config = {
  terminal: /^win/.test(process.platform) ? 'npm.cmd' : 'npm',
  ts: {
    source: 'src/**/*ts',
    tests: 'test/**/*ts',
    destination: 'dist'
  },
  js: {
    coverage: 'coverage',
    bundledSource: 'src/entry.js',
    destination: 'public/js'
  },
  tasks: {
    buildClient: 'build:client',
    buildServer: 'build:server',
    coverage: 'coveralls',
    def: 'default',
    lint: 'lint',
    run: 'run',
    test: 'test',
    watch: 'watch'
  },
  npmEvents: {
    close: 'close'
  }
}

/**
 * Webpack compiles the js files in client folder into one js file.
 * Babel then translates the ES6+ syntax into javascript that all the latest 2 versions of the most popular browser
 * can understand. The configurations are in the 'webpack.config.js' and '.babelrc' files.
 * After that, the js wil be minified.
 * Source maps are generated to allow source debugging in the consoles of most browsers.
 */
gulp.task(
  config.tasks.buildClient,
  () => gulp.src(config.js.bundledSource, { allowEmpty: true })
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest(config.js.destination))
)

/**
 * Generates the server JavaScript files from TypeScript and puts them in the dist folder.
 */
gulp.task(
  config.tasks.buildServer,
  () => tsProject.src()
    .pipe(tsProject())
    .js
    .pipe(gulp.dest(config.ts.destination))
)

/**
 * Lint all typescript source files.
 * The standard used is standard.js as defined in the 'tslint.json' file.
 */
gulp.task(
  config.tasks.lint,
  () => gulp.src(config.ts.source)
    .pipe(tsLint({ formatter: 'verbose' }))
    .pipe(tsLint.report())
)

/**
 * Run npm test task which runs mocha with nyc coverage reporter.
 */
gulp.task(config.tasks.test, (cb) => {
  const npm = spawn(config.terminal, [config.tasks.test], { shell: true, stdio: 'inherit' })
  npm.on(config.npmEvents.close, code => {
    console.log(`test exited with code ${code}`)
    cb(code)
  })
})

/**
 * Send coverage information to coveralls.io.
 */
gulp.task(config.tasks.coverage, (cb) => {
  const npm = spawn(config.terminal, [config.tasks.run, config.tasks.coverage], {
    shell: true,
    stdio: 'inherit'
  })
  npm.on(config.npmEvents.close, code => {
    console.log(`coveralls exited with code ${code}`)
    cb(code)
  })
})

/**
 * Watch changes in ts files.
 */
gulp.task(config.tasks.watch, () => {
  gulp.watch(config.ts.source, gulp.parallel(config.tasks.buildClient, config.tasks.buildServer))
})

/**
 * Default task.
 */
gulp.task(
  config.tasks.def,
  gulp.series(config.tasks.lint, config.tasks.test, config.tasks.buildClient, config.tasks.buildServer)
)
