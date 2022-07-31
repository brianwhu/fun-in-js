import ComplexPlane from "../modules/ComplexPlane.js"
import DrawingBoard from "../modules/DrawingBoard.js"

const plane = new ComplexPlane(-10, 10, -5)
const board = new DrawingBoard(plane)
const A = 0.5

let quadratic = x => A*x*x

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

// let xNumbers = [ -2, -1.875, -1.75, -1.625, -1.5, -1.375, -1.25, -1.125, -1, -0.875, -0.75, -0.625, -0.5, -0.375, -0.25, -0.125, 0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1, 1.125, 1.25, 1.375, 1.5, 1.625, 1.75, 1.875, 2 ]
const N = A*50
const Increment = 0.075/A
let xNumbers = []
for (let i = 0; i < N; ++i) {
    xNumbers.unshift(-i * Increment)
    xNumbers.push(i * Increment)
}

for (let i = 0; i < xNumbers.length - 1; ++i) {
    let x1 = xNumbers[i];
    let y1 = quadratic(x1)

    let x2 = xNumbers[i+1];
    let y2 = quadratic(x2)

    board.line({ x: plane.x(x1), y: plane.y(y1) }, { x: plane.x(x2), y: plane.y(y2) }, 2, "dodgerblue")
}
    
board.restore()

function draw() {
    const canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');

        var grd = ctx.createLinearGradient(425, 425, 600, 600)
        grd.addColorStop(0, '#FA5858')
        grd.addColorStop(0.08, '#FAAC58')
        grd.addColorStop(0.16, '#F4FA58')
        grd.addColorStop(0.24, '#ACFA58')
        grd.addColorStop(0.32, '#58FA58')
        grd.addColorStop(0.4, '#58FAAC')
        grd.addColorStop(0.48, '#58FAF4')
        grd.addColorStop(0.56, '#58ACFA')
        grd.addColorStop(0.64, '#5858FA')
        grd.addColorStop(0.72, '#AC58FA')
        grd.addColorStop(0.8, '#FA58F4')
        grd.addColorStop(0.88, '#FA58AC')

        ctx.beginPath()
        ctx.fillStyle = grd
        ctx.arc(500, 500, 100, 0, Math.PI * 2, true)
        ctx.fill()
    }
  }

draw()