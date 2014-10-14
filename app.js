/**
 * Maze Solver
 * Eric J Nesser, October, 2014
 */

'use strict';

var path = require('path');

if (process.argv.length > 2) {
    var fs = require('fs');
    var mazeSolver = require('./mazeSolver');
    var mazeSolutionFormatter = require('./mazeSolutionFormatter');

    //for every file supplied in arguments
    process.argv.forEach(function(value, index) {
        if (index > 1) {
            //read maze file
            fs.readFile(value, 'utf8', function(err, data) {
                if (err) {
                    throw err;
                }
                //print the solution to the maze if there is one
                mazeSolutionFormatter.printSolution(value, mazeSolver.getSolution(data));
            });
        }
    });
} else {
    //usage instructions
    console.log('usage:', path.basename(process.argv[0]), path.basename(process.argv[1]), '(filename or filenames of maze files)');
}