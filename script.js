#! /usr/bin/env node
const chokidar = require('chokidar');
const debounce = require('lodash.debounce');
const prog = require('caporal');
const fs = require('fs');

prog
.version('1.0.1')
.argument('[filename]', 'Name of the file to excute')
.action( async ({ filename }) => {

    const name = filename;

    try {
     await fs.promises.access(name);
    } catch {
        throw new Error(`Could not find the file ${name}`);
    }

    const start = debounce(() => {
        console.log("STARTING THE PROGRAM!!");
    }, 100);
    
    chokidar.watch('.')
    .on('add', start)
    .on('change', start)
    .on('unlink', start);
});
prog.parse(process.argv);

