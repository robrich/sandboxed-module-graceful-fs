'use strict';

var fs = require('graceful-fs');
var http = require('http');

console.log('loaded dependencies');

console.log(fs.readFileSync('./package.json'));
