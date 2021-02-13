import { Array2D, Geometry } from "./Helpers.js"

class GameSpace {
    /**
     * 
     * @param {*} rows - number of rows in the game space
     * @param {*} columns - number of columns in the game space
     * @param {*} margin - the vertical margin above and below the game space
     */
    constructor(rows, columns, margin) {
        this.rows = rows;
        this.columns = columns;
        this.array2d = new Array2D(rows, columns);
        this.MIN_MARGIN = 10;
        this.SPACING = 2;

        let geometry = new Geometry().computeSizeAndMargin(this.rows, this.columns, this.MIN_MARGIN, this.SPACING);
        this.xMargin = geometry.xMargin;
        this.yMargin = geometry.yMargin;
        this.size = geometry.size;
    }
}

export {
    GameSpace
}