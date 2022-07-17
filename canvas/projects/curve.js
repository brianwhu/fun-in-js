import ComplexPlane from "../modules/ComplexPlane.js"
import DrawingBoard from "../modules/DrawingBoard.js"

const plane = new ComplexPlane(-10, 10, 0)
const board = new DrawingBoard(plane)

let quadratic = x => x*x

board.save()

/*
// draw a line from (-1, -1) to (1, 1) in green
board.line({x: plane.x(-1), y: plane.y(-1), }, { x: plane.x(1), y: plane.y(1) }, 2, "green")
// draw a line from (1, 1) to (2, 3) in red
board.line({x: plane.x(1), y: plane.y(1), }, { x: plane.x(2), y: plane.y(3) }, 2, "red")

let points = [
 {x: plane.x(-2.3), y: plane.y(-1) },
 {x: plane.x(-3.3), y: plane.y(-2) },
 {x: plane.x(0.3), y: plane.y(-0.5) },
 {x: plane.x(2), y: plane.y(1) },
]

for (let i = 0; i < points.length - 1; ++i) {
    board.line(points[i], points[i+1], 2, "purple")
}
*/

let xNumbers = [ -2, -1, 0, 1, 2 ]

for (let i = 0; i < xNumbers.length - 1; ++i) {
    let x1 = xNumbers[i];
    let y1 = quadratic(x1)

    let x2 = xNumbers[i+1];
    let y2 = quadratic(x2)

    board.line({ x: plane.x(x1), y: plane.y(y1) }, { x: plane.x(x2), y: plane.y(y2) }, 2, "red")
}
    
board.restore()
