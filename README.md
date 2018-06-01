# quest-for-nothing
[![Waffle.io - Columns and their card count](https://badge.waffle.io/danielHPeters/jump-and-run.svg?columns=all)](http://waffle.io/danielHPeters/jump-and-run)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/danielHPeters/jump-and-run.svg?branch=v2.0)](https://travis-ci.org/danielHPeters/jump-and-run)
[![Coverage Status](https://coveralls.io/repos/github/danielHPeters/jump-and-run/badge.svg?branch=master)](https://coveralls.io/github/danielHPeters/jump-and-run?branch=master)
[![Dependencies Status](https://david-dm.org/danielHpeters/jump-and-run.svg)](https://david-dm.org/danielHpeters/jump-and-run.svg)  
A simple jump and run game.  
This should run in any recent browser with html5 support.

## Install instructions
1. Make sure you have node.js (min 7.10.0) and git installed.
2. Clone this repository with git.
3. Run 'npm install' command in the root directory of the clone.
4. Run 'npm start' command to start the server.
5. Open a browser and enter 'http://localhost:3000' in the url bar to start playing.

## Dev instructions
This project uses gulp for build automation (transpiling and minifying JavaScript, minifying css and code linting).  
- 'gulp default' command runs all these tasks.
- 'gulp css' for css minifying
- 'gulp js' for packing, transpiling and minifying client side JavaScript files.
- 'gulp lint' for checking code style.   
  We use eslint in combination with the standard.js coding standard and some project specific settings deined in '.eslintrc'.
- Sourcemaps are automatically generated on build. This allows debugging of minified scripts in browser dev consoles
## Roadmap
See [ROADMAP.md](ROADMAP.md)
## Contributing to this Project
See [CONTRIBUTING.md](CONTRIBUTING.md)
