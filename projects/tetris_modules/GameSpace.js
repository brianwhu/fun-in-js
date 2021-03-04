import { D3x } from "../../visual/D3x.js";
import { Array2D, Geometry } from "./Helpers.js"

class GameSpace {
    /**
     * Constructs a GameSpace with a given display margin and inter-cell spacing.
     * 
     * @param {*} rows - number of rows in the game space
     * @param {*} columns - number of columns in the game space
     * @param {*} margin - the vertical margin above and below the game space
     * @param {*} padding - the padding between cells
     */
    constructor(rows, columns, margin, spacing) {
        this.rows = rows;
        this.columns = columns;
        this.array2d = new Array2D(rows, columns);
        this.spacing = spacing;

        let geometry = new Geometry().computeSizeAndMargin(this.rows, this.columns, margin, spacing);
        this.xMargin = geometry.xMargin;
        this.yMargin = geometry.yMargin;
        this.gridSize = geometry.size;
        this.width = this.gridSize * this.columns + this.spacing * (this.columns - 1);

        this.d3x = new D3x("rect", {
            fill: d => d,
            stroke: "grey",
            width: this.gridSize,
            height: this.gridSize,
            x: (d, i) => this.xMargin + (this.gridSize + this.spacing) * this.array2d.getX(i),
            y: (d, i) => this.yMargin + (this.gridSize + this.spacing) * this.array2d.getY(i),
        });

        this.pieceX = 0;
        this.pieceY = 0;
    }

    /**
     * Repaints the display area with the most recent changes in the data
     */
    repaint() {
        this.d3x.refresh(this.array2d.get());
    }

    /**
     * Drops a new piece into this GameSpace so that it starts to fall.
     * 
     * Horizontally, the piece starts at the center; Vertically, the piece is first placed at
     * the top.
     * 
     * @param {Piece} piece 
     */
    drop(piece) {
        this.pieceY = 0;
        this.pieceX = Math.ceil((this.columns - piece.size) / 2);
    }
}

export {
    GameSpace
}