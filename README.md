[![Waffle.io - Columns and their card count](https://badge.waffle.io/danielHPeters/quest-for-nothing.svg?columns=all)](http://waffle.io/danielHPeters/jump-and-run)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/danielHPeters/quest-for-nothing.svg?branch=v2.0)](https://travis-ci.org/danielHPeters/quest-for-nothing)
[![Coverage Status](https://coveralls.io/repos/github/danielHPeters/quest-for-nothing/badge.svg?branch=master)](https://coveralls.io/github/danielHPeters/quest-for-nothing?branch=master)
[![Dependencies Status](https://david-dm.org/danielHpeters/quest-for-nothing.svg)](https://david-dm.org/danielHpeters/quest-for-nothing.svg)  
[![CodeFactor](https://www.codefactor.io/repository/github/danielhpeters/quest-for-nothing/badge/master)](https://www.codefactor.io/repository/github/danielhpeters/quest-for-nothing/overview/master)  
# quest-for-nothing
A simple jump and run game.  
This should run in any recent browser with html5 support.

## Install instructions
1. Make sure you have [node.js](https://nodejs.org) (min 7.10.0) and [git](https://git-scm.com/) installed.
2. Clone this repository with `git clone git@github.com:danielHpeters/quest-for-nothing.git` or `git clone https://github.com/danielHpeters/quest-for-nothing.git`.
3. Run `npm install` command in the root directory of the clone.
4. Run `npm install gulp-cli` to enable the gulp command globally.
5. Run `npm start` command to start the server.
6. Open a browser and enter http://localhost:3000 in the search bar to start playing.

## Developer instructions
This project uses gulp for build automation (transpiling and minifying JavaScript and code linting.
- `gulp default` command runs all these tasks.
- `gulp 'build:server` for converting server side code to JavaScript and then copying it to the `dist` folder.
- `gulp 'build:client` for packing, converting and minifying client side JavaScript files.
- `gulp lint` checks the code style. We use TSLint in combination with the standard.js coding standard.
- `gulp test` runs all tests.
- Source maps are automatically generated on build. This allows debugging of minified scripts in browser developer consoles
## Roadmap
See [ROADMAP.md](ROADMAP.md)
## Contributing to this project
See [CONTRIBUTING.md](CONTRIBUTING.md)
