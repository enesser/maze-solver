/**
 * Maze Solver tests
 */
'use strict';

var assert = require('assert');
var mazeSolver = require('../mazeSolver');

/**
 * Describe mazeSolver
 */
describe('mazeSolver', function() {

    var data = '';
    var solution;
    var error;

    /**
     * getSolution function should return the expected solutions or errors
     */
    describe('.getSolution', function() {

        it('should solve a maze with a begin and end point in straight line', function(done) {

            data = 'A...B';

            solution = mazeSolver.getSolution(data);
            assert(solution && Object.keys(solution.solutionPath).length > 0);
            done();
        });

        it('should solve test maze in exactly 6 steps', function(done) {

            data = 'A.....B';

            solution = mazeSolver.getSolution(data);
            assert(solution && Object.keys(solution.solutionPath).length === 6);
            done();
        });

        it('should solve test maze with walls in the way', function(done) {

            data = '#######\n';
            data += 'A..#..B\n';
            data += '#..###.\n';
            data += '#......\n'
            data += '#######';

            solution = mazeSolver.getSolution(data);
            assert(solution && Object.keys(solution.solutionPath).length > 0);
            done();
        });

        it('should error because of no end point', function(done) {

            data = 'A........#';

            try {
                solution = mazeSolver.getSolution(data);
            } catch (e) {
                error = e;
            }

            assert(error.message === 'Maze must have a start point (A) and end point (B)');
            done();
        });

        it('should error because there is no solution', function(done) {

            data = 'A.......#B';

            try {
                solution = mazeSolver.getSolution(data);
            } catch (e) {
                error = e;
            }

            assert(error.message === 'No solution available!');
            done();
        });
    });
});