class Piece {
    /**
     * Each piece may be shown in one of its many orientations.
     * Each shape orientation is an array of points {x, y}, where x and y are
     * coordinates within the bounding box
     * 
     * @param {*} colr - the color of the piece, which does not change
     * @param {*} size - the size of the bounding box(square)
     * @param {*} shapes - the array of the shape, which is an object { x, y }, where x and y
     * are coordinates within the bounding box
     */
    constructor(color, size, shapes) {
        this.color = color;
        this.size = size;
        this.shapes = shapes;
        this.current = 0;
    }

    /**
     * Returns the current shape as an array of points
     */
    getShape() {
        return this.shapes[this.current];
    }

    /**
     * Returns the original/first shape as an array of points
     */
    getOriginal() {
        return this.shapes[0];
    }

    /**
     * Returns the next shape but doesn't change the current shape.
     */
    peekNext() {
        return this.shapes[(this.current + 1) % this.shapes.length];
    }
    /**
     * Goes to the next shape
     */
    next() {
        this.current = (this.current + 1) % this.shapes.length;
    }

    /**
     * Prints the current shape to the console.
     * 
     * For development and unit test only.
     */
    draw() {
        let points = this.getShape();
        let sheet = new Array(this.size);
        // sheet = [ undefined, ... ], and sheet.length = this.size
        for (let i = 0; i < sheet.length; ++i) {
            sheet[i] = new Array(this.size);
            // sheet = [ [undefined... ], [undefined, ...] ]
            for (let j = 0; j < sheet[i].length; ++j) {
                sheet[i][j] = '[ ]';
            }
        }

        for (let k = 0; k < points.length; ++k) {
            sheet[points[k].x][points[k].y] = "[X]";
        }

        for (let j = 0; j < this.size; ++j) {
            let line = "";
            for (let i = 0; i < this.size; ++i) {
                line = line + sheet[i][j];
            }
            console.log(line);
        }
    }
}

const J = new Piece('white', 3, [
    [ {x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 0, y: 2} ],
    [ {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 2, y: 2} ],
    [ {x: 2, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2} ],
    [ {x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1} ]
]);

const L = new Piece('magenta', 3, [
    [ {x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 2} ],
    [ {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 2, y: 0} ],
    [ {x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2} ],
    [ {x: 0, y: 2}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1} ]
]);

const T = new Piece('brown', 3, [
    [ {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 2} ],
    [ {x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 2} ],
    [ {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1} ],
    [ {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 1, y: 2} ]
]);

const S = new Piece('green', 3, [
    [ {x: 1, y: 1}, {x: 2, y: 1}, {x: 0, y: 2}, {x: 1, y: 2} ],
    [ {x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 2, y: 2} ]
]);

const Z = new Piece('cyan', 3, [
    [ {x: 0, y: 1}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 2} ],
    [ {x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 0}, {x: 2, y: 1} ]
]);

const I = new Piece('red', 4, [
    [ {x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2} ],
    [ {x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}, {x: 2, y: 3} ]
]);

const O = new Piece('blue', 2, [
    [ {x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 0}, {x: 1, y: 1} ]
]);

export {
    Piece,
    J, L, T, S, Z, I, O
}
