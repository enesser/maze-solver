'use strict';

/**
 * Maze solver - solves a two-dimensional maze using brute force
 * @param  {[string]} map file data
 * @return {[object]} solution with symbol denoting the success path
 */
var mazeSolver = module.exports = function() {

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

        for (var y = 0; y < lines.length; y++) {

            lines[y] = line = lines[y].replace(new RegExp('[^' + '\\' + legend.wall + '\\' + legend.path + '\\' + legend.startPoint + '\\' + legend.endPoint + ']'), '');

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

        if (map.startPoint && map.endPoint) {
            return map;
        }
        throw 'Maze must have a start point (' + legend.startPoint + ') and end point (' + legend.endPoint + ')';
    }

    function historyContainsPoint(history, point) {
        var historyPoint;

        for (var i = 0; i < history.length; i++) {
            historyPoint = history[i];

            if (historyPoint.x === point.x && historyPoint.y === point.y) {
                return true;
            }
        }
        return false;
    }

    function findAvailableMoves(maze, excludePoints, currentPoint) {
        var availableMoves = [];
        var trialMoves = [];
        var move;

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
                if (!historyContainsPoint(excludePoints, move)) {
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
        solve: function(data) {

            var history = [];
            var map = getMap(data);
            var preferredMoveAvailable;

            function sortByMostpreferredMoves(moveA, moveB) {
                var moveApreferred = !historyContainsPoint(history, moveA);
                var moveBpreferred = !historyContainsPoint(history, moveB);

                if (!preferredMoveAvailable && (moveApreferred || moveBpreferred)) {
                    preferredMoveAvailable = true;
                }
                return moveApreferred === moveBpreferred ? 0 : moveApreferred ? -1 : 1;
            }

            do {
                var currentPoint = map.startPoint;
                var currentPath = [];
                preferredMoveAvailable = false;

                do {

                    if (map.maze[currentPoint.y][currentPoint.x] !== legend.endPoint) {
                        currentPath.push(currentPoint);
                        history.push(currentPoint);

                        var availableMoves = findAvailableMoves(map.maze, currentPath, currentPoint);

                        if (availableMoves.length > 0) {
                            availableMoves.sort(sortByMostpreferredMoves);
                            currentPoint = availableMoves[0];
                        } else {
                            break;
                        }

                        this.printProgress(map.maze, currentPath);
                        console.log(currentPoint);
                    } else {

                        this.printProgress(map.maze, currentPath);
                        return {
                            maze: map.maze,
                            solutionPath: currentPath
                        };

                    }

                } while (true);

            }
            while (preferredMoveAvailable);

            throw Error('No solution available!');
        },

        printProgress: function(maze, currentPath) {
            for (var i = 0; i < maze.length; i++) {
                var str = '';

                for (var j = 0; j < maze[i].length; j++) {

                    if (historyContainsPoint(currentPath, {
                        x: j,
                        y: i
                    })) {
                        str += '*';
                    } else {
                        str += maze[i][j];
                    }
                }

                console.log(str);
            }
        }
    };
}();