#!usr/bin/env node
const chokidar = require('chokidar');
const debounce = require('lodash.debounce');

const start = debounce(() => {
    console.log("STARTING THE PROGRAM!!");
}, 100);

chokidar.watch('.')
.on('add', start)
.on('change', () => console.log("file changed"))
.on('unlink', () => console.log("file removed"));
console.log('hello there');         