
/**
 * Maze solver - solves a two-dimensional maze using brute force
 * @param  {[string]} map file data
 * @return {[object]} solution with symbol denoting the success path
 */
module.exports = mazeSolver = function(data)
{
    var symbolWall = '#';
    var symbolPath = '.';
    var symbolStartPoint = 'A';
    var symbolEndPoint = 'B';
    var symbolTraveledPath = '*';

    return {

        //legend: impassable wall
        legendWall:  '#',

        //legend: path
        legendPath: '.',

        //legend: starting point
        legendStartPoint: 'A',

        //legend: ending point
        legendEndPoint: 'B',

        //legend: traveled path
        legendTraveledPath: '*',

        /**
         * Provide solution for two-dimensional maze using brute force
         * @param  {[string]} map file
         * @return {[object]} solution with symbol denoting the success path
         */
        solve: function(data)
        {
            return 'Not implemented yet.';
        }
    };
}();