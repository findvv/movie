#!/usr/bin/env node

var current_path = process.cwd();

require('phantomjs')(current_path + '/reptile/music.js' )