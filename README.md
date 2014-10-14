Maze Solver v1.0
==========

Maze puzzle solver, implemented in Node.

## Overview

I heard about a cool interview challenge where a company would ask you to 
implement a maze solver in C# and .NET. Although I never had someone ask me 
for something like this during an interview, I thought I'd volunteer to try it 
because it sounded fun.

I did the initial version in C#, and decided to make a Node version. The Node version is much, much faster. 

This maze solver loads custom mazes stored in text files and solves them. Although this ships with a console demo, the maze solver module can be used on the web or in a GUI application. Have fun!

![Screenshot](https://raw.githubusercontent.com/enesser/mazeSolver/master/screenshot.png)

## Instructions

The demo app can be executed from a Bash or DOS prompt:

`usage: node app (filename)`

Example:

`node app maze-sample-1 maze-sample-2`

You can create custom text maps with whatever legend you prefer. The default legend is:

```
[#] Wall
[.] Path
[A] Start Point
[B] End Point
```

## Contributions
Contributions in the form of code, issues, or custom maps are always welcome!

## License
Copyright (c) 2014 Eric J Nesser
MIT
