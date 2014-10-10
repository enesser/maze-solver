'use strict';

/* globals process: true */
/* globals require: true */
/* globals console: true */

/*
if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}*/

if (process.argv.length > 2) {
    var fs = require('fs');
    var mazeSolver = require('./mazeSolver');

    process.argv.forEach(function(value, index) {
        if (index > 1) {
            fs.readFile(value, 'utf8', function(err, data) {
                if (err) {
                    throw err;
                }
                console.dir(mazeSolver.solve(data));
            });
        }
    });
}