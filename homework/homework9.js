/**
 * Prints a tic tac toe grid
 * 
 * Example: Note the use of + at the corners and intersections.
 * 
 *  |-- 8 -|
 * +--------------------------+
 * |        |        |        | --
 * |        |        |        |  3
 * |        |        |        | --
 * |--------+--------+--------|
 * |        |        |        |
 * |        |        |        |
 * |        |        |        |
 * |--------+--------+--------|
 * |        |        |        |
 * |        |        |        |
 * |        |        |        |
 * +--------------------------+
 * 
 * Hint:
 *  String.repeat(number)
 *  
 * @param width - the width of a grid not including the lines
 * @param height - the height of a grid not including the lines
 */
let printTicTacToeGrid = function(width, height) {
    let plus = "+"
    let dash = "-"
    let bar = "|"

    let edge = `${plus}${dash.repeat(width)}${dash}${dash.repeat(width)}${dash}${dash.repeat(width)}${plus}`
    let spaces = `${bar}${" ".repeat(width)}${bar}${" ".repeat(width)}${bar}${" ".repeat(width)}${bar}`
    let middleLine = `${bar}${dash.repeat(width)}${plus}${dash.repeat(width)}${plus}${dash.repeat(width)}${bar}`

    console.log(edge)
    for (let i = 0; i < height; ++i) {
        console.log(spaces)
    }
    console.log(middleLine)
    for (let i = 0; i < height; ++i) {
        console.log(spaces)
    }
    console.log(middleLine)
    for (let i = 0; i < height; ++i) {
        console.log(spaces)
    }
    console.log(edge)

}


/////////////////////////////////////////////////////
const width = 12;
const height = 6;

console.log(".".repeat(4 + 3*width));
printTicTacToeGrid(width, height);

