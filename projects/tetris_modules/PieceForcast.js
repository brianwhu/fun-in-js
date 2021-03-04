import { D3x } from "../../visual/D3x.js";
import { Array2D } from "./Helpers.js";
import { Piece } from "./Pieces.js"

class PieceForcast {
    constructor(forecastXEdge, forecastYMargin, spacing, gridSize) {
        this.displaySizeInGrid = 9;
        this.titleHeight = 80; // pixels
        this.titleFontSize = 64;
        this.titleDisplayGap = 40;

        let displayWidth = gridSize * this.displaySizeInGrid + spacing * (this.displaySizeInGrid - 1);
        this.forecastXEdge = forecastXEdge;
        this.forecastXMargin = (D3x.WIDTH - forecastXEdge - displayWidth) / 2;
        this.forecastYMargin = forecastYMargin;
        this.spacing = spacing;
        this.gridSize = gridSize;

        this.titleBox = new D3x('rect', {
            x: forecastXEdge + this.forecastXMargin,
            y: forecastYMargin,
            width: displayWidth,
            height: this.titleHeight,
            fill: "black",
        });
        this.titleText = new D3x('text', {
            fill: 'yellow',
            stroke: 'none',
            fontFamily: 'Centaur',
            fontSize: this.titleFontSize,
            textAnchor: 'middle',
            dominantBaseline: 'central',
            x: forecastXEdge + this.forecastXMargin + displayWidth/2,
            y: forecastYMargin + this.titleHeight/2,
          }).text('Next');

        this.array2d = new Array2D(this.displaySizeInGrid, this.displaySizeInGrid);

        let displayX = forecastXEdge + this.forecastXMargin;
        let displayY = forecastYMargin + this.titleHeight + this.titleDisplayGap;
        this.display = new D3x('rect', {
            x: (d, i) => displayX + (this.gridSize + this.spacing) * this.array2d.getX(i),
            y: (d, i) => displayY + (this.gridSize + this.spacing) * this.array2d.getY(i),
            width: this.gridSize,
            height: this.gridSize,
            stroke: "grey",
            fill: d => d
        });

        this.piece = null;
    }

    /**
     * Updates the display with a new piece.
     * 
     * @param {Piece} piece - the new piece
     */
    update(piece) {
        // if we already have a piece in display, erase it
        if (this.piece) {
            this._paint(false);
        }
        this.piece = piece;
        this._paint(true);
    }

    /**
     * Repaints the display area with the most recent changes in the data
     */
    repaint() {
        this.titleBox.refresh([ 0 ]);
        this.titleText.refresh([ 0 ]);
        this.display.refresh(this.array2d.get());
    }

    /*!
     * Paint the piece.
     * 
     * Examples:
     *  _paint(true) - draw the piece
     *  _paint(false) - erase the piece
     * 
     * @param {boolean} paint - if true, paint the piece; otherwise erase the piece
     */
    _paint(paint) {
        let margin = Math.ceil((this.displaySizeInGrid - this.piece.size) / 2);
        // copy the shape to my array2d
        this.array2d.set(this.piece.getOriginal(), margin, margin, paint ? this.piece.color : undefined);
    }

}

export {
    PieceForcast
}
