/**
 * Maze solution formatter - prints out a pretty version of the solution of a 2D maze
 */

'use strict';

module.exports = function() {

    var mazeSolver = require('./mazeSolver');
    var chalk = require('chalk');

    return {

        /**
         * Print solution to maze
         * @param  {string} Maze name
         * @param  {array} Solution data, including path and elapsed time
         */
        printSolution: function(mazeName, solution) {
            var str;
            var mazeCh;

            //print maze name and solution time
            console.log(mazeName + ': (solved in ' + solution.elapsedTime + 'ms)');

            //parse through the maze and draw the solution path in a highlighted color
            for (var i = 0; i < solution.maze.length; i++) {
                str = '';
                for (var j = 0; j < solution.maze[i].length; j++) {

                    mazeCh = solution.maze[i][j];

                    if (mazeCh !== mazeSolver.legend.startPoint && solution.solutionPath[j + ',' + i]) {
                        str += chalk.bold.yellow(mazeSolver.legend.traveledPath);
                    } else {
                        if (mazeCh == mazeSolver.legend.wall) {
                            str += chalk.gray(mazeCh);
                        } else if (mazeCh == mazeSolver.legend.path) {
                            str += chalk.white(mazeCh);
                        } else if (mazeCh === mazeSolver.legend.startPoint || mazeCh === mazeSolver.legend.endPoint) {
                            str += chalk.bold.red(mazeCh);
                        } else {
                            str += mazeCh;
                        }
                    }
                }
                console.log(str);
            }
        }
    };
}();