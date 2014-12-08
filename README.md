Maze Solver
==========

[![Build Status](https://travis-ci.org/enesser/maze-solver.svg?branch=master)](https://travis-ci.org/enesser/maze-solver.svg?branch=master)
[![Dependency Status](https://david-dm.org/enesser/maze-solver.svg?style=flat)](https://david-dm.org/enesser/maze-solver.svg?style=flat)
[![devDependency Status](https://david-dm.org/enesser/maze-solver/dev-status.svg?style=flat)](https://david-dm.org/enesser/maze-solver/dev-status.svg?style=flat)

Maze puzzle solver, implemented in Node.

## Overview

I heard about a cool interview challenge where a company would ask you to
implement a maze solver in C# and .NET. I thought I'd try it just for fun.

I did the initial version in C#, and decided to make a Node version. The Node version is much faster. It can solve the sample mazes in two milliseconds or less.

This maze solver loads custom mazes stored in text files and solves them. Although this ships with a console demo, the maze solver module can be used on the web or in a GUI application. Have fun!

![Screenshot](https://cloud.githubusercontent.com/assets/5659221/5158905/0d37eed6-7315-11e4-8579-378bcafba545.png)

## Instructions

The demo app can be executed from a Bash or DOS prompt:

`usage: node app (filename)`

Example:

`$ node app maze-sample-1 maze-sample-2`

You can create custom text maps with whatever legend you prefer. The default legend is:

```
[#] Wall
[.] Path
[A] Start Point
[B] End Point
```

## How It Works
The maze solver keeps track of where it has been in the current iteration and all iterations of trying to solve the maze. It won't double-back on any space it's been in the current iteration, and it priortizes the next step forward by the path least traveled across all iterations.

When the maze solver ends up traveling a path so many times that it exceeds the number of spaces in the map, it gives up and decides there is no possible route to the end point.

If the solver finds an end point, it considers the path victorious and uses a formatter module to show the solution in color on the console. The formatter is optional and you can swap it for your own to make a GUI-based or web version.

## Contributions
Contributions in the form of code, issues, or custom maps are always welcome!

## License
Copyright (c) 2014 Eric J Nesser
MIT