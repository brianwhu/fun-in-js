import DrawingBoard from "./DrawingBoard.js"

class ComplexPlane {
    /**
     * Constructs a clip of the complex plane to accormmodate the min and max X values. Min and max Y values are computed
     * by DrawingBoard aspect ratio and ytranslate.
     */
    constructor(xmin, xmax, ytranslate) {
        this.unit = DrawingBoard.WIDTH/(xmax - xmin);

        let ymin = -DrawingBoard.HEIGHT/(2 * this.unit) + ytranslate;
        this.originX = -xmin * this.unit;
        this.originY = -ymin * this.unit;

        this.grid = 0.5;
        this.axis = '#333333';
    }

    reset(board) {
        if (this.axis) {
            board.line({ x: this.originX, y: 0 }, { x: this.originX, y: DrawingBoard.HEIGHT }, 0.5, this.axis);
            board.line({ x: 0, y: this.originY }, { x: DrawingBoard.WIDTH, y: this.originY }, 0.5, this.axis);
        } else if (this.grid) {
            board.line({ x: this.originX, y: 0 }, { x: this.originX, y: DrawingBoard.HEIGHT }, 0.5, '#dddddd');
            board.line({ x: 0, y: this.originY }, { x: DrawingBoard.WIDTH, y: this.originY }, 0.5, '#dddddd');
        }

        if (this.grid) {
            let grid = this.grid * this.unit;
            for (let x = this.originX + grid; x < DrawingBoard.WIDTH; x += grid) {
                board.vertical(x, 0, DrawingBoard.HEIGHT, 0.5, '#dddddd');
            }
            for (let x = this.originX - grid; x > 0; x -= grid) {
                board.vertical(x, 0, DrawingBoard.HEIGHT, 0.5, '#dddddd');
            }

            for (let y = this.originY + grid; y < DrawingBoard.HEIGHT; y += grid) {
                board.horizontal(0, DrawingBoard.WIDTH, y, 0.5, '#dddddd');
            }
            for (let y = this.originY - grid; y > 0; y -= grid) {
                board.horizontal(0, DrawingBoard.WIDTH, y, 0.5, '#dddddd');
            }
        }
    }

    /**
     * Translates the given real part into an x coordinate on this plane.
     */
    x(a) {
        return this.originX + a * this.unit;
    }

    /**
     * Translates the given imaginary part into a y coordinate on this plane.
     */
    y(b) {
        return this.originY - b * this.unit;
    }

    /**
     * Translates a length into a distance on this plane
     */
    d(l) {
        return l * this.unit
    }

    real(x) {
        return (x - this.originX)/this.unit;
    }

    imaginary(y) {
        return (this.originY - y)/this.unit;
    }
}

export default ComplexPlane;

