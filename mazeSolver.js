/**
 * Maze solver - solves a two-dimensional maze using brute force
 */

'use strict';

module.exports = function() {

    var legend = {
        wall: '#',
        path: '.',
        startPoint: 'A',
        endPoint: 'B',
        traveledPath: '*'
    };

    //get map statistics from data including the physical map, start point, end point, and size
    function getMap(data) {

        var line;
        var lines = data.split('\n');
        var map = {};
        var totalSize = 0;

        for (var y = 0; y < lines.length; y++) {

            //ignore characters that aren't whitespace or in the legend
            lines[y] = line = lines[y].replace(new RegExp('[^' + '\\' + legend.wall + '\\' + legend.path + '\\' + legend.startPoint + '\\' + legend.endPoint + '\\s]'), '');
            totalSize += line.length;

            //discover the start and end points
            for (var x = 0; x < line.length; x++) {
                if (line[x] === legend.startPoint) {
                    map.startPoint = {
                        x: x,
                        y: y
                    };
                } else if (line[x] === legend.endPoint) {
                    map.endPoint = {
                        x: x,
                        y: y
                    };
                }
            }
        }

        //map stats
        map.maze = lines;
        map.totalSize = totalSize;

        if (map.startPoint && map.endPoint) {
            return map;
        }
        throw Error('Maze must have a start point (' + legend.startPoint + ') and end point (' + legend.endPoint + ')');
    }

    //get point from history array
    function getPointFromHistory(history, point) {
        var xy = point.x + ',' + point.y;
        return history[xy];
    }

    //set point in history array
    function setPointInHistory(history, point) {
        var xy = point.x + ',' + point.y;
        point.traveled = 1;
        history[xy] = point;
    }

    //find available moves from the current point, exclude points we've visited this iteration
    function findAvailableMoves(maze, excludePoints, currentPoint) {
        var availableMoves = [];
        var trialMoves = [];
        var move;
        var historyPoint;

        //try up
        trialMoves.push({
            x: currentPoint.x,
            y: currentPoint.y - 1
        });

        //try down
        trialMoves.push({
            x: currentPoint.x,
            y: currentPoint.y + 1
        });

        //try right
        trialMoves.push({
            x: currentPoint.x + 1,
            y: currentPoint.y
        });

        //try left
        trialMoves.push({
            x: currentPoint.x - 1,
            y: currentPoint.y
        });

        for (var i = 0; i < trialMoves.length; i++) {

            move = trialMoves[i];

            if (maze[move.y] && maze[move.y][move.x]) {
                historyPoint = getPointFromHistory(excludePoints, move);
                if (!historyPoint) {
                    if (maze[move.y][move.x] === legend.path || maze[move.y][move.x] === legend.endPoint) {
                        availableMoves.push(move);
                    }
                }
            }
        }
        return availableMoves;
    }

    return {

        /**
         * Maze legend
         * @type {object}
         */
        legend: legend,

        /**
         * Set a new legend
         * @param {object} legend
         */
        setLegend: function(legend)
        {
            this.legend = legend;
        },

        /**
         * Provide solution for two-dimensional maze using brute force
         * @param  {[string]} map file
         * @return {[object]} solution with symbol denoting the success path
         */
        getSolution: function(data) {

            var map = getMap(data);
            var history = [];
            var availableMoves;
            var currentTravels = 0;
            var startTime = new Date();

            //sort by preferred moves (preferred moves include the least visited points)
            function sortByMostPreferredMoves(moveA, moveB) {
                var pointA = getPointFromHistory(history, moveA);
                var pointB = getPointFromHistory(history, moveB);
                return (pointA ? pointA.traveled : 0) - (pointB ? pointB.traveled : 0);
            }

            do {
                //represents an attempt iteration
                var currentPoint = map.startPoint;
                var currentPath = {};

                do {
                    //keep going until we run out of available moves in this iteration
                    if (map.maze[currentPoint.y][currentPoint.x] !== legend.endPoint) {
                        setPointInHistory(currentPath, currentPoint);

                        //keep track of our history so we know to evade points that we've visited before
                        var point = getPointFromHistory(history, currentPoint);

                        if (!point) {
                            setPointInHistory(history, currentPoint);
                        } else {
                            currentTravels = ++point.traveled;
                        }

                        //find an available move to make from the current point
                        availableMoves = findAvailableMoves(map.maze, currentPath, currentPoint);

                        if (availableMoves.length > 0) {
                            availableMoves.sort(sortByMostPreferredMoves);
                            currentPoint = availableMoves[0];
                        }
                    } else {
                        //return the solution
                        return {
                            maze: map.maze,
                            size: map.size,
                            elapsedTime: new Date() - startTime,
                            solutionPath: currentPath
                        };
                    }
                }
                while (availableMoves && availableMoves.length > 0);
            }
            while (currentTravels < map.totalSize);

            //no solution is available to get to the end point, error out
            throw Error('No solution available!');
        }
    };
}();