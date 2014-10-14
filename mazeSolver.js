'use strict';

/**
 * Maze solver - solves a two-dimensional maze using brute force
 */
module.exports = function() {

    var legend = {
        wall: '#',
        path: '.',
        startPoint: 'A',
        endPoint: 'B',
        traveledPath: '*'
    };

    function getMap(data) {

        var line;
        var lines = data.split('\n');
        var map = {};
        var totalSize = 0;

        for (var y = 0; y < lines.length; y++) {

            lines[y] = line = lines[y].replace(new RegExp('[^' + '\\' + legend.wall + '\\' + legend.path + '\\' + legend.startPoint + '\\' + legend.endPoint + ']'), '');

            totalSize += line.length;

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

        map.maze = lines;
        map.totalSize = totalSize;

        if (map.startPoint && map.endPoint) {
            return map;
        }
        throw 'Maze must have a start point (' + legend.startPoint + ') and end point (' + legend.endPoint + ')';
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

        legend: legend,

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

            function sortByMostPreferredMoves(moveA, moveB) {
                var pointA = getPointFromHistory(history, moveA);
                var pointB = getPointFromHistory(history, moveB);
                return (pointA ? pointA.traveled : 0) - (pointB ? pointB.traveled : 0);
            }

            do {
                var currentPoint = map.startPoint;
                var currentPath = [];

                do {

                    if (map.maze[currentPoint.y][currentPoint.x] !== legend.endPoint) {
                        setPointInHistory(currentPath, currentPoint);

                        var point = getPointFromHistory(history, currentPoint);

                        if (!point) {
                            setPointInHistory(history, currentPoint);
                        } else {
                            currentTravels = ++point.traveled;
                        }

                        availableMoves = findAvailableMoves(map.maze, currentPath, currentPoint);

                        if (availableMoves.length > 0) {
                            availableMoves.sort(sortByMostPreferredMoves);
                            currentPoint = availableMoves[0];
                        }

                        //var mazeSolutionFormatter = require('./mazeSolutionFormatter');
                        //mazeSolutionFormatter.printSolution('test', { maze: map.maze, solutionElapsedTime: 0, solutionPath: currentPath });

                    } else {
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