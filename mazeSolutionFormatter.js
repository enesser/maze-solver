'use strict';

/**
 * Maze solution formatter - prints out a pretty version of the solution of a 2D maze
 */
module.exports = function() {

    var mazeSolver = require('./mazeSolver');

    return {
        printSolution: function(mazeName, solution) {
            var str;
            var mazeCh;

            console.log(mazeName + ':');

            for (var i = 0; i < solution.maze.length; i++) {
                str = '';

                for (var j = 0; j < solution.maze[i].length; j++) {

                    mazeCh = solution.maze[i][j];

                    if (mazeCh !== mazeSolver.legend.startPoint && solution.solutionPath[j + ',' + i]) {
                        str += mazeSolver.legend.traveledPath;
                    } else {
                        str += solution.maze[i][j];
                    }
                }
                console.log(str);
            }
            console.log('Solved in', solution.elapsedTime + 'ms\n');
        }
    };
}();