'use strict';

/*
if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}*/

if (process.argv.length > 2) {
    var fs = require('fs');
    var mazeSolver = require('./mazeSolver');
    var mazeSolutionFormatter = require('./mazeSolutionFormatter');

    process.argv.forEach(function(value, index) {
        if (index > 1) {
            fs.readFile(value, 'utf8', function(err, data) {
                if (err) {
                    throw err;
                }

                mazeSolutionFormatter.printSolution(value, mazeSolver.getSolution(data));

            });
        }
    });
}