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
            var alternativesAvailable = [];
            var traveledHistory = {};

            function sortByMostPreferredMoves(moveA, moveB) {

                var traveled = traveledHistory[moveA.x + ',' + moveA.y];
                var traveled2 = traveledHistory[moveB.x + ',' + moveB.y];

                if (!traveled) {
                    traveled = 0;
                }

                if (!traveled2) {
                    traveled2 = 0;
                }

                if (moveA.x == 8)
                {
                    debugger;
                }

                return traveled - traveled2;

                //return moveA.traveled - moveB.traveled;
                //moveA.preferred = historyContainsPoint(alternativesAvailable, moveA) || !historyContainsPoint(history, moveA);
                //moveB.preferred = historyContainsPoint(alternativesAvailable, moveB) || !historyContainsPoint(history, moveB);

                //return moveA.preferred === moveB.preferred ? 0 : moveA.preferred ? -1 : 1;
            }

            do {
                var currentPoint = map.startPoint;
                var currentPath = [];

                do {

                    //move to bottom?

                    if (map.maze[currentPoint.y][currentPoint.x] !== legend.endPoint) {
                        currentPath.push(currentPoint);

                        if (!historyContainsPoint(currentPoint)) {
                            history.push(currentPoint);
                            var traveled = traveledHistory[currentPoint.x + ',' + currentPoint.y];
                            traveledHistory[currentPoint.x + ',' + currentPoint.y] = traveled ? ++traveled : 1;
                        }

                        //console.dir(currentPath);

                        var availableMoves = findAvailableMoves(map.maze, currentPath, currentPoint);


                        var indexOfAlternative;
                        var point;

                        if (availableMoves.length > 0) {

                            //  console.log('availables: ');
                            //console.dir(availableMoves);

                            availableMoves.sort(sortByMostPreferredMoves);
                            currentPoint = availableMoves[0];

                            console.dir(traveledHistory);
                            console.dir(availableMoves);

                            //console.log('alts:');
                            //console.dir(alternativesAvailable);

                            indexOfAlternative = alternativesAvailable.indexOf(currentPoint);
                            //console.log("trying to find ", currentPoint.x, currentPoint.y);
                            //console.dir(alternativesAvailable);

                            this.printProgress(map.maze, currentPath);

                            //dont make functions in a loop
                            //alternativesAvailable = alternativesAvailable.filter(function(element)
                            //{
                            //return element.x !== currentPoint.x && element.y !== currentPoint.y;
                            //});

                            for (var i = 1; i < availableMoves.length; i++) {
                                point = availableMoves[i];

                                if (!historyContainsPoint(history, point)) {
                                    alternativesAvailable.push(point);
                                }
                            }

                            //console.dir(availableMoves);

                        } else {
                            //this.printProgress(map.maze, currentPath);
                            break;
                        }

                        //this.printProgress(map.maze, currentPath);
                        //console.log(currentPoint);

                    } else {

                        this.printProgress(map.maze, currentPath);
                        return {
                            maze: map.maze,
                            solutionPath: currentPath
                        };

                    }

                }
                while (true);

            }
            while (alternativesAvailable.length > 0);

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